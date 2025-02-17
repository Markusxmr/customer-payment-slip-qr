<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { setPaymentSlip } from '$lib/model/set-payment-slip';
	import {
		getCustomer,
		getIsps,
		newPaymentSlip,
		getGlobalSetting,
		updateGlobalSetting
	} from '$lib/services';
	import Spinner from '$lib/components/spinner.svelte';
	import PaymentSlipTable from '../../components/payment-slips.svelte';
	import PaymentSlip from '../../components/payment-slip/payment-slip.svelte';
	import BarcodeList from '../../components/barcode/barcode-list.svelte';

	let customer: { paymentSlips: any[]; naziv: string } | null;
	let isps: any[] = [];
	let paymentSlips: any[] = [];
	let textOnlyPrint = false;
	let barcodeOnlyPrint = false;
	let scale = 1.0;
	let topMargin = 0;
	let leftMargin = 0;
	let bottomMarginItem = -70;
	let showDecimalOnPaymentSlips = true;
	let selectedAccordion = 0;

	// Reference to the container in which we might scroll after adding a slip
	let printContainer: HTMLDivElement;

	function print() {
		if (browser) setTimeout(() => window.print(), 1500);
	}

	function printWithBackground() {
		textOnlyPrint = false;
		barcodeOnlyPrint = false;
		print();
	}

	function printTextOnly() {
		textOnlyPrint = true;
		barcodeOnlyPrint = false;
		print();
	}

	function printBarcodes() {
		barcodeOnlyPrint = true;
		textOnlyPrint = false;
		print();
	}

	async function fetchIsps() {
		isps = await getIsps();
	}

	async function fetchCustomer() {
		customer = await getCustomer($page?.params);
		paymentSlips = customer?.paymentSlips ?? [];
		selectedAccordion = paymentSlips?.[0]?.id ?? 0;
		fetchIsps();
	}

	function scrollToBottom() {
		if (printContainer) {
			printContainer.scrollTop = printContainer.scrollHeight;
		}
	}

	function addPaymentSlip(isp: any) {
		newPaymentSlip(setPaymentSlip({ isp, customer })).then(async (data) => {
			fetchCustomer();
			setTimeout(() => {
				if (browser) {
					scrollToBottom();
				}
			}, 500);
		});
	}

	async function fetchGlobalSetting() {
		const globalSetting = await getGlobalSetting(1);
		scale = Number(globalSetting?.paymentSlipPrintScale) ?? 1.0;
		topMargin = Number(globalSetting?.paymentSlipMarginTop) ?? 0;
		leftMargin = Number(globalSetting?.paymentSlipMarginLeft) ?? 0;
		bottomMarginItem = Number(globalSetting?.paymentSlipItemMarginBottom) ?? 0;
		showDecimalOnPaymentSlips = globalSetting?.showDecimalOnPaymentSlips;
	}

	async function submitGlobalSetting() {
		await updateGlobalSetting(1, {
			paymentSlipPrintScale: Number(scale),
			paymentSlipMarginTop: Number(topMargin),
			paymentSlipMarginLeft: Number(leftMargin),
			paymentSlipItemMarginBottom: Number(bottomMarginItem),
			showDecimalOnPaymentSlips
		});
		await fetchGlobalSetting();
	}

	function openAccordian(item: { id: number }) {
		if (selectedAccordion === item?.id) {
			selectedAccordion = 0;
		} else {
			selectedAccordion = item?.id;
		}
	}

	onMount(async () => {
		await fetchGlobalSetting();
		await fetchCustomer();
	});
</script>

<div>
	<h3 class="noprint" style="text-align: center">
		{customer?.naziv ?? 'Obrada...'}
	</h3>
	<Spinner loading={!customer?.naziv} />

	{#if !barcodeOnlyPrint}
		<div
			bind:this={printContainer}
			class="print"
			style="--scale: {scale}; --print-margin-top: {topMargin}px; --print-margin-left: {leftMargin}px"
		>
			{#each paymentSlips as model, i}
				<div class="print-item" style="--print-item-margin-bottom: {bottomMarginItem}px">
					<PaymentSlip bind:model printing={true} bind:textOnlyPrint {showDecimalOnPaymentSlips} />
				</div>
			{/each}
		</div>
	{/if}

	{#if paymentSlips.length > 0}
		<div class="noprint">
			<PaymentSlipTable tableClass={'table-container-customer'} {paymentSlips} />
		</div>
		<br />
	{/if}

	{#if paymentSlips.length > 0}
		<fieldset class="noprint" style="text-align: center">
			<div class="form-check text-center" style="width: 250px; margin: 0 auto">
				<input
					class="form-check-input"
					type="checkbox"
					bind:checked={showDecimalOnPaymentSlips}
					on:change={submitGlobalSetting}
					id="showDecimalOnPaymentSlips"
				/>
				<label class="form-check-label" for="showDecimalOnPaymentSlips">
					Prikaz decimale na uplatnici
				</label>
			</div>
			<div class="form-check text-center" style="width: 200px; margin: 0 auto; color: red">
				{#if barcodeOnlyPrint}
					<strong>Samo Barkodovi</strong>
				{:else if textOnlyPrint}
					<strong>Uplatnice bez slike</strong>
				{:else if !barcodeOnlyPrint && !textOnlyPrint}
					<strong>Uplatnice</strong>
				{/if}
			</div>

			<div class="dropdown" style="display: inline-block">
				<button
					class="btn btn-primary btn-sm dropdown-toggle"
					type="button"
					name="novi-nalog"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Novi nalog
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					{#each isps as isp}
						<li>
							<button class="dropdown-item" on:click={() => addPaymentSlip(isp)}>{isp.name}</button>
						</li>
					{/each}
				</ul>
			</div>

			<button class="btn btn-warning btn-sm" on:click={printWithBackground}>Print</button>
			<button class="btn btn-warning btn-sm" on:click={printTextOnly}>Print bez slike</button>
			<button class="btn btn-warning btn-sm" on:click={printBarcodes}>Print barkodova</button>
			<form on:submit|preventDefault={submitGlobalSetting}>
				<div class="row justify-content-center mt-4">
					<div class="mb-2 col-md-2 col-sm-6">
						<label for="scale">Skala uplatnica</label>
						<input
							class="form-control"
							id="scale"
							name="scale"
							type="number"
							step="0.1"
							min="0.00"
							max="1.00"
							on:change={submitGlobalSetting}
							bind:value={scale}
						/>
					</div>
					<div class="mb-2 col-md-2 col-sm-6">
						<label for="topMargin">Gornja margina</label>
						<input
							class="form-control"
							id="topMargin"
							name="topMargin"
							type="number"
							on:change={submitGlobalSetting}
							bind:value={topMargin}
						/>
					</div>
					<div class="mb-2 col-md-2 col-sm-6">
						<label for="leftMargin">Lijeva margina</label>
						<input
							class="form-control"
							id="leftMargin"
							name="leftMargin"
							type="number"
							on:change={submitGlobalSetting}
							bind:value={leftMargin}
						/>
					</div>
					<div class="mb-2 col-md-2 col-sm-6">
						<label for="topMargin">Donja margina uplatnica</label>
						<input
							class="form-control"
							id="bottomMarginItem"
							name="bottomMarginItem"
							type="number"
							on:change={submitGlobalSetting}
							bind:value={bottomMarginItem}
						/>
					</div>
				</div>
			</form>
		</fieldset>
		<br />
	{/if}
	<div class="accordion noprint" id="accordionPaymentSlip">
		{#each paymentSlips as item, i}
			<div class="accordion-item">
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<h2
					class="accordion-header"
					id="heading{i}"
					on:keydown={() => openAccordian(item)}
					on:click={() => openAccordian(item)}
				>
					<button
						class="accordion-button {selectedAccordion === item?.id ? '' : 'collapsed'}"
						type="button"
						aria-expanded="true"
						aria-controls="collapse{i}"
					>
						<strong>Mjesec - {item?.mjesec}</strong>
					</button>
				</h2>
				<div
					id="collapse{i}"
					class="accordion-collapse collapse {selectedAccordion === item?.id ? 'show' : ''}"
					data-bs-target="#collapse{i}"
					aria-labelledby="heading{i}"
					aria-expanded="false"
					aria-controls="collapse{i}"
				>
					<div class="accordion-body">
						<PaymentSlip bind:model={item} bind:textOnlyPrint {showDecimalOnPaymentSlips} />
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if barcodeOnlyPrint}
		<BarcodeList {customer} {paymentSlips} />
	{/if}
</div>

<style>
</style>

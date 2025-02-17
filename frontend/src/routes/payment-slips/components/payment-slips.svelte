<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import {
		getCustomer,
		getPaymentSlips,
		updatePaymentSlip,
		deletePaymentSlip
	} from '$lib/services';
	import { store } from '$lib/store';
	import { arraysEqual } from '$lib/utils/arrays-equal';
	import NoData from '$lib/components/no-data.svelte';

	export let paymentSlips: any[] = [];
	export let tableClass = 'table-container'

	let container: HTMLElement | null = null;
	let handsontable: any = null;

	let colHeaders: string[] = [];
	let data: any[] = [];
	let loading = false;
	let tableMounted = false;
	let oldSlips: any[] = [];

	// Keep track of the Handsontable import since it’s browser-only.
	let Handsontable: any;

	/**
	 * Called whenever `paymentSlips` changes from the store subscription
	 */
	function setTableData() {
		if (!paymentSlips || paymentSlips.length === 0) return;

		colHeaders = Object.keys(paymentSlips[0]);
		data = paymentSlips.map((model) => ({
			data: model,
			renderer: 'html'
		}));

		if (handsontable) {
			handsontable.loadData(data);
		}

		loading = false;
	}

	/**
	 * Initializes the Handsontable instance in the container
	 */
	function createTable() {
		handsontable = new Handsontable(container, {
			data,
			rowHeaders: true,
			colHeaders,
			filters: true,
			dropdownMenu: true,
			manualColumnResize: true,
			manualRowResize: true,
			contextMenu: true,
			columnSorting: true,
			collapsibleColumns: true,
			nestedRows: true,
			// Only run this if the data actually changed, not on load
			afterChange(changes: any[][], source: string) {
				if (!changes || source === 'loadData') return;

				for (const change of changes) {
					const [index, column, prevVal, newVal] = change;
					if (newVal === prevVal) continue;

					let item = {
						...(data[index]?.data ?? data[index]),
						[String(column)]: newVal
					};

					if (item?.id) {
						updatePaymentSlip(item).then(() => {
							getCustomer({ id: item?.customer_id });
						});
					}
				}
			},
			beforeRemoveRow(index: number, amount: number, physicalRows: number[]) {
				const confirmMsg = `Izbrisati ${amount} ${amount === 1 ? 'stupac' : 'stupca'}?`;
				const promptVal = confirm(confirmMsg);
				if (!promptVal) return;

				for (const row of physicalRows) {
					let item = data[row];
					if (item?.id) {
						deletePaymentSlip(item.id).then(() => {
							if (row + 1 === amount) {
								getPaymentSlips().then(() => {
									loading = false;
								});
							}
						});
					}
				}
			},
			licenseKey: 'non-commercial-and-evaluation'
		});
	}

	/**
	 * Subscribe to store changes so that if `paymentSlips` updates,
	 * we update our Handsontable data
	 */
	store.subscribe((state) => {
		const newSlips = state?.paymentSlips ?? [];
		if (!arraysEqual(oldSlips, newSlips)) {
			paymentSlips = newSlips;
			oldSlips = newSlips;
			if (browser) {
				setTableData();
			}
		}
	});

	/**
	 * `onMount` is only called on client. Perfect place to dynamically import.
	 */
	onMount(async () => {
		if (!browser) return;

		// Dynamically import Handsontable only in the browser
		const module = await import('handsontable');
		Handsontable = module.default;

		// If we already have data, create the table.
		if (paymentSlips && paymentSlips.length > 0) {
			setTableData();
			createTable();
			tableMounted = true;
		}
	});
</script>

<div>
	<div class="{tableClass}">
		<!-- This element is used for mounting Handsontable -->
		<div bind:this={container}/>
	</div>

	{#if !paymentSlips || paymentSlips.length === 0}
		<NoData />
	{/if}
</div>

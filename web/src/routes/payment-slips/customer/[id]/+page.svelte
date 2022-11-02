<script lang="ts">
	import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Spinner from "$lib/components/spinner.svelte";
  import { setPaymentSlip } from "$lib/model/set-payment-slip";
  import PaymentSlip from "$lib/components/payment-slip/payment-slip.svelte";
  import {
    getCustomer,
    getIsps,
    newPaymentSlip,
    getGlobalSetting,
    updateGlobalSetting,
  } from "$lib/services";
  import { store } from "$lib/store";
  import BarcodeList from "$lib/components/barcode/barcode-list.svelte";

  export let data;
  export let { params } = data;
  let PaymentSlipTable: any;
  
  let customer: { paymentSlips: any; naziv: any; } | null;
  let isps: any[] = [];
  let paymentSlips: any[] = [];
  let textOnlyPrint = false;
  let barcodeOnlyPrint = false;
  let scale = 1.0;
  let topMargin = 0;
  let leftMargin = 0;
  let bottomMarginItem = -70;
  let showDecimalOnPaymentSlips = true;

  store.subscribe((state) => {
    customer = state?.customer;
    paymentSlips = [...(customer?.paymentSlips ?? [])];
  });

  function printWithBackground() {
    textOnlyPrint = false;
    barcodeOnlyPrint = false;
    setTimeout(() => browser? window.print() : null, 1000);
  }

  function printTextOnly() {
    textOnlyPrint = true;
    barcodeOnlyPrint = false;
    setTimeout(() => browser? window.print() : null, 1000);
  }

  function printBarcodes() {
    barcodeOnlyPrint = true;
    textOnlyPrint = false;
    setTimeout(() => browser? window.print() : null, 1000);
  }

  getIsps().then(async (data) => {
    isps = data;
  });

  function fetchCustomer(params: {}) {
    getCustomer(params).then(() => getIsps());
  }

  onMount(() => {
    fetchCustomer(params);
  });

  function addPaymentSlip(isp: any) {
    newPaymentSlip(setPaymentSlip({ isp, customer })).then(async (data) => {
      fetchCustomer(params);
      setTimeout(() => {
        if (browser) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      }, 1000);
    });
  }

  async function fetchGlobalSetting() {
    const data = await getGlobalSetting(1);
    scale = Number(data?.paymentSlipPrintScale) ?? 1.0;
    topMargin = Number(data?.paymentSlipMarginTop) ?? 0;
    leftMargin = Number(data?.paymentSlipMarginLeft) ?? 0;
    bottomMarginItem = Number(data?.paymentSlipItemMarginBottom) ?? 0;
    showDecimalOnPaymentSlips = data?.showDecimalOnPaymentSlips;
  }

  fetchGlobalSetting();

  async function submitGlobalSetting() {
    await updateGlobalSetting(1, {
      paymentSlipPrintScale: Number(scale),
      paymentSlipMarginTop: Number(topMargin),
      paymentSlipMarginLeft: Number(leftMargin),
      paymentSlipItemMarginBottom: Number(bottomMarginItem),
      showDecimalOnPaymentSlips,
    });
    await fetchGlobalSetting();
  }

  onMount(async() => {
    PaymentSlipTable = (await import("$lib/components/payment-slip/payment-slips.svelte")).default;
  })
</script>

<div>
  <h3 class="noprint" style="text-align: center">
    {customer?.naziv ?? "Obrada..."}
  </h3>
  <Spinner loading={!customer?.naziv} />

  {#if !barcodeOnlyPrint}
    <div
      class="print"
      style="
        --scale: {scale}; --print-margin-top: {topMargin}px; --print-margin-left: {leftMargin}px"
    >
      {#each paymentSlips as model, i}
        <div
          class="print-item"
          style="
        --print-item-margin-bottom: {bottomMarginItem}px"
        >
          <PaymentSlip
            bind:model
            printing={true}
            {textOnlyPrint}
            {showDecimalOnPaymentSlips}
          />
        </div>
      {/each}
    </div>
  {/if}

  {#if PaymentSlipTable && paymentSlips.length > 0}
    <div class="noprint">
      <PaymentSlipTable {paymentSlips} />
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
              <button class="dropdown-item" on:click={() => addPaymentSlip(isp)}
                >{isp.name}</button
              >
            </li>
          {/each}
        </ul>
      </div>

      <button class="btn btn-warning btn-sm" on:click={printWithBackground}
        >Print</button
      >
      <button class="btn btn-warning btn-sm" on:click={printTextOnly}
        >Print bez slike</button
      >
      <button class="btn btn-warning btn-sm" on:click={printBarcodes}
        >Print barkodova</button
      >
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
        <h2 class="accordion-header" id="heading{i}">
          <button
            class="accordion-button {i === 0 ? '' : 'collapsed'}"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse{i}"
            aria-expanded="true"
            aria-controls="collapse{i}"
          >
            <strong>Mjesec - {item?.mjesec}</strong>
          </button>
        </h2>
        <div
          id="collapse{i}"
          class="accordion-collapse collapse {i === 0 ? 'show' : ''}"
          data-bs-parent="#accordionPaymentSlip"
          data-bs-toggle="collapse"
          data-bs-target="#collapse{i}"
          aria-labelledby="heading{i}"
          aria-expanded="false"
          aria-controls="collapse{i}"
        >
          <div class="accordion-body">
            <PaymentSlip
              bind:model={item}
              {textOnlyPrint}
              {showDecimalOnPaymentSlips}
            />
          </div>
        </div>
      </div>
    {:else}{/each}
  </div>

  {#if barcodeOnlyPrint}
    <BarcodeList {customer} {paymentSlips} />
  {/if}
</div>

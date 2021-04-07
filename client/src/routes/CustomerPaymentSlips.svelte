<script lang="ts">
  import PaymentSlipTable from "../components/PaymentSlipTable/PaymentSlipTable.svelte";
  import { setPaymentSlip } from "../services/set-payment-slip";
  import PaymentSlip from "../components/PaymentSlip/PaymentSlip.svelte";
  import {
    getCustomer,
    getIsps,
    newPaymentSlip,
    getGlobalSetting,
    updateGlobalSetting,
  } from "src/services/http";
  import { store } from "src/store";
  import { onMount } from "svelte";
  import BarcodeList from "../components/PaymentSlip/BarcodeList.svelte";

  export let params = {};
  let customer;
  let isps = [];
  let isp_id;
  let model;
  let paymentSlips = [];
  let textOnlyPrint = false;
  let barcodeOnlyPrint = false;
  let scale = 1.0;
  let topMargin = 0;
  let leftMargin = 0;
  let printItemMarginTopFirst = 10;
  let printItemMarginTop = 80;

  $: if (scale) {
    printItemMarginTop = printItemMarginTop + Number(`${scale}0`);
    printItemMarginTopFirst = printItemMarginTopFirst + Number(`${scale}0`);
  }

  store.subscribe((state) => {
    customer = state?.customer;
    paymentSlips = [...(customer?.paymentSlips ?? [])];
  });

  function printWithBackground() {
    textOnlyPrint = false;
    barcodeOnlyPrint = false;
    setTimeout(() => window.print(), 1000);
  }

  function printTextOnly() {
    textOnlyPrint = true;
    barcodeOnlyPrint = false;
    setTimeout(() => window.print(), 1000);
  }

  function printBarcodes() {
    barcodeOnlyPrint = true;
    textOnlyPrint = false;
    setTimeout(() => window.print(), 1000);}

  getIsps().then(async (data) => {
    isps = data;
  });

  function fetchCustomer(params) {
    getCustomer(params).then(() => getIsps());
  }

  onMount(() => {
    fetchCustomer(params);
  });

  function addPaymentSlip(isp) {
    newPaymentSlip(setPaymentSlip({ isp, customer })).then(async (data) => {
      fetchCustomer(params);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
    });
  }

  async function fetchGlobalSetting() {
    const data = await getGlobalSetting(1);
    scale = Number(data?.paymentSlipPrintScale) ?? 1.0;
    topMargin = Number(data?.paymentSlipMarginTop) ?? 0;
    leftMargin = Number(data?.paymentSlipMarginLeft) ?? 0;
  }

  fetchGlobalSetting();

  async function submitGlobalSetting() {
    await updateGlobalSetting(1, {
      paymentSlipPrintScale: Number(scale),
      paymentSlipMarginTop: Number(topMargin),
      paymentSlipMarginLeft: Number(leftMargin),
    });
    await fetchGlobalSetting();
  }
</script>

<h3 class="noprint" style="text-align: center">
  {customer?.naziv ?? "Obrada..."}
</h3>

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
      --print-item-margin-top: -{printItemMarginTop}px;
      --print-item-margin-top-first: -{printItemMarginTopFirst}px"
    >
      <PaymentSlip bind:model printing={true} {textOnlyPrint} />
    </div>
  {/each}
</div>
{/if}

{#if paymentSlips.length > 0}
  <div class="noprint">
    <PaymentSlipTable {paymentSlips} />
  </div>
  <br />
{/if}

{#if paymentSlips.length > 0}
  <fieldset class="noprint" style="text-align: center">
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
      <div class="row justify-content-center">
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
      </div>
    </form>
  </fieldset>
  <br />
{/if}

<div class="accordion noprint" id="accordionExample">
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
        aria-labelledby="heading{i}"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <PaymentSlip bind:model={item} {textOnlyPrint} />
        </div>
      </div>
    </div>
  {:else}{/each}
</div>

{#if barcodeOnlyPrint}
  <BarcodeList {customer} {paymentSlips} />
{/if}

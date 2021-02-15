<script lang="ts">
  import PaymentSlip from "../components/PaymentSlip/Index.svelte";
  import { setPaymentSlip } from "../services/set-payment-slip";
  import Uplatnica from "../components/Uplatnica.svelte";
  import { getCustomer, getIsps, newPaymentSlip } from "src/services/http";
  import { store } from "src/store";

  export let params = {};
  let customer;
  let isps = [];
  let isp_id;
  let model;
  let paymentSlips = [];
  let textOnlyPrint = false;

  store.subscribe((state) => {
    customer = state?.customer;
    paymentSlips = customer?.paymentSlips ?? [];
  });

  function printWithBackground() {
    textOnlyPrint = false;
    setTimeout(() => window.print(), 1000);
  }

  function printTextOnly() {
    textOnlyPrint = true;
    setTimeout(() => window.print(), 1000);
  }

  getIsps().then(async (data) => {
    isps = data;
  });

  function fetchCustomer(params) {
    getCustomer(params);
  }

  fetchCustomer(params);

  function addPaymentSlip(isp) {
    newPaymentSlip(setPaymentSlip({ isp, customer })).then(async (data) => {
      fetchCustomer(params);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
    });
  }
</script>

<h3 class="noprint" style="text-align: center">{customer?.naziv ?? "..."}</h3>

{#each paymentSlips as model, i}
  <div class="print">
    <Uplatnica bind:model printing={true} {textOnlyPrint} />
  </div>
{/each}

{#if paymentSlips.length > 0}
  <div class="noprint">
    <PaymentSlip {paymentSlips} />
  </div>
  <br />
{/if}

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
</fieldset>
<br />

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
          <strong>Uplatnica {i + 1}</strong>
        </button>
      </h2>
      <div
        id="collapse{i}"
        class="accordion-collapse collapse {i === 0 ? 'show' : ''}"
        aria-labelledby="heading{i}"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <Uplatnica bind:model={item} {getCustomer} {textOnlyPrint} />
        </div>
      </div>
    </div>
  {:else}
    <h3 class="text-align: center">Nema naloga</h3>
  {/each}
</div>

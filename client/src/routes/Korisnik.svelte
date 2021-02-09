<script lang="ts">
  import printJS from "print-js";
  import { setPaymentSlip } from "../services/set-payment-slip";
  import Uplatnica from "../components/Uplatnica.svelte";
  import config from "../config";

  export let params = {};
  let customer;
  let model;
  let paymentSlips = [];

  let textOnlyPrint = false;

  function printWithBackground() {
    textOnlyPrint = false;
    setTimeout(() => window.print(), 1000);
  }

  function printTextOnly() {
    textOnlyPrint = true;
    setTimeout(() => window.print(), 1000);
  }

  async function getCustomer() {
    fetch(`${config.url}/customer/${params.id}`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      customer = await res.json();
      paymentSlips = customer?.paymentSlips;
    });
  }

  getCustomer();

  function newPaymentSlip() {
    fetch(`${config.url}/payment-slip`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(setPaymentSlip(customer)),
    }).then(async (res) => {
      let data = await res.json();
      getCustomer();
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

<fieldset class="noprint" style="text-align: center">
  <button
    class="btn btn-primary btn-sm"
    name="novi-nalog"
    on:click={newPaymentSlip}>Novi nalog</button
  >

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

<script lang="ts">
  import Barcode from "./Barcode.svelte";
  import ModelPlatitelja from "./ModelPlatitelja.svelte";
  import ModelPrimatelja from "./ModelPrimatelja.svelte";
  import Potvrda from "./Potvrda.svelte";
  import SifraNamjene from "./SifraNamjene.svelte";
  import BarcodePayment from "../lib/BarcodePayment";
  import config from "../config";
  import { getCustomer } from "../services/http";
  import { store } from "../store";
  export let key = Math.random();
  export let model;
  export let printing = false;
  let genexUrl = "http://188.34.178.129";
  let loaded = false;
  let loadstart = "Učitavanje...";
  let hub3_code;
  let showDecoder = false;
  let customer;
  export let textOnlyPrint = false;

  store.subscribe((state) => {
    customer = state?.customer;
  });

  $: if (model) {
    model = { ...model, iznos: model?.iznos.replace(".", "") };
  }

  async function generatePDF() {
    await fetch(`${genexUrl}:5000/uplatnica`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;application/pdf",
      },
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(model),
    });
  }

  async function print() {
    await generatePDF();
    setTimeout(() => {
      window.open(`${genexUrl}:8000/uplatnica.pdf`);
    }, 1000);
  }

  function decoder() {
    showDecoder = !showDecoder;
  }

  async function updatePaymentSlip() {
    await fetch(`${config.url}/payment-slip/${model.id}`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(model),
    });

    await getCustomer(customer);
  }

  async function deletePaymentSlip(id) {
    const cnfrm = confirm("Izbrisati?");
    if (!cnfrm) return;
    await fetch(`${config.url}/payment-slip/${id}`, {
      method: "DELETE",
    });
    console.log(model);

    await getCustomer(customer);
  }
</script>

<h4 style="text-align: center">{loadstart}</h4>

<div class="form-container">
  <form class="uplatnica" on:submit|preventDefault>
    <img
      on:load={() => {
        loaded = true;
        loadstart = "";
      }}
      class="uplatnica__img {textOnlyPrint ? 'noprint-image' : ''}"
      alt="Uplatnica"
      src="https://knee-cola.github.io/generator-opce-uplatnice/img/uplatnica.jpg"
    />
    {#if loaded}
      <div>
        <fieldset class="fieldset-platitelj">
          <div>
            <input
              id="{key}-ime_i_prezime_platitelja"
              class="form-field"
              class:form-field-invalid={!model.ime_i_prezime_platitelja}
              type="text"
              placeholder="ime i prezime / naziv"
              bind:value={model.ime_i_prezime_platitelja}
            />
          </div>
          <div>
            <input
              id="{key}-ulica_i_broj_platitelja"
              class="form-field"
              class:form-field-invalid={!model.ulica_i_broj_platitelja}
              type="text"
              placeholder="adresa"
              bind:value={model.ulica_i_broj_platitelja}
            />
          </div>
          <div>
            <input
              id="{key}-postanski_i_grad_platitelja"
              class="form-field"
              class:form-field-invalid={!model.postanski_i_grad_platitelja}
              type="text"
              placeholder="grad/mjesto"
              bind:value={model.postanski_i_grad_platitelja}
            />
          </div>
        </fieldset>
        <fieldset class="fieldset-primatelj">
          <div>
            <input
              id="{key}-ime_i_prezime_primatelja"
              class="form-field"
              class:form-field-invalid={!model.naziv_primatelja}
              type="text"
              placeholder="ime i prezime / naziv"
              bind:value={model.naziv_primatelja}
            />
          </div>
          <div>
            <input
              id="{key}-ulica_i_broj_primatelja"
              class="form-field"
              class:form-field-invalid={!model.ulica_i_broj_primatelja}
              type="text"
              placeholder="adresa"
              bind:value={model.ulica_i_broj_primatelja}
            />
          </div>
          <div>
            <input
              id="{key}-postanski_i_grad_primatelja"
              class="form-field"
              class:form-field-invalid={!model.postanski_i_grad_primatelja}
              type="text"
              placeholder="grad/mjesto"
              bind:value={model.postanski_i_grad_primatelja}
            />
          </div>
        </fieldset>
      </div>
      <fieldset class="fieldset-brojke">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
          <div>
            <input
              id="{key}-hitno"
              class="form-field form-field--hitno"
              type="text"
              placeholder="hitno"
              maxlength="1"
              bind:value={model.hitno}
            />
          </div>
          <div>
            <input
              id="{key}-valuta_placanja"
              class="form-field form-field--valuta_placanja"
              type="text"
              maxlength="3"
              placeholder="valuta placanja"
              bind:value={model.valuta_placanja}
            />
          </div>
          <div>
            <input
              id="{key}-iznos"
              class="form-field form-field--iznos "
              class:form-field-invalid={!model.iznos}
              type="text"
              placeholder="iznos uplate"
              bind:value={model.iznos}
            />
          </div>
        </div>
        <br />
        <div>
          <input
            id="{key}-iban_platitelja"
            class="form-field form-field--iban-platitelja"
            type="text"
            placeholder="IBAN platitelja"
            maxlength="21"
            bind:value={model.iban_platitelja}
          />
        </div>
        <br />
        <div class="two-column">
          <div>
            <ModelPlatitelja bind:model_platitelja={model.model_platitelja} />
          </div>
          <div>
            <input
              id="{key}-poziv_na_broj_platitelja"
              class="form-field form-field--poziv-na-platitelja"
              type="text"
              placeholder="Poziv na br platitelja"
              maxlength="22"
              bind:value={model.poziv_na_broj_platitelja}
            />
          </div>
        </div>
        <br />
        <div>
          <input
            id="{key}-iban_primatelja"
            class="form-field form-field--iban-primatelja"
            class:form-field-invalid={!model.iban_primatelja}
            type="text"
            placeholder="IBAN primatelja"
            maxlength="21"
            bind:value={model.iban_primatelja}
          />
        </div>
        <br />
        <div class="two-column">
          <div>
            <ModelPrimatelja bind:model_primatelja={model.model_primatelja} />
          </div>
          <div>
            <input
              id="{key}-poziv_na_broj_primatelja"
              class="form-field form-field--poziv-na-broj-primatelja"
              placeholder="Poziv na br primatelja"
              maxlength="22"
              type="text"
              bind:value={model.poziv_na_broj_primatelja}
            />
          </div>
        </div>
        <br />
        <div>
          <div>
            <SifraNamjene bind:sifra_namjene={model.sifra_namjene} />
          </div>
          <div>
            <input
              id="{key}-datum_izvrsenja"
              class="form-field form-field--datum_izvrsenja"
              placeholder="Datum izvrsenja"
              maxlength="8"
              type="text"
              bind:value={model.datum_izvrsenja}
            />
          </div>
          <textarea
            class="form-field form-field--opis {!model.opis_placanja
              ? 'form-field-invalid'
              : ''}"
            id="{key}-opis_placanja"
            cols="33"
            rows="4"
            placeholder="opis plaćanja"
            bind:value={model.opis_placanja}
          />
        </div>
      </fieldset>
      <div>
        <canvas class="uplatnica__barcode" width="238" height="100" />
        <fieldset class="fieldset-potvrda">
          <div class="potvrda-field potvrda-field--iznos" />
          <div class="potvrda-field potvrda-field--iban-platitelja" />
          <div
            class="potvrda-field potvrda-field--model-i-poziv-na-broj-platitelja"
          />
          <div class="potvrda-field potvrda-field--iban-primatelja" />
          <div
            class="potvrda-field potvrda-field--model-i-poziv-na-broj-primatelja"
          />
          <div class="potvrda-field potvrda-field--opis-placanja" />
        </fieldset>
        {#if !printing}
          <fieldset style="text-align: center">
            <!--  <button class="btn btn-warning btn-sm" name="novi-nalog">NOVI NALOG</button> --><button
              class="btn btn-primary btn-sm"
              name="print"
              on:click={updatePaymentSlip}>Spremi nalog</button
            >
            <button class="btn btn-warning btn-sm" name="print" on:click={print}
              >Ispis naloga</button
            >
            <!-- <button class="btn btn-primary" on:click={generatePDF} name="print">GENERIRAJ NALOG</button> -->
            <button class="btn btn-warning btn-sm" on:click={decoder}
              >Dekodirano</button
            >
            <button
              class="btn btn-danger btn-sm"
              on:click={() => deletePaymentSlip(model?.id)}>Izbriši</button
            >
          </fieldset>
          <br />
        {/if}

        <Barcode bind:props={model} bind:hub3_code {key} />
        <Potvrda {...model} />
      </div>
    {/if}
  </form>
</div>
<div class="container">
  {#if showDecoder}
    <textarea
      bind:value={hub3_code}
      style="width: 100%; height: 295px; font-size: 0.9rem"
    />
  {/if}
</div>

<style>
  form {
    font-size: 0.9rem;
    line-height: 1;
  }
  .form-container {
    text-align: center;
  }
  @media print {
    .form-container {
      text-align: left !important;
    }
  }
  form {
    display: inline-block;
  }
</style>

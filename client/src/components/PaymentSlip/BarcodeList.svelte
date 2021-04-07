<script lang="ts">
  import Barcode from "./Barcode.svelte";
  import { store } from "../../store";
  import { FormatIntegerToDecimal } from "src/services/Format";

  export let customer;
  export let paymentSlips = [];
  
  function emphasiseDate(val: string) {
      if (!val) return;
      let rule = /([0-9]{1})\/([0-9]{4})/gm;
      let match = val.match(rule);
      return match && match.length === 1 ? val.replace(rule, `<strong>${match[0]}</strong>`) : val
  }
  
  function emphasiseRate(val: string) {
      if (!val) return;
      let rule = / ([0-9])\/([0-9])/gm;
      let match = val.match(rule);
      return match && match.length === 1 ? val.replace(rule, `<strong>${match[0]}</strong>`) : val
  }
</script>

<div class="barcode-container">
    <div class="barcode-list-title">
    Pretplatnik: <strong>{customer?.naziv}</strong>, šifra korisnika: <strong>{customer?.šifra}</strong> <br>
    <strong>Uplatnice za plaćanje putem mobilnog bankarstva</strong> (Plaćenu uplatnicu prekrižite).
    </div>
    <img src="http://192.168.43.79:3000/logo.png" alt=""
         class="barcode-list-logo">
    <div class="row row-print">
    {#each paymentSlips as model, i}
        <div class="col-md-4 col-print-4 barcode-list-container">
           <div class="barcode-list-item-info">
                <p class="barcode-list-item-info barcode-list-item-description">
                    {@html emphasiseRate(emphasiseDate(model.opis_placanja))}
                </p>
                <p class="barcode-list-item-info">
                    {model.naziv_primatelja}
                    <span class="barcode-list-item-info-price">{FormatIntegerToDecimal(model.iznos)} HRK</span>
                </p>
                <p class="barcode-list-item-info">{model.iban_primatelja}</p>
                <p class="">{model.model_primatelja} {model.poziv_na_broj_primatelja}</p>
            </div>
            <div class="barcode-list-item-barcode">
                <Barcode props={model}
                    key={Number(`${i}${Math.random()}${i}`)}
                    canvasClass={'uplatnica__barcode__print'} />
            </div>
        </div>
    {/each}
    <p class="text-center mt-2 barcode-list-support">Podrška 099/213-4567 Thomas K.</p>
    </div>
</div>

<style>
    @media all {
    .barcode-container {
        top: 0px;
        position: relative;
        margin-top: -50px !important;
        margin-left: 10px !important;
    }
    .barcode-list-item-description {
        line-height: 1;
        font-size: 1rem;
        margin-bottom: 5px;
    }    
    .barcode-list-logo {
        position: absolute;
        right: 10px;
        top: 0px;
        width: 250px;
    }
    .barcode-list-title {
        font-size: 0.9rem;
        margin-bottom: 55px;
    }
    .row-print {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: calc(var(--bs-gutter-y) * -1);
        margin-right: calc(var(--bs-gutter-x) / -2);
        margin-left: calc(var(--bs-gutter-x) / -2);
    }
    .barcode-list-container {
        font-size: 0.8rem;
        margin-bottom: 40px;
        line-height: 0.9;
    }
    .barcode-list-item-barcode {
        margin-top: -5px;
    }
    .barcode-list-item-info {
        margin-bottom: 5px;
    }
    .barcode-list-item-info-price {
        font-size: 1rem;
        font-weight: bold;
    }
    .barcode-list-support {
        font-size: 0.9rem;
    }
    .col-print-1 {
        width: 8%;
        float: left;
    }

    .col-print-2 {
        width: 16%;
        float: left;
    }

    .col-print-3 {
        width: 25%;
        float: left;
    }

    .col-print-4 {
        width: 33%;
        float: left;
    }

    .col-print-5 {
        width: 42%;
        float: left;
    }

    .col-print-6 {
        width: 50%;
        float: left;
    }

    .col-print-7 {
        width: 58%;
        float: left;
    }

    .col-print-8 {
        width: 66%;
        float: left;
    }

    .col-print-9 {
        width: 75%;
        float: left;
    }

    .col-print-10 {
        width: 83%;
        float: left;
    }

    .col-print-11 {
        width: 92%;
        float: left;
    }

    .col-print-12 {
        width: 100%;
        float: left;
    }
}
</style>
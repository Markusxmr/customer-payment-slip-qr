<script lang="ts">
  import { FormatIntegerToDecimal } from "$lib/Format";

  export let iznos: number;
  export let iban_platitelja: number;
  export let model_platitelja: string;
  export let poziv_na_broj_platitelja: number;
  export let iban_primatelja: number;
  export let model_primatelja: string;
  export let poziv_na_broj_primatelja: number;
  export let opis_placanja: string;
</script>

<fieldset class="fieldset-potvrda">
  <div class="potvrda-field potvrda-field--iznos">
    {FormatIntegerToDecimal(iznos)}
  </div>
  <div class="potvrda-field potvrda-field--iban-platitelja">
    {iban_platitelja ?? ""}
  </div>
  <div class="potvrda-field potvrda-field--model-i-poziv-na-broj-platitelja">
    {model_platitelja ?? ""}
    {poziv_na_broj_platitelja ?? ""}
  </div>
  <div class="potvrda-field potvrda-field--iban-primatelja">
    {iban_primatelja ?? ""}
  </div>
  <div class="potvrda-field potvrda-field--model-i-poziv-na-broj-primatelja">
    {model_primatelja ?? ""}
    {poziv_na_broj_primatelja ?? ""}
  </div>
  <div class="potvrda-field potvrda-field--opis-placanja">
    {opis_placanja ?? ""}
  </div>
</fieldset>

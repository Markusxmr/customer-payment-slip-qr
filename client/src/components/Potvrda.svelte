<script lang="ts">
  import { Format } from "../services/Format";

  export let iznos;
  export let iban_platitelja;
  export let model_platitelja;
  export let poziv_na_broj_platitelja;
  export let iban_primatelja;
  export let model_primatelja;
  export let poziv_na_broj_primatelja;
  export let opis_placanja;
</script>

<fieldset class="fieldset-potvrda">
  <div class="potvrda-field potvrda-field--iznos">{Format(iznos)}</div>
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

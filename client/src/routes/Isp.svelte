<script lang="ts">
  import { setPaymentSlip } from "../services/set-payment-slip";
  import Uplatnica from "../components/Uplatnica.svelte";
  import config from "../config";

  export let params = {};
  let isp;
  let model;

  async function getIsp() {
    fetch(`${config.url}/isp/${params.id}`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      isp = await res.json();
    });
  }

  getIsp();
</script>

<h3 style="text-align: center">{isp?.name ?? "..."}</h3>

<div>
  <p>ID: {isp?.id}</p>
  <p>Ulica: {isp?.street}</p>
  <p>Poštanski broj: {isp?.postalCode}</p>
  <p>Grad: {isp?.city}</p>
  <p>OIB: {isp?.oib}</p>
  <p>IBAN: {isp?.iban}</p>
</div>

<span><a class="btn btn-secondary" href="/#/isp">Natrag</a></span>

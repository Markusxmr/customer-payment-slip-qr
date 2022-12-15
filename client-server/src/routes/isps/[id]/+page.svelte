<script lang="ts">
  export let data;
  let { isp, params } = data;
  
</script>

<div style="text-align: center">
  <h3 style="text-align: center">{isp?.name ?? "..."}</h3>

  <div>
    <p>ID: {isp?.id}</p>
    <p>Ulica: {isp?.street}</p>
    <p>Poštanski broj: {isp?.postalCode}</p>
    <p>Grad: {isp?.city}</p>
    <p>OIB: {isp?.oib}</p>
    <p>IBAN: {isp?.iban}</p>
  </div>

  <span><a class="btn btn-secondary btn-sm" href="/isps">Natrag</a></span>
</div>
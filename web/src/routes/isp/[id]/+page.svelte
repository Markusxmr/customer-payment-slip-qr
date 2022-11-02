<script lang="ts">
  export let data;
  let { isp, params } = data;
  
</script>

<div>
  <h3 style="text-align: center">{isp?.name ?? "..."}</h3>

  <div>
    <p>ID: {isp?.id}</p>
    <p>Ulica: {isp?.street}</p>
    <p>Poštanski broj: {isp?.postalCode}</p>
    <p>Grad: {isp?.city}</p>
    <p>OIB: {isp?.oib}</p>
    <p>IBAN: {isp?.iban}</p>
  </div>

  <span><a class="btn btn-secondary" href="/isp">Natrag</a></span>
</div>
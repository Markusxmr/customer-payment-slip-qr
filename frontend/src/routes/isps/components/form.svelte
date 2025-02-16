<script lang="ts">
  export let isp: any;
  export let submit: (params: any) => any;
</script>

<form action="/users" on:submit|preventDefault={() => submit(isp)}>
  <div class="row">
    {#if isp["id"] === null}
      <div class="mb-2 col-md-4 col-sm-12">
        <label for="user_id">ID</label>
        <input
          class="form-control"
          id="isp_id"
          name="isp[id]"
          type="number"
          bind:value={isp["id"]}
        />
      </div>
    {/if}

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="isp_name">Naziv</label>
      <input
        class="form-control"
        id="isp_name"
        name="isp[name]"
        type="text"
        bind:value={isp["name"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="isp_street">Ulica</label>
      <input
        class="form-control"
        id="isp_street"
        name="isp[street]"
        type="text"
        bind:value={isp["street"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="isp_postalCode">Poštanski broj</label>
      <input
        class="form-control"
        id="isp_postalCode"
        name="isp[postalCode]"
        type="number"
        bind:value={isp["postalCode"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="isp_city">Grad</label>
      <input
        class="form-control"
        id="isp_city"
        name="isp[city]"
        type="text"
        bind:value={isp["city"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="isp_oib">Oib</label>
      <input
        class="form-control"
        id="isp_oib"
        name="isp[oib]"
        type="number"
        minlength="11"
        maxlength="11"
        bind:value={isp["oib"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="isp_iban">IBAN</label>
      <input
        class="form-control"
        id="isp_iban"
        name="isp[iban]"
        type="text"
        minlength="21"
        maxlength="21"
        bind:value={isp["iban"]}
      />
    </div>
  </div>

  <div class="text-center">
    <br />
    <span><button class="btn btn-secondary btn-sm" type="submit">Spremi</button></span>
    <span><a class="btn btn-secondary btn-sm" href="/isps">Natrag</a></span>
  </div>
</form>

<style>
  label {
    text-align: right;
  }
</style>

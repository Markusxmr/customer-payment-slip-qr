<script lang="ts">
  import { debounce } from "lodash";
  import config from "../../config";

  let search = "";
  let loading = false;
  let models = [];

  const _debounce = {
    data() {
      return { name: "" };
    },

    methods: {
      handleInput: debounce(async function (event) {
        getIsps();
      }, 300),
    },
  };

  function getIsps() {
    loading = true;
    fetch(`${config.url}/isp?name=${search}`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        models = await res.json();
        loading = false;
      })
      .catch((err) => {
        loading = false;
      });
  }

  getIsps();

  function deleteIsp(id) {
    const promptVal = confirm("Izbrisati?");

    if (!promptVal) return;

    fetch(`${config.url}/isp/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      getIsps();
    });
  }
</script>

<h3>ISP</h3>

<div>
  <a class="btn btn-secondary" href="/#/isp/new">Novi ISP</a>
</div>

<form
  class="d-flex"
  style="margin-top: 21px"
  on:submit|preventDefault={getIsps}
>
  <input
    class="form-control me-2"
    type="search"
    placeholder="Pretraži"
    aria-label="Search"
    on:input={_debounce.methods.handleInput}
    bind:value={search}
  />
</form>
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Naziv</th>
        <th scope="col">Ulica</th>
        <th scope="col">Grad</th>
        <th scope="col">Poštanski broj</th>
        <th scope="col">OIB</th>
        <th scope="col">IBAN</th>
        <th class="text-center" scope="col">Akcije</th>
      </tr>
    </thead>
    <tbody>
      {#if loading}
        <br />
        <h4>Učitavanje...</h4>
      {/if}
      {#each models as item, i}
        <tr>
          <th scope="row">{item?.id}</th>
          <td style="width: 250px">{item?.name}</td>
          <td>{item?.street}</td>
          <td>{item?.postalCode}</td>
          <td>{item?.city}</td>
          <td>{item?.oib}</td>
          <td>{item?.iban}</td>
          <td class="text-center actions">
            <a href="/#/isp/{item.id}" class="btn btn-success btn-sm">Pregled</a
            >
            <a href="/#/isp/{item.id}/edit" class="btn btn-primary btn-sm"
              >Uredi</a
            >
            <button
              class="btn btn-danger btn-sm"
              on:click={() => deleteIsp(item.id)}>Izbriši</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3px;
  }
</style>

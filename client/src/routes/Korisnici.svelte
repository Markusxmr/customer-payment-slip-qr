<script lang="ts">
  import { debounce } from "lodash";
  import config from "../config";

  import XlsUpload from "../components/XlsUpload.svelte";

  let search = "";
  let loading = false;
  let model = {
    poziv_na_broj_platitelja: "",
    poziv_na_broj_primatelja: "",
    iznos: "",
    iban_primatelja: "",
    iban_platitelja: "",
    model_primatelja: "",
    model_platitelja: "",
    sifra_namjene: "",
    datum_izvrsenja: "",
    valuta_placanja: "HRK",
    // Samo vrijednost X ili ništa
    hitno: "X",
    ime_i_prezime_platitelja: "Ime platitelja",
    ulica_i_broj_platitelja: "",
    ulica_i_broj_primatelja: "",
    postanski_i_grad_platitelja: "",
    postanski_i_grad_primatelja: "",
    naziv_primatelja: "",
    opis_placanja: "",
    nalog: "-",
  };
  let models = [];

  const _debounce = {
    data() {
      return { name: "" };
    },

    methods: {
      handleInput: debounce(async function (event) {
        getUsers();
      }, 300),
    },
  };
  function getUsers() {
    loading = true;
    fetch(
      `${config.url}/user?naziv=${search}&adresa=${search}&mjesta=${search}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        models = await res.json();
        loading = false;
      })
      .catch((err) => {
        loading = false;
      });
  }

  function deleteUsers() {
    const promptVal = confirm("Izbrisati sve?");

    if (!promptVal) return;

    fetch(`${config.url}/user`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      getUsers();
    });
  }

  getUsers();

  function deleteUser(id) {
    const promptVal = confirm("Izbrisati?");

    if (!promptVal) return;

    fetch(`${config.url}/user/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      getUsers();
    });
  }
</script>

<h3>Korisnici</h3>

<div>
  <XlsUpload callback={getUsers} />
  <br /><br />
  <a class="btn btn-secondary" href="/#/korisnik/new">Novi korisnik</a>
  <button class="btn btn-secondary" on:click={deleteUsers}>Izbriši sve</button>
</div>

<form
  class="d-flex"
  style="margin-top: 21px"
  on:submit|preventDefault={getUsers}
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
        <th scope="col">Adresa</th>
        <th scope="col">Mjesto</th>
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
          <td style="width: 250px">{item?.naziv}</td>
          <td>{item?.adresa}</td>
          <td>{item?.mjesto}</td>
          <td class="text-center actions">
            <a href="/#/korisnik/{item.id}" class="btn btn-success btn-sm"
              >Pregled</a
            >
            <a href="/#/korisnik/{item.id}/edit" class="btn btn-primary btn-sm"
              >Uredi</a
            >
            <button
              class="btn btn-danger btn-sm"
              on:click={() => deleteUser(item.id)}>Izbriši</button
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

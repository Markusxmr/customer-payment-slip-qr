<script lang="ts">
  import { debounce } from "lodash";
  import Handsontable from "handsontable";
  import config from "../../config";

  import XlsUpload from "../XlsUpload.svelte";
  import { model } from "src/model";
  import { onMount } from "svelte";

  let search = "";
  let loading = false;
  let models = [];
  let hot: Handsontable;
  let colHeaders: string[] = [];
  let data = [];
  let container;
  let tableMounted = false;

  onMount(() => {
    container = document.getElementById("customers");
  });

  $: if (container && models.length > 0 && tableMounted === false) {
    createTable();
    tableMounted = true;
  }

  const _debounce = {
    data() {
      return { name: "" };
    },

    methods: {
      handleInput: debounce(async function (event) {
        getCustomers();
      }, 300),
    },
  };

  function actionRenderer(instance, td, row, col, prop, value, cellProperties) {
    var stringifiedValue = Handsontable.helper.stringify(value);
    let viewBtn = document.createElement("a");
    let deleteBtn = document.createElement("a");
    viewBtn.href = `/#/korisnik/${stringifiedValue}`;
    viewBtn.className = "btn btn-success btn-sm";
    deleteBtn.className = "btn btn-danger btn-sm";
    viewBtn.textContent = "Pregled";
    deleteBtn.textContent = "Izbriši";
    deleteBtn.addEventListener("click", (event) => {
      deleteCustomer(stringifiedValue);
    });

    let container = document.createElement("div");
    container.appendChild(viewBtn);
    container.appendChild(deleteBtn);
    Handsontable.dom.addEvent(container, "mousedown", function (e) {
      e.preventDefault(); // prevent selection quirk
    });

    Handsontable.dom.empty(td);
    td.appendChild(container);
  }

  function createTable() {
    hot = new Handsontable(container, {
      data: data,
      rowHeaders: true,
      colHeaders,
      filters: true,
      dropdownMenu: true,
      manualColumnResize: true,
      manualRowResize: true,
      afterChange: function (changes, source) {
        if (changes) {
          for (const change of changes) {
            let [index, column, prevVal, newVal] = change ?? [];
            if (source === "loadData") {
              return; //don't save this change
            }
            let user = { ...data[index], [column]: newVal };
            updateCustomer(user);
          }
        }
      },
      columns: [
        ...Object.keys(data[0]).map((key) => {
          if (key === "Akcije")
            return { data: "Akcije", renderer: actionRenderer };
          return { data: key, renderer: "html" };
        }),
      ],
      licenseKey: "non-commercial-and-evaluation",
    });
  }

  async function getCustomers() {
    loading = true;
    await fetch(
      `${config.url}/customer?naziv=${search}&adresa=${search}&mjesta=${search}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        models = await res.json();
        models = models.map((model) => ({
          Akcije: model?.id,
          ...model,
        }));
        colHeaders = Object.keys(models[0] ?? []);
        data = models;

        loading = false;
      })
      .catch((err) => {
        loading = false;
      });
  }

  function deleteCustomers() {
    const promptVal = confirm("Izbrisati sve?");

    if (!promptVal) return;

    fetch(`${config.url}/customer`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      getCustomers();
    });
  }

  getCustomers();

  function deleteCustomer(id) {
    const promptVal = confirm("Izbrisati?");

    if (!promptVal) return;

    fetch(`${config.url}/customer/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      getCustomers();
    });
  }

  function updateCustomer(user) {
    fetch(`${config.url}/customer/${user.id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      getCustomers();
    });
  }
</script>

<h3>Korisnici</h3>

<div>
  <XlsUpload callback={getCustomers} />
  <br /><br />
  <a class="btn btn-secondary btn-sm" href="/#/korisnik/new">Novi korisnik</a>
  <button class="btn btn-secondary btn-sm" on:click={deleteCustomers}
    >Izbriši sve</button
  >
</div>

<form
  class="d-flex"
  style="margin-top: 21px"
  on:submit|preventDefault={getCustomers}
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

<div id="customers" />

<style>
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3px;
  }
</style>

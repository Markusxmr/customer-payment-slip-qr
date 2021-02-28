<script lang="ts">
  import { debounce } from "lodash";
  import Handsontable from "handsontable";
  import config from "../../config";

  import XlsUpload from "../XlsUpload.svelte";
  import { model } from "../../model";
  import { onMount } from "svelte";
  import { createCustomer, getCustomer } from "../../services/http";

  let search = "";
  let loading = false;
  let models = [];
  let hot: Handsontable;
  let colHeaders: string[] = [];
  let data = [];
  let container;
  let tableMounted = false;

  async function setTableData() {
    models = models.map((model) => ({
      Akcije: model?.id,
      ...model,
    }));
    colHeaders = Object.keys(models[0] ?? []);
    data = models;
    if (hot) {
      hot.loadData(data);
    }
  }

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
    let viewLink = document.createElement("a");
    let icon = document.createElement("i");
    icon.className = "arrow-right-square";
    viewLink.appendChild(icon);
    viewLink.href = `/#/korisnik/${stringifiedValue}`;
    viewLink.textContent = "Pregled";

    let container = document.createElement("div");
    container.appendChild(viewLink);
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
      contextMenu: true,
      columnSorting: true,
      afterChange: function (changes, source) {
        if (!changes) return;

        for (const change of changes) {
          let [index, column, prevVal, newVal] = change ?? [];
          if (source === "loadData") {
            return; //don't save this change
          }
          let item = {
            ...(data[index]?.data ?? data[index]),
            [column]: newVal,
          };

          if (item?.id) updateCustomer(item);
          if (!item?.id) createCustomer(item).then(() => getCustomers());
        }
      },
      beforeRemoveRow: function (
        index: number,
        amount: number,
        physicalRows: number[],
        source: Handsontable.ChangeSource
      ) {
        const promptVal = confirm(
          `Izbrisati ${amount} ${amount === 1 ? "stupac" : "stupca"}?`
        );
        if (!promptVal) return;
        for (const row of physicalRows) {
          let item = data[row];

          if (item?.id)
            deleteCustomer(item?.id).then(() => {
              if (row + 1 === amount) {
                getCustomers();
              }
            });
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
        setTableData();
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
    return fetch(`${config.url}/customer/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
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
  <XlsUpload callback={getCustomers}>
    <!-- <a class="btn btn-secondary btn-sm" href="/#/korisnik/new">Novi korisnik</a> -->
    <button
      class="btn btn-secondary btn-danger btn-sm"
      on:click={deleteCustomers}>Izbriši sve</button
    ></XlsUpload
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

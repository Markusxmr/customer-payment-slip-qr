<script lang="ts">
  import { debounce } from "lodash";
  import Handsontable from "handsontable";
  import { onDestroy, onMount } from "svelte";

  import config from "../../config";
  import XlsUpload from "../XlsUpload.svelte";
  import Spinner from "../Spinner.svelte";
  import { store } from "../../store";
  import { authorization, createCustomer, unauthorized, unauthorizedError } from "../../services/http";

  let search = "";
  let loading = false;
  let customers = [];
  let hot: Handsontable;
  let colHeaders: string[] = [];
  let data = [];
  let container;
  let tableMounted = false;

  store.subscribe((state) => {
    setTableData(state.customers);
  });

  async function setTableData(val) {
    customers = val.map((model) => ({
      Akcije: model?.id,
      ...model,
    }));
    colHeaders = Object.keys(customers[0] ?? []);
    data = customers;
    if (hot) {
      hot.loadData(data);
    }
  }

  onMount(() => {
    container = document.getElementById("customers");
  });

  onDestroy(() => {
    store.update((state) => ({ ...state, customer: null }));
  });

  $: if (container && customers.length > 0 && tableMounted === false) {
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
    viewLink.href = `/#/customer/${stringifiedValue}`;
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
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: authorization(),
        },
      }
    )
      .then(async (res) => {
      unauthorized(res);
        customers = await res.json();
        store.update((state) => ({ ...state, customers }));
        setTableData(customers);
        loading = false;
      })
      .catch((err) => {
        loading = false;
        unauthorizedError(err);
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
      authorization: authorization(),
      },
    }).then(async (res) => {
      unauthorized(res);
      getCustomers();
    })
      .catch((err) => {
        loading = false;
        unauthorizedError(err);
      });
  }

  getCustomers();

  function deleteCustomer(id) {
    return fetch(`${config.url}/customer/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      authorization: authorization(),
      },
    }).then(res => {

      unauthorized(res);
    })
      .catch((err) => {
        loading = false;
        unauthorizedError(err);
      });
  }

  function updateCustomer(user) {
    fetch(`${config.url}/customer/${user.id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      authorization: authorization(),
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      unauthorized(res);
      getCustomers();
    })
      .catch((err) => {
        loading = false;
        unauthorizedError(err);
      });
  }
</script>

<div class="customer-list-heading">
  <h3>Korisnici</h3>
  <Spinner loading={loading || customers.length === 0} inline={true} />
</div>
<div>
  <XlsUpload callback={getCustomers}>
    <!-- <a class="btn btn-secondary btn-sm" href="/#/customer/new">Novi korisnik</a> -->
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
  .customer-list-heading {
    display: grid;
    grid-template-columns: 125px 100px;
  }
</style>

<script lang="ts">
  import { debounce } from "lodash";
  import Handsontable from "handsontable";
  import { onMount } from "svelte";
  import { deleteIsp, getIsps, updateIsp } from "src/services/http";
  import { store } from "src/store";

  let search = "";
  let loading = false;
  let models = [];
  let hot: Handsontable;
  let tableMounted = false;
  let colHeaders: string[] = [];
  let data = [];
  let container;

  store.subscribe((state) => {
    models = state?.isps;
    setTableData();
  });

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
    container = document.getElementById("isps");
  });

  $: if (container && models.length > 0 && tableMounted === false) {
    createTable();
    tableMounted = true;
  }

  async function listIsp() {
    await getIsps()
      .then(async (data) => {
        loading = false;
      })
      .catch((err) => {
        loading = false;
      });
  }

  listIsp();

  const _debounce = {
    data() {
      return { name: "" };
    },

    methods: {
      handleInput: debounce(async function (event) {
        listIsp();
      }, 300),
    },
  };
  function actionRenderer(instance, td, row, col, prop, value, cellProperties) {
    var stringifiedValue = Handsontable.helper.stringify(value);
    let viewBtn = document.createElement("a");
    let deleteBtn = document.createElement("a");
    viewBtn.href = `/#/isp/${stringifiedValue}`;
    viewBtn.className = "btn btn-success btn-sm";
    deleteBtn.className = "btn btn-danger btn-sm";
    viewBtn.textContent = "Pregled";
    deleteBtn.textContent = "Izbriši";
    deleteBtn.addEventListener("click", (event) => {
      deleteIsp(stringifiedValue).then(() => listIsp());
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
            let item = { ...data[index], [column]: newVal };
            updateIsp(item).then(() => listIsp());
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
</script>

<h3>ISP</h3>

<div>
  <a class="btn btn-secondary btn-sm" href="/#/isp/new">Novi Isp</a>
</div>

<form
  class="d-flex"
  style="margin-top: 21px"
  on:submit|preventDefault={listIsp}
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

<div id="isps" />

<style>
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3px;
  }
</style>

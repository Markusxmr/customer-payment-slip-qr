<script lang="ts">
	import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { debounce } from "lodash";
  import Handsontable from "handsontable";
  import { store } from "$lib/store";
  import { createIsp, deleteIsp, getIsps, updateIsp } from "$lib/services";
  import Spinner from "../spinner.svelte";

  let search = "";
  let loading = false;
  let isps: any[] = [];
  let handsontable: Handsontable;
  let tableMounted = false;
  let colHeaders: string[] = [];
  let data: any[] = [];
  let container: Element;

  async function setTableData() {
    if (!isps) return;

    isps = isps?.map((model) => ({
      Akcije: model?.id,
      ...model,
    }));
    colHeaders = Object.keys(isps[0] ?? []);
    data = isps;
    loading = false;
  }

  $: if (browser && container && isps?.length > 0 && tableMounted === false) {
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

  function actionRenderer(instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) {
    let stringifiedValue = Handsontable.helper.stringify(value);
    let viewBtn = document.createElement("a");
    viewBtn.href = `/isps/${stringifiedValue}`;
    viewBtn.className = "btn btn-success btn-sm";
    viewBtn.textContent = "Pregled";
    viewBtn.style = "color: #fff;"

    let container = document.createElement("div");
    container.appendChild(viewBtn);
    Handsontable.dom.addEvent(container, "mousedown", function (e: any) {
      e.preventDefault(); // prevent selection quirk
    });
    Handsontable.dom.empty(td);
    td.appendChild(container);
  }

  function createTable() {
    handsontable = new Handsontable(container, {
      data: data,
      rowHeaders: true,
      colHeaders,
      filters: true,
      dropdownMenu: true,
      manualColumnResize: true,
      manualRowResize: true,
      contextMenu: true,
      columnSorting: true,
      width: '100vw',
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

          if (item?.id) updateIsp(item).then(() => listIsp());
          if (!item?.id) createIsp(item).then(() => listIsp());
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
          if (item?.id) {
            deleteIsp(item?.id).then(() => {
              if (row + 1 === amount) {
                listIsp();
              }
            });
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

  listIsp();

  store.subscribe((state) => {
    isps = state?.isps;
    
    if (browser) {
      setTableData();
    }
  });

  onMount(() => {
    let element = document.getElementById("isps");

    if (element) {
      container = element;
    }

    if (handsontable) {
      handsontable.loadData(data);
    }
  });
</script>

<div>
  <h3 class="text-center">ISP</h3>

  <div class="text-center">
    <a class="btn btn-secondary btn-sm" href="/isps/new">Novi Isp</a>
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

  <Spinner {loading} />

  <div id="isps" />

  {#if !data}
    <h3 class="text-center">Nema Podataka</h3>
  {/if}
</div>
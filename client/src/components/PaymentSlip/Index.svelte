<script lang="ts">
  import Handsontable from "handsontable";
  import { getCustomer, updatePaymentSlip } from "../../services/http";
  import { onMount } from "svelte";
  import { store } from "../../store";

  export let paymentSlips: any[] = [];
  let key = Math.random();
  let prevSlips = [];
  let hot: Handsontable;
  let colHeaders: string[] = [];
  let data = [];
  let loading = false;
  let container;
  let tableMounted = false;

  store.subscribe((state) => {
    paymentSlips = state?.paymentSlips;

    setTableData();
  });

  function setTableData() {
    colHeaders = Object.keys(paymentSlips[0]);
    data = paymentSlips.map((model, i) => {
      return {
        data: model,
        renderer: "html",
      };
    });
    if (hot) {
      hot.loadData(data);
    }
  }

  if (paymentSlips.length > 0) {
    prevSlips = paymentSlips;
    setTableData();
  }

  $: if (container && paymentSlips.length > 0 && tableMounted === false) {
    createTable();
    tableMounted = true;
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
          let [index, column, prevVal, newVal] = change;
          if (source === "loadData") {
            return; //don't save this change
          }
          let item = {
            ...(data[index]?.data ?? data[index]),
            [column]: newVal,
          };

          if (item?.id)
            updatePaymentSlip(item).then(() => {
              getCustomer({ id: item?.customer_id });
            });
        }
      },
      beforeRemoveRow: function (
        index: number,
        amount: number,
        physicalRows: number[],
        source: Handsontable.ChangeSource
      ) {
        let item = data[index];
      },
      licenseKey: "non-commercial-and-evaluation",
    });
  }

  onMount(async () => {
    container = document.getElementById(`datatable-${key}`);
  });
</script>

{#if loading}
  <br />
  <h4>Učitavanje...</h4>
{/if}
<div id="datatable-{key}" />

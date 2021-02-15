<script lang="ts">
  import Handsontable from "handsontable";
  import { onMount } from "svelte";

  export let paymentSlips: any[] = [];
  let key = Math.random();
  let prevSlips = [];
  let hot: Handsontable;
  let colHeaders: string[] = [];
  let data = [];
  let loading = false;
  let container;
  let mounted = false;
  if (paymentSlips) {
    prevSlips = paymentSlips;
    colHeaders = Object.keys(paymentSlips[0]);
    data = paymentSlips.map((model, i) => {
      return {
        data: model,
        renderer: "html",
      };
    });
  }

  $: if (container && mounted === false) {
    createTable();
    mounted = true;
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
      afterChange: function (change, source) {
        if (change) {
          let [index, column, _, cellData] = change[0] ?? [];
          if (source === "loadData") {
            return; //don't save this change
          }
        }
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

<script lang="ts">
	import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Handsontable from "handsontable";
  import {
    deletePaymentSlip,
    getCustomer,
    getPaymentSlips,
    updatePaymentSlip,
  } from "$lib/services";
  import { store } from "$lib/store";
	import NoData from "$lib/components/no-data.svelte";

  export let paymentSlips: any[] = [];
  let key = Math.random();
  let prevSlips = [];
  let handsontable: Handsontable;
  let colHeaders: string[] = [];
  let data: any[] = [];
  let loading = false;
  let container: Element;
  let tableMounted = false;

  function setTableData() {
    if (!paymentSlips || paymentSlips?.length === 0) return;

    colHeaders = Object.keys(paymentSlips[0]);
    data = paymentSlips?.map((model, i) => {
      return {
        data: model,
        renderer: "html",
      };
    });
    if (handsontable) {
      handsontable.loadData(data);
    }

    loading = false;
  }

  if (paymentSlips?.length > 0) {
    prevSlips = paymentSlips;
    setTableData();
  }

  $: if (browser && container && paymentSlips?.length > 0 && tableMounted === false) {
    createTable();
    tableMounted = true;
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
          let [index, column, prevVal, newVal] = change;
          if (source === "loadData") {
            return; //don't save this change
          }
          let item = {
            ...(data[index]?.data ?? data[index]),
            [column]: newVal,
          };

          if (item?.id) {
            updatePaymentSlip(item).then(() => {
              getCustomer({ id: item?.customer_id });
            });
          }
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
            deletePaymentSlip(item?.id).then(() => {
              if (row + 1 === amount) {
                getPaymentSlips().then(data => {
                  loading = false;
                });
              }
            });
          }
        }
      },
      licenseKey: "non-commercial-and-evaluation",
    });
  }

  store.subscribe((state) => {
    paymentSlips = state?.paymentSlips;
    
    if (browser) {
      setTableData();
    }
  });

  onMount(async () => {
    let element = document.getElementById(`datatable-${key}`);

    if (element) {
      container = element;
    }
  });
</script>

<div>
  <div id="datatable-{key}" />

  {#if !paymentSlips}
    <NoData />
  {/if}
</div>
<script lang="ts">
	import NoData from '$lib/components/no-data.svelte';
  import { store } from '$lib/store';
	import { onMount } from "svelte";

  let Customers: any;

  onMount(async () => {
    Customers = (await import("$lib/components/customer/customers.svelte")).default;
  })
</script>

{#if Customers}
  <div>
      <Customers />
  </div>
{/if}

{#if $store.customers?.length === 0}
  <NoData />
{/if}
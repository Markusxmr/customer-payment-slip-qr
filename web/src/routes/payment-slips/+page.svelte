<script lang="ts">
	import { onMount } from "svelte";
  import { store } from "$lib/store";
  import { getPaymentSlips } from "$lib/services";
  import Spinner from "$lib/components/spinner.svelte";
	import NoData from "$lib/components/no-data.svelte";

  let paymentSlips: any[] = [];
  let data = [];
  let loading = true;
  let PaymentSlipList: any;

  store.subscribe((state) => {
    paymentSlips = state?.paymentSlips;
  });

  getPaymentSlips().then(() => {
    loading = false;
  });

  onMount(async () => {
    PaymentSlipList = (await import("$lib/components/payment-slip/payment-slips.svelte")).default;
  })
</script>

<div>
  <h3 class="text-center">Uplatnice</h3>

  {#if loading}
    <Spinner {loading} />
  {:else}
    {#if paymentSlips?.length === 0}
      <NoData />
    {/if}

    {#if PaymentSlipList}
      <PaymentSlipList {paymentSlips} />
    {/if}
  {/if}
</div>
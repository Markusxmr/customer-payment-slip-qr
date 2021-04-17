<script lang="ts">
  import config from "../config";
  import { store } from "../store";

  import PaymentSlipList from "../components/PaymentSlip/PaymentSlipList.svelte";
  import { getPaymentSlips } from "../services/http";
  import Spinner from "../components/Spinner.svelte";

  let paymentSlips: any[] = [];
  let data = [];
  let loading = true;

  store.subscribe((state) => {
    paymentSlips = state?.paymentSlips;
  });

  getPaymentSlips().then(() => {
    loading = false;
  });
</script>

<h3 class="text-center">Uplatnice</h3>

{#if loading}
  <Spinner {loading} />
{:else}
  <PaymentSlipList {paymentSlips} />
{/if}

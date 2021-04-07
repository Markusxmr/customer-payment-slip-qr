<script lang="ts">
  import config from "../config";
  import { store } from "../store";

  import PaymentSlipTable from "../components/PaymentSlipTable/PaymentSlipTable.svelte";
  import { getPaymentSlips } from "../services/http";

  let paymentSlips: any[] = [];
  let data = [];
  let loading = false;

  store.subscribe((state) => {
    paymentSlips = state?.paymentSlips;
  });

  getPaymentSlips();
</script>

<h3>Uplatnice</h3>

{#if paymentSlips.length > 0}
  <PaymentSlipTable {paymentSlips} />
{/if}

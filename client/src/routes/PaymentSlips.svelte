<script lang="ts">
  import config from "src/config";

  import PaymentSlip from "../components/PaymentSlip/Index.svelte";

  let paymentSlips: any[] = [];
  let data = [];
  let loading = false;

  async function getPaymentSlips() {
    loading = true;
    fetch(`${config.url}/payment-slip`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        paymentSlips = await res.json();
        loading = false;
      })
      .catch((err) => {
        loading = false;
      });
  }

  getPaymentSlips();
</script>

<h3>Uplatnice</h3>

{#if paymentSlips.length > 0}
  <PaymentSlip {paymentSlips} />
{/if}

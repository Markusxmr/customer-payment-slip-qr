<script lang="ts">
	import { onMount } from "svelte";
  import { store } from "$lib/store";
  import { getPaymentSlips } from "$lib/services";
  import Spinner from "$lib/components/spinner.svelte";
	import NoData from "$lib/components/no-data.svelte";
	import _ from 'lodash';
	const { debounce } = _;

  let paymentSlips: any[] = [];
  let data = [];
  let loading = true;
  let PaymentSlipList: any;
	let search = '';

  store.subscribe((state) => {
    paymentSlips = state?.paymentSlips;
  });


	// Debounce object for search input
	const _debounce = {
		data() {
			return { name: '' };
		},
		methods: {
			handleInput: debounce(async function () {
				await getPaymentSlips();
			}, 300)
		}
	};

  getPaymentSlips().then(() => {
    loading = false;
  });

  onMount(async () => {
    PaymentSlipList = (await import("./components/payment-slips.svelte")).default;
  })
</script>

<div>
  <h3>Uplatnice</h3>

  <br>

  <form class="d-flex search-form" on:submit|preventDefault={() => getPaymentSlips()}>
			<input
				class="form-control me-2"
				type="search"
				placeholder="Pretraži"
				aria-label="Search"
				on:input={_debounce.methods.handleInput}
				bind:value={search}
			/>
		</form>


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
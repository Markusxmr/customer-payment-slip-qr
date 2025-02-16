<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { debounce } from 'lodash';
	import Handsontable from 'handsontable';
	import config from '$lib/config';
	import XlsUpload from '$lib/components/xls-upload.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { store } from '$lib/store';
	import { authorization, createCustomer, unauthorized, unauthorizedError } from '$lib/services';

	let search = '';
	let loading = false;
	let customers: any[] = [];
	let handsontable: Handsontable;
	let colHeaders: string[] = [];
	let customersRaw: any[] = [];
	let container: Element;
	let tableMounted = false;

	async function setTableData(values: any[] = []) {
		if (!values || values?.length === 0) return;

		customers = values?.map((model: { id: any }) => ({
			Akcije: model?.id,
			...model
		}));
		colHeaders = Object.keys(customers[0] ?? []);
		customersRaw = customers;

		if (handsontable) {
			handsontable.loadData(customersRaw);
		}
	}

	$: if (browser && container && customers?.length > 0 && tableMounted === false) {
		createTable();
		tableMounted = true;
	}

	const _debounce = {
		data() {
			return { name: '' };
		},

		methods: {
			handleInput: debounce(async function (event) {
				getCustomers();
			}, 300)
		}
	};

	function actionRenderer(
		instance: any,
		td: any,
		row: any,
		col: any,
		prop: any,
		value: any,
		cellProperties: any
	) {
		let stringifiedValue = Handsontable.helper.stringify(value);
		let viewBtn = document.createElement('a');
		viewBtn.href = `javascript: void(0)`;
		viewBtn.textContent = 'Pregled';
		Handsontable.dom.removeEvent(viewBtn, 'mousedown', () =>
			goto(`/payment-slips/customer/${stringifiedValue}`)
		);
		Handsontable.dom.addEvent(viewBtn, 'mousedown', (e: any) =>
			goto(`/payment-slips/customer/${stringifiedValue}`)
		);
		let container = document.createElement('div');
		container.appendChild(viewBtn);
		Handsontable.dom.addEvent(container, 'mousedown', (e: any) => e.preventDefault()); // prevent selection quirk;
		Handsontable.dom.empty(td);
		td.appendChild(container);
	}

	function createTable() {
		handsontable = new Handsontable(container, {
			data: customersRaw,
			rowHeaders: true,
			colHeaders,
			filters: true,
			dropdownMenu: true,
			manualColumnResize: true,
			manualRowResize: true,
			contextMenu: true,
			columnSorting: true,
			width: '100vw',
			collapsibleColumns: true,
			nestedRows: true,
			afterChange: function (changes, source) {
				if (!changes) return;

				for (const change of changes) {
					let [index, column, prevVal, newVal] = change ?? [];
					if (source === 'loadData') {
						return; //don't save this change
					}
					let item = {
						...(customersRaw[index]?.data ?? customersRaw[index]),
						[column]: newVal
					};

					if (item?.id) updateCustomer(item);
					if (!item?.id) createCustomer(item).then(() => getCustomers());
				}
			},
			beforeRemoveRow: function (
				index: number,
				amount: number,
				physicalRows: number[],
				source?: Handsontable.ChangeSource
			) {
				const promptVal = confirm(`Izbrisati ${amount} ${amount === 1 ? 'stupac' : 'stupca'}?`);
				if (!promptVal) return;
				for (const row of physicalRows) {
					let item = customersRaw[row];

					if (item?.id)
						deleteCustomer(item?.id).then(() => {
							if (row + 1 === amount) {
								getCustomers();
							}
						});
				}
			},
			columns: [
				...Object.keys(customersRaw[0]).map((key) => {
					if (key === 'Akcije') return { data: 'Akcije', renderer: actionRenderer };
					return { data: key, renderer: 'html' };
				})
			],
			licenseKey: 'non-commercial-and-evaluation'
		});
	}

	async function getCustomers() {
		loading = true;
		await fetch(`${config.url}/customer?naziv=${search}&adresa=${search}&mjesta=${search}`, {
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				authorization: authorization()
			}
		})
			.then(async (res) => {
				unauthorized(res);
				customers = (await res.json()) ?? [];
				store.update((state) => ({ ...state, customers }));
				setTableData(customers);
				loading = false;
			})
			.catch((err) => {
				loading = false;
				unauthorizedError(err);
			});
	}

	function deleteCustomers() {
		const promptVal = confirm('Izbrisati sve?');

		if (!promptVal) return;

		fetch(`${config.url}/customer`, {
			method: 'DELETE',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				authorization: authorization()
			}
		})
			.then(async (res) => {
				unauthorized(res);
				getCustomers();
				loading = false;
			})
			.catch((err) => {
				loading = false;
				unauthorizedError(err);
			});
	}

	function deleteCustomer(id: any) {
		return fetch(`${config.url}/customer/${id}`, {
			method: 'DELETE',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				authorization: authorization()
			}
		})
			.then((res) => {
				unauthorized(res);
				loading = false;
			})
			.catch((err) => {
				loading = false;
				unauthorizedError(err);
			});
	}

	function updateCustomer(user: { id: any }) {
		fetch(`${config.url}/customer/${user.id}`, {
			method: 'PUT',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				authorization: authorization()
			},
			body: JSON.stringify(user)
		})
			.then(async (res) => {
				unauthorized(res);
				getCustomers();
				loading = false;
			})
			.catch((err) => {
				loading = false;
				unauthorizedError(err);
			});
	}

	store.subscribe((state) => {
		if (browser) {
			setTableData(state.customers);
		}
	});

	onMount(async () => {
		await getCustomers();
		let element = document.getElementById('customers');
		if (element) {
			container = element;
		}
	});

	onDestroy(() => {
		store.update((state) => ({ ...state, customer: null }));
	});
</script>

<div>
	<div class="text-center">
		<div class="customer-list-heading">
			<h3>Korisnici</h3>
			<Spinner {loading} inline={true} />
		</div>

		<div>
			<XlsUpload callback={getCustomers}>
				<button class="btn btn-secondary btn-danger btn-sm" on:click={deleteCustomers}
					>Izbriši sve</button
				></XlsUpload
			>
		</div>
	</div>

	{#if customersRaw?.length > 0}
		<form class="d-flex" style="margin-top: 21px" on:submit|preventDefault={getCustomers}>
			<input
				class="form-control me-2"
				type="search"
				placeholder="Pretraži"
				aria-label="Search"
				on:input={_debounce.methods.handleInput}
				bind:value={search}
			/>
		</form>

		<div id="customers" />
	{:else}
		<h3 class="mt-5 text-center">Nema Podataka</h3>
	{/if}
</div>

<style>
	.customer-list-heading {
		display: grid;
		grid-template-columns: 125px 100px;
	}
</style>

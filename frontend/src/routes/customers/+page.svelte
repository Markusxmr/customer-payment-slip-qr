<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import config from '$lib/config';
	import XlsUpload from '$lib/components/xls-upload.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { store } from '$lib/store';
	import { authorization, createCustomer, unauthorized, unauthorizedError } from '$lib/services';
	import _ from 'lodash';
	const { debounce } = _;

	let search = '';
	let loading = false;
	let customers: any[] = [];
	let customersRaw: any[] = [];
	let colHeaders: string[] = [];

	// We keep two separate variables:
	let HandsontableLib: any; // library (constructor + static methods)
	let hot: any;             // actual Handsontable instance

	let container: HTMLElement | null = null;
	let tableMounted = false;

	// Debounce object for search input
	const _debounce = {
		data() {
			return { name: '' };
		},
		methods: {
			handleInput: debounce(async function () {
				await getCustomers();
			}, 300)
		}
	};

	// Whenever we have actual data, load it into the table
	async function setTableData(values: any[] = []) {
		if (!values || values.length === 0) return;

		customers = values.map((model: { id: any }) => ({
			Akcije: model?.id,
			...model
		}));

		colHeaders = Object.keys(customers[0] ?? {});
		customersRaw = customers;

		if (hot) {
			hot.loadData(customersRaw);
		}
	}

	// Create the Handsontable once we have data + container
	$: if (browser && container && customers.length > 0 && tableMounted === false) {
		createTable();
		tableMounted = true;
	}

	function actionRenderer(
		instance: any,
		td: any,
		row: any,
		col: any,
		prop: any,
		value: any,
		cellProperties: any
	) {
		// Use the library’s helper to safely turn value into a string
		let stringifiedValue = HandsontableLib.helper.stringify(value);

		let viewBtn = document.createElement('a');
		viewBtn.href = 'javascript:void(0)';
		viewBtn.textContent = 'Pregled';

		// Remove old event (to be safe) then add the new one
		HandsontableLib.dom.removeEvent(viewBtn, 'mousedown', () => null);
		HandsontableLib.dom.addEvent(viewBtn, 'mousedown', () => {
			goto(`/payment-slips/customer/${stringifiedValue}`);
		});

		let btnContainer = document.createElement('div');
		btnContainer.appendChild(viewBtn);

		// Prevent accidental row selection on click
		HandsontableLib.dom.addEvent(btnContainer, 'mousedown', (e: any) => e.preventDefault());

		HandsontableLib.dom.empty(td);
		td.appendChild(btnContainer);
	}

	function createTable() {
		// Initialize the instance here, referencing the library
		hot = new HandsontableLib(container, {
			data: customersRaw,
			rowHeaders: true,
			colHeaders,
			filters: true,
			dropdownMenu: true,
			manualColumnResize: true,
			manualRowResize: true,
			contextMenu: true,
			columnSorting: true,
			collapsibleColumns: true,
			nestedRows: true,
			licenseKey: 'non-commercial-and-evaluation',

			afterChange(changes: any, source: any) {
				if (!changes) return;

				for (const change of changes) {
					let [index, column, prevVal, newVal] = change ?? [];
					if (source === 'loadData') {
						return; // don't save this change
					}
					let item = {
						...(customersRaw[index]?.data ?? customersRaw[index]),
						[column]: newVal
					};

					if (item?.id) {
						updateCustomer(item);
					} else {
						createCustomer(item).then(() => getCustomers());
					}
				}
			},

			beforeRemoveRow(
				index: number,
				amount: number,
				physicalRows: number[],
				source?: any
			) {
				const promptVal = confirm(
					`Izbrisati ${amount} ${amount === 1 ? 'stupac' : 'stupca'}?`
				);
				if (!promptVal) return;

				for (const row of physicalRows) {
					let item = customersRaw[row];
					if (item?.id) {
						deleteCustomer(item?.id).then(() => {
							// if it was the last row, reload
							if (row + 1 === amount) {
								getCustomers();
							}
						});
					}
				}
			},

			columns: [
				...Object.keys(customersRaw[0] || {}).map((key) => {
					if (key === 'Akcije') {
						return { data: 'Akcije', renderer: actionRenderer };
					}
					return { data: key, renderer: 'html' };
				})
			]
		});
	}

	async function getCustomers() {
		loading = true;
		try {
			const res = await fetch(
				`${config.url}/customer?naziv=${search}&adresa=${search}&mjesta=${search}`,
				{
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
						authorization: authorization()
					}
				}
			);
			unauthorized(res);
			const data = (await res.json()) ?? [];
			customers = data;
			store.update((state) => ({ ...state, customers }));
			setTableData(customers);
		} catch (err) {
			unauthorizedError(err);
		} finally {
			loading = false;
		}
	}

	function deleteCustomers() {
		const promptVal = confirm('Izbrisati sve?');
		if (!promptVal) return;

		loading = true;
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
			})
			.catch(unauthorizedError)
			.finally(() => {
				loading = false;
			});
	}

	function deleteCustomer(id: any) {
		loading = true;
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
			})
			.catch(unauthorizedError)
			.finally(() => {
				loading = false;
			});
	}

	function updateCustomer(user: { id: any }) {
		loading = true;
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
			})
			.catch(unauthorizedError)
			.finally(() => {
				loading = false;
			});
	}

	// Keep Svelte store in sync
	store.subscribe((state) => {
		if (browser) {
			setTableData(state.customers);
		}
	});

	onMount(async () => {
		if (!browser) return;
		// Dynamically import the Handsontable library
		const module = await import('handsontable');
		HandsontableLib = module.default;

		await getCustomers();

		// Assign container
		let element = document.getElementById('customers');
		if (element) {
			container = element;
		}
	});

	onDestroy(() => {
		store.update((state) => ({ ...state, customer: null }));
	});
</script>

<!-- Component Markup -->
<div>
	<div>
		<div class="customer-list-heading">
			<h3>Korisnici</h3>
			<Spinner {loading} inline={true} />
		</div>

		<div>
			<XlsUpload callback={getCustomers}>
				<button class="btn btn-secondary btn-danger btn-sm" on:click={deleteCustomers}>
					Izbriši sve
				</button>
			</XlsUpload>
		</div>
	</div>

	{#if customersRaw?.length > 0}
		<form class="d-flex search-form" on:submit|preventDefault={getCustomers}>
			<input
				class="form-control me-2"
				type="search"
				placeholder="Pretraži"
				aria-label="Search"
				on:input={_debounce.methods.handleInput}
				bind:value={search}
			/>
		</form>

		<div class="table-container">
			<div id="customers" />
		</div>
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

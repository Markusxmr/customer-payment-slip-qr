<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { store } from '$lib/store';
	import { createIsp, deleteIsp, getIsps, updateIsp } from '$lib/services';
	import Spinner from '$lib/components/spinner.svelte';
	import { goto } from '$app/navigation';
	import _ from 'lodash';

	const { debounce } = _;
	let search = '';
	let loading = false;
	let isps: any[] = [];
	let data: any[] = [];
	let colHeaders: string[] = [];

	// We'll store the container element and the Handsontable instance here:
	let container: HTMLElement | null = null;
	let handsontable: any = null;

	// IMPORTANT: We'll dynamically import 'handsontable' in onMount
	let Handsontable: any;

	let tableMounted = false;

	/**
	 * Subscribe to store changes, update local `isps`,
	 * and repopulate table data if we’re in the browser
	 */
	store.subscribe((state) => {
		isps = state?.isps ?? [];
		if (browser) {
			setTableData();
		}
	});

	/**
	 * Prepare data/headers from the `isps` array
	 */
	async function setTableData() {
		if (!isps || isps.length === 0) {
			data = [];
			return;
		}

		// Insert an "Akcije" field to the beginning of each object
		isps = isps.map((model) => ({
			Akcije: model?.id,
			...model
		}));

		colHeaders = Object.keys(isps[0]);
		data = isps;
		loading = false;

		// If the table is already created, update data
		if (handsontable) {
			handsontable.loadData(data);
		}
	}

	/**
	 * Retrieve ISP list from the API
	 */
	async function listIsp() {
		loading = true;
		try {
			await getIsps();
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	/**
	 * Debounced search
	 */
	const _debounce = {
		methods: {
			handleInput: debounce(async function (event: Event) {
				listIsp();
			}, 300)
		}
	};

	/**
	 * Renderer for the "Akcije" column
	 */
	function actionRenderer(instance, td, row, col, prop, value, cellProperties) {
		if (!Handsontable) return; // safety check

		let stringifiedValue = Handsontable.helper.stringify(value);
		let viewBtn = document.createElement('a');
		viewBtn.href = 'javascript:void(0)';
		viewBtn.textContent = 'Pregled';

		// Remove existing events, then add new event
		Handsontable.dom.removeEvent(viewBtn, 'mousedown', () => goto(`/isps/${stringifiedValue}`));
		Handsontable.dom.addEvent(viewBtn, 'mousedown', (e: any) => goto(`/isps/${stringifiedValue}`));

		let containerDiv = document.createElement('div');
		containerDiv.appendChild(viewBtn);
		Handsontable.dom.addEvent(containerDiv, 'mousedown', (e: any) => e.preventDefault());

		Handsontable.dom.empty(td);
		td.appendChild(containerDiv);
	}

	/**
	 * Create the table after we have imported Handsontable and have data
	 */
	function createTable() {
		if (!Handsontable || !container || tableMounted) return;

		handsontable = new Handsontable(container, {
			data,
			rowHeaders: true,
			colHeaders,
			filters: true,
			dropdownMenu: true,
			manualColumnResize: true,
			manualRowResize: true,
			contextMenu: true,
			columnSorting: true,

			columns: [
				// define columns with a custom renderer for 'Akcije'
				...Object.keys(data[0] ?? {}).map((key) => {
					if (key === 'Akcije') {
						return { data: 'Akcije', renderer: actionRenderer };
					}
					return { data: key, renderer: 'html' };
				})
			],

			// Called after each change
			afterChange(changes, source) {
				if (!changes || source === 'loadData') {
					return;
				}
				for (const change of changes) {
					let [index, column, prevVal, newVal] = change ?? [];
					let item = {
						...(data[index]?.data ?? data[index]),
						[column]: newVal
					};

					// If row has an `id`, we update
					if (item?.id) {
						updateIsp(item).then(() => listIsp());
					} else {
						// If no `id`, create new
						createIsp(item).then(() => listIsp());
					}
				}
			},

			// Called before removing rows
			beforeRemoveRow(index: number, amount: number, physicalRows: number[]) {
				const promptVal = confirm(`Izbrisati ${amount} ${amount === 1 ? 'stupac' : 'stupca'}?`);
				if (!promptVal) return;

				for (const row of physicalRows) {
					let item = data[row];
					if (item?.id) {
						deleteIsp(item.id).then(() => {
							if (row + 1 === amount) {
								listIsp();
							}
						});
					}
				}
			},

			licenseKey: 'non-commercial-and-evaluation'
		});

		tableMounted = true;
	}

	/**
	 * onMount runs only in the browser, so it’s safe to import
	 * the `handsontable` module here.
	 */
	onMount(async () => {
		// fetch data from API
		await listIsp();

		// get the container element
		let element = document.getElementById('isps');
		if (element) {
			container = element;
		}

		// Dynamically import handsontable in the browser
		const module = await import('handsontable');
		Handsontable = module.default;

		// Set up data + create table if we have any
		await setTableData();
		createTable();
	});
</script>

<div>
	<h3>ISP <a class="btn btn-secondary btn-sm" href="/isps/new">Novi Isp</a></h3>

	<!-- Search Field -->
	{#if data?.length > 0}
		<form class="d-flex search-form" on:submit|preventDefault={listIsp}>
			<input
				class="form-control me-2"
				type="search"
				placeholder="Pretraži"
				aria-label="Search"
				on:input={_debounce.methods.handleInput}
				bind:value={search}
			/>
		</form>

		<!-- Spinner -->
		<Spinner {loading} />

		<!-- Table container -->
		<div class="company-table-container">
			<div id="isps" />
		</div>
	{:else}
		<h3 class="mt-5 text-center">Nema Podataka</h3>
	{/if}
</div>

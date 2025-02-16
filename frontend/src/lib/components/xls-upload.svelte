<script lang="ts">
	import config from '$lib/config';
	import { authorization } from '$lib/services';

	export let callback: () => any;
	let files: FileList | null = null;

	async function upload() {
		if (!files || files.length === 0) {
			console.error('No file selected');
			return;
		}

		const formData = new FormData();
		formData.append('file', files[0]);

		try {
			const response = await fetch(`${config.url}/customer/xls`, {
				headers: {
					Authorization: authorization()
				},
				method: 'POST',
				body: formData
			});
			const result = await response.json();
			console.log('Success:', result);
			callback();
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div>
	<label for="fileUpload">Unos korisnika preko xls datoteke</label>
	<input id="fileUpload" name="file" type="file" bind:files />

	{#if files && files.length > 0}
		<button class="btn btn-secondary btn-sm" on:click={upload}>Upload</button>
	{:else}
		<button class="btn btn-secondary btn-sm" on:click={upload} disabled>Upload</button>
	{/if}

	<slot />
</div>

{#if files && files.length > 0}
	<p>{files[0].name}</p>
{/if}

<script lang="ts">
  import config from "$lib/config";

  export let callback: () => any;
  let files: { name: any; }[];
  let dataFile: null = null;
  let value;

  function upload() {
    const formData = new FormData();
    formData.append("file", files[0]);
    const upload = fetch(`${config.url}/customer/xls`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        callback();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
</script>

<div>
  <label for="xls">Unos korisnika preko xls datoteke</label>
  <input id="fileUpload" name="xls" type="file" bind:files />
  
  {#if files}
    <button class="btn btn-secondary btn-sm" on:click={upload}>Upload</button>
  {:else}
    <button class="btn btn-secondary btn-sm" on:click={upload} disabled
      >Upload</button
    >
  {/if}

  <slot />
</div>

{#if dataFile && files[0]}
  <p>
    {files[0].name}
  </p>
{/if}

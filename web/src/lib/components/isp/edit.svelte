<script lang="ts">
  import config from "$lib/config";
  import Form from "./form.svelte";

  export let params;
  let isp: any;

  fetch(`${config.url}/isp/${params?.id}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    isp = await res.json();
  });

  function submit() {
    fetch(`${config.url}/isp/${params?.id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isp),
    }).then(async (res) => {
      isp = await res.json();
    });
  }
</script>

<div class="mb-5">
  <h4>Ažuriraj ISP</h4>
  {#if isp}
    <Form bind:isp {submit} />
  {/if}
</div>

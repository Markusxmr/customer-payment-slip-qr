<script lang="ts">
  import config from "$lib/config";
  import Form from "./form.svelte";

  export let params: any;
  let user: any;

  fetch(`${config.url}/user/${params.id}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    user = await res.json();
  });

  function submit() {
    fetch(`${config.url}/user/${params.id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      user = await res.json();
    });
  }
</script>

<div class="mb-5">
  <h4>Ažuriraj Korisnika</h4>
  {#if user}
    <Form bind:user {submit} />
  {/if}
</div>
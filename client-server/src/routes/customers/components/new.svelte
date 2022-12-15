<script lang="ts">
  import Form from "./form.svelte";
  import { user } from "$lib/model/model";

  export let submit: any;
</script>

<div class="mb-5">
  <h4 class="text-center">Novi Korisnik</h4>

  <Form {user} {submit} />
</div>

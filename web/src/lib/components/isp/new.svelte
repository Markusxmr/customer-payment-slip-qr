<script lang="ts">
  import Form from "./form.svelte";
  import { isp } from "../../model/model";
  import { createIsp } from "$lib/services";
</script>

<div class="mb-5">
  <h4 class="text-center">Novi ISP</h4>

  <Form {isp} submit={createIsp} />
</div>

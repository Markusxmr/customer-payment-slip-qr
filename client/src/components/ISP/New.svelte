<script lang="ts">
  import Form from "./Form.svelte";
  import { isp } from "../../model";
  import { createIsp } from "src/services/http";
</script>

<h4>Novi ISP</h4>
<Form {isp} submit={createIsp} />
<br />

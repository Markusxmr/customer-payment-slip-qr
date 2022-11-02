<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
	import { store } from "$lib/store";
  import "bootstrap/scss/bootstrap.scss";
  import "handsontable/dist/handsontable.full.css";
  import "../css/index.scss";

</script>

<div class="container-fluid">
  {#if $store?.user}
      <div class="noprint" style="margin-bottom: 89px">
          <Navbar />
      </div>
  {/if}

  <div>
    <slot />
  </div>
</div>

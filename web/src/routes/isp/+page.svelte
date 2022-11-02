<script lang="ts">
	import { onMount } from "svelte";

  let ISPS: any;

  onMount(async () => {
    ISPS = (await import("$lib/components/isp/isps.svelte")).default;
  })
</script>

{#if ISPS}
  <div>
      <ISPS />
  </div>
{/if}

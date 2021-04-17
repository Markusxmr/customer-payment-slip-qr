<script lang="ts">
  export let loading = false;
  export let inline = false;
</script>

{#if loading}
  {#if inline}
    <span class="spinner-border" role="status">
      <span class="sr-only" />
    </span>
  {:else}
    <div class="text-center mt-5">
      <div class="spinner-border" role="status">
        <span class="sr-only" />
      </div>
    </div>
  {/if}
{/if}

<script lang="ts">
  export let model;
  export let props;
</script>

<div>
  <select bind:value={model} class={props.className} id={props.id}>
    {props.children}
  </select>
  {props.buttons}
</div>

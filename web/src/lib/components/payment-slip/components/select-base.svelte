<script lang="ts">
  export let model: string;
  export let props: any;
</script>

<div>
  <select bind:value={model} class={props.className} id={props.id}>
    {props.children}
  </select>
  {props.buttons}
</div>

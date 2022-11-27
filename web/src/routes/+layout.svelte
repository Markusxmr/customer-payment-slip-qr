<script lang="ts">
  import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
  import Navbar from "$lib/components/navbar.svelte";
  import { store } from "$lib/store";
  import "bootstrap/dist/css/bootstrap.css";
  import "handsontable/dist/handsontable.full.css";
  import { onMount } from "svelte";
  import "../css/index.scss";

  afterNavigate(({from, to}) => {
    if (!$store?.user && to?.route.id !== "/signin") {
      goto("/signin")
    }
  })

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

  <footer class="py-5">
    <div class="">
      <p class="text-center">© {new Date().getFullYear()} Built by Marko Rendulić</p>
      <ul class="list-unstyled d-flex">
        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
      </ul>
    </div>
  </footer>

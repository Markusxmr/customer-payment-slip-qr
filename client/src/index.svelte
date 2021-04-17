<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import routes from "./routes";
  import { store } from "./store";

  let user;
  let logbox = "";
  store.subscribe((state) => {
    user = state.user;
  });

  function conditionsFailed(event) {
    console.error("Caught event conditionsFailed", event.detail);
    logbox += "conditionsFailed - " + JSON.stringify(event.detail) + "\n";
    // Replace the route
    push("#/signin");
  }
  function routeLoaded(event) {
    console.info("Caught event routeLoaded", event.detail);
    logbox += "routeLoaded - " + JSON.stringify(event.detail) + "\n";
  }
  function routeEvent(event) {
    console.info("Caught event routeEvent", event.detail);
    logbox += "routeEvent - " + JSON.stringify(event.detail) + "\n";
  }
</script>

{#if user}
  <div class="noprint" style="margin-bottom: 89px">
    <Navbar />
  </div>
{/if}
<div>
  <Router
    {routes}
    on:conditionsFailed={conditionsFailed}
    on:routeLoaded={routeLoaded}
    on:routeEvent={routeEvent}
  />
</div>

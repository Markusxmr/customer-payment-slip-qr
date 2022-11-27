<script lang="ts">
  import { store } from "$lib/store";

  function signout() {
    localStorage.removeItem("user");
    store.update((state) => ({ ...state, user: null }));
  }
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="/">Početna</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href="/isps">ISP</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href="/customers">Korisnici</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href="/payment-slips">Uplatnice</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            on:click={signout}
            href="/signin">Odjava</a
          >
        </li>
      </ul>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Pretraži"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Pretraži</button>
      </form>
    </div>
  </div>
</nav>

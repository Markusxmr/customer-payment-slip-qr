<script lang="ts">
  import active from "svelte-spa-router/active";
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
      <a class="navbar-brand" href="#">App</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a
            class="nav-link"
            use:active={{
              path: "/#/isp/*",
              className: "active",
              inactiveClassName: "inactive",
            }}
            aria-current="page"
            href="/#/isp">ISP</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            use:active={{
              path: "/#/korisnik/*",
              className: "active",
              inactiveClassName: "inactive",
            }}
            aria-current="page"
            href="/#/korisnik">Korisnici</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            use:active={{
              path: "/#/uplatnica/*",
              className: "active",
              inactiveClassName: "inactive",
            }}
            aria-current="page"
            href="/#/uplatnica">Uplatnice</a
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

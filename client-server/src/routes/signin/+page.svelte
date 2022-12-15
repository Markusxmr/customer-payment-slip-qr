<script lang="ts">
  import { store } from "$lib/store";
  import { login } from "$lib/services";
	import { goto } from "$app/navigation";

  let user = {
    username: "",
    password: "",
  };
  let error: null = null;

  store.update((state) => ({ ...state, user: null }));

  function submit() {
    login(user).then((res) => {
      if (res?.statusCode === 401 || res?.statusCode === 404 || res?.statusCode === 500) {
        console.error(res);
        error = res.message;
      } else {
        error = null;
        localStorage.setItem("user", JSON.stringify(res));
        store.update((state) => ({ ...state, user: res }));
        goto("/customers");
      }
    });
  }
</script>

<div class="text-center container mt-4">
  <main class="form-signin">
    <form on:submit|preventDefault={submit}>
      <img class="mb-4" src="/img/logo.png" alt="" width="72" height="57" />
      <h1 class="h3 mb-3 fw-normal">Prijava</h1>

      <div class="form-floating">
        <input
          type="username"
          class="form-control"
          id="floatingInput"
          placeholder="Korisničko ime"
          bind:value={user.username}
        />
        <label for="floatingInput">Korisničko ime</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Zaporka"
          bind:value={user.password}
        />
        <label for="floatingPassword">Zaporka</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Zapamti me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Prijava</button
      >
      {#if error}
        <p class="mt-4 mb-2">
          <span class="mt-4" style="color: red"><strong>{error}</strong></span>
        </p>
      {/if}
      <p class="mt-5 mb-3 text-muted">© 2022</p>
    </form>
  </main>
</div>

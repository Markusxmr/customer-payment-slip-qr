<script lang="ts">
	import { clearEmpties } from "$lib/utils";

  export let user: any;
  export let submit: (params: any) => any;
</script>

<form action="/users" on:submit|preventDefault={() => {
  user = clearEmpties(user);
  
  submit(user)()
}}>
  <div class="row">
    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_šifra">Šifra</label>
      <input
        class="form-control"
        id="user_šifra"
        name="user[šifra]"
        type="number"
        bind:value={user["šifra"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_naziv">Naziv</label>
      <input
        class="form-control"
        id="user_naziv"
        name="user[naziv]"
        type="text"
        bind:value={user["naziv"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_adresa">Adresa</label>
      <input
        class="form-control"
        id="user_adresa"
        name="user[adresa]"
        type="text"
        bind:value={user["adresa"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_država">Država</label>
      <input
        class="form-control"
        id="user_država"
        name="user[država]"
        type="text"
        bind:value={user["država"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_pošta">Pošta</label>
      <input
        class="form-control"
        id="user_pošta"
        name="user[pošta]"
        type="number"
        bind:value={user["pošta"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_mjesto">Mjesto</label>
      <input
        class="form-control"
        id="user_mjesto"
        name="user[mjesto]"
        type="text"
        bind:value={user["mjesto"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_porezni_obveznik">Porezni obveznik</label>
      <input
        class="form-control"
        id="user_porezni_obveznik"
        name="user[porezni_obveznik]"
        type="text"
        bind:value={user["porezni_obveznik"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_oib">Oib</label>
      <input
        class="form-control"
        id="user_oib"
        name="user[oib]"
        type="number"
        bind:value={user["oib"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_matični_broj">Matični broj</label>
      <input
        class="form-control"
        id="user_matični_broj"
        name="user[matični_broj]"
        type="number"
        bind:value={user["matični_broj"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_šifra_djelatnosti">Šifra djelatnosti</label>
      <input
        class="form-control"
        id="user_šifra_djelatnosti"
        name="user[šifra_djelatnosti]"
        type="text"
        bind:value={user["šifra_djelatnosti"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_identifikacijski_broj">Identifikacijski broj</label>
      <input
        class="form-control"
        id="user_identifikacijski_broj"
        name="user[identifikacijski_broj]"
        type="number"
        bind:value={user["identifikacijski_broj"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_novčana_jedinica">Novčana jedinica</label>
      <input
        class="form-control"
        id="user_novčana_jedinica"
        name="user[novčana_jedinica]"
        type="text"
        bind:value={user["novčana_jedinica"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_dani_za_dospijeće">Dani za dospijeće</label>
      <input
        class="form-control"
        id="user_dani_za_dospijeće"
        name="user[dani_za_dospijeće]"
        type="text"
        bind:value={user["dani_za_dospijeće"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_postotak_rabata">Postotak rabata</label>
      <input
        class="form-control"
        id="user_postotak_rabata"
        name="user[postotak_rabata]"
        type="text"
        bind:value={user["postotak_rabata"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_internet_stranica">Internet stranica</label>
      <input
        class="form-control"
        id="user_internet_stranica"
        name="user[internet_stranica]"
        type="text"
        bind:value={user["internet_stranica"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_transakcijski_račun">Transakcijski račun</label>
      <input
        class="form-control"
        id="user_transakcijski_račun"
        name="user[transakcijski_račun]"
        type="text"
        bind:value={user["transakcijski_račun"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_ime_prezime_kontakta">Ime prezime kontakta</label>
      <input
        class="form-control"
        id="user_ime_prezime_kontakta"
        name="user[ime_prezime_kontakta]"
        type="text"
        bind:value={user["ime_prezime_kontakta"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_telefon">Telefon</label>
      <input
        class="form-control"
        id="user_telefon"
        name="user[telefon]"
        type="text"
        bind:value={user["telefon"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_elektronska_pošta">Elektronska pošta</label>
      <input
        class="form-control"
        id="user_elektronska_pošta"
        name="user[elektronska_pošta]"
        type="text"
        bind:value={user["elektronska_pošta"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_naziv_za_slanje">Naziv za slanje</label>
      <input
        class="form-control"
        id="user_naziv_za_slanje"
        name="user[naziv_za_slanje]"
        type="text"
        bind:value={user["naziv_za_slanje"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_adresa_za_slanje">Adresa za slanje</label>
      <input
        class="form-control"
        id="user_adresa_za_slanje"
        name="user[adresa_za_slanje]"
        type="text"
        bind:value={user["adresa_za_slanje"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_država_za_slanje">Država za slanje</label>
      <input
        class="form-control"
        id="user_država_za_slanje"
        name="user[država_za_slanje]"
        type="text"
        bind:value={user["država_za_slanje"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_pošta_za_slanje">Pošta za slanje</label>
      <input
        class="form-control"
        id="user_pošta_za_slanje"
        name="user[pošta_za_slanje]"
        type="text"
        bind:value={user["pošta_za_slanje"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_mjesto_pošte_za_slanje">Mjesto pošte za slanje</label>
      <input
        class="form-control"
        id="user_mjesto_pošte_za_slanje"
        name="user[mjesto_pošte_za_slanje]"
        type="text"
        bind:value={user["mjesto_pošte_za_slanje"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_naziv_primatelja">Naziv primatelja</label>
      <input
        class="form-control"
        id="user_naziv_primatelja"
        name="user[naziv_primatelja]"
        type="text"
        bind:value={user["naziv_primatelja"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_adresa_primatelja">Adresa primatelja</label>
      <input
        class="form-control"
        id="user_adresa_primatelja"
        name="user[adresa_primatelja]"
        type="text"
        bind:value={user["adresa_primatelja"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_država_primatelja">Država primatelja</label>
      <input
        class="form-control"
        id="user_država_primatelja"
        name="user[država_primatelja]"
        type="text"
        bind:value={user["država_primatelja"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_pošta_primatelja">Pošta primatelja</label>
      <input
        class="form-control"
        id="user_pošta_primatelja"
        name="user[pošta_primatelja]"
        type="text"
        bind:value={user["pošta_primatelja"]}
      />
    </div>

    <div class="mb-2 col-md-4 col-sm-12">
      <label for="user_mjesto_primatelja">Mjesto primatelja</label>
      <input
        class="form-control"
        id="user_mjesto_primatelja"
        name="user[mjesto_primatelja]"
        type="text"
        bind:value={user["mjesto_primatelja"]}
      />
    </div>
  </div>

  <div>
    <br />
    <span><button class="btn btn-secondary" type="submit">Spremi</button></span>
    <span><a class="btn btn-secondary" href="/customers">Natrag</a></span>
  </div>
</form>

<style>
  label {
    text-align: right;
  }
</style>

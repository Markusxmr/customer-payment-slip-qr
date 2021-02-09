import Home from "./routes/Home.svelte";
import Korisnik from "./routes/Korisnik.svelte";
import UpdateKorisnik from "./components/User/Edit.svelte";
import NoviKorisnik from "./components/User/New.svelte";
import Korisnici from "./routes/Korisnici.svelte";
import NotFound from "./routes/NotFound.svelte";

let routes;
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("routemap")) {
  routes = {
    "/": Korisnici,
    "/korisnik/new": NoviKorisnik,
    "/korisnik/:id/edit": UpdateKorisnik,
    "/korisnik/:id": Korisnik,
    "/logout": Home,
    "*": NotFound,
  };
} else {
  routes = new Map();
  routes.set("/", Korisnici);
  routes.set("/korisnik/new", NoviKorisnik);
  routes.set("/korisnik/:id/edit", UpdateKorisnik);
  routes.set("/korisnik/:id", Korisnik);
  routes.set("*", NotFound);
}

export default routes;

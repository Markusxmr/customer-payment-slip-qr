"use strict";
exports.__esModule = true;
var Home_svelte_1 = require("./routes/Home.svelte");
var Korisnik_svelte_1 = require("./routes/Korisnik.svelte");
var Edit_svelte_1 = require("./components/User/Edit.svelte");
var New_svelte_1 = require("./components/User/New.svelte");
var Korisnici_svelte_1 = require("./routes/Korisnici.svelte");
var NotFound_svelte_1 = require("./routes/NotFound.svelte");
var routes;
var urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("routemap")) {
    routes = {
        "/": Korisnici_svelte_1["default"],
        "/korisnik/new": New_svelte_1["default"],
        "/korisnik/:id/edit": Edit_svelte_1["default"],
        "/korisnik/:id": Korisnik_svelte_1["default"],
        "/logout": Home_svelte_1["default"],
        "*": NotFound_svelte_1["default"]
    };
}
else {
    routes = new Map();
    routes.set("/", Korisnici_svelte_1["default"]);
    routes.set("/korisnik/new", New_svelte_1["default"]);
    routes.set("/korisnik/:id/edit", Edit_svelte_1["default"]);
    routes.set("/korisnik/:id", Korisnik_svelte_1["default"]);
    routes.set("*", NotFound_svelte_1["default"]);
}
exports["default"] = routes;

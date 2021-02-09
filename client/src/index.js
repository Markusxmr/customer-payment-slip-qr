"use strict";
exports.__esModule = true;
var index_svelte_1 = require("./index.svelte");
require("../assets/css/index.scss");
require("bootstrap/js/dist/collapse");
require("bootstrap/js/dist/button");
require("bootstrap/scss/bootstrap.scss");
// import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";
new index_svelte_1["default"]({
    target: document.body
});

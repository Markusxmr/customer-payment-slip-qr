import Home from "./routes/Home.svelte";
import Isps from "./routes/Isps.svelte";
import Isp from "./routes/Isp.svelte";
import Customer from "./routes/Customer.svelte";
import EditISP from "./components/ISP/Edit.svelte";
import NewISP from "./components/ISP/New.svelte";
import EditCustomer from "./components/Customer/Edit.svelte";
import NewCustomer from "./components/Customer/New.svelte";
import Customers from "./routes/Customers.svelte";
import PaymentSlips from "./routes/PaymentSlips.svelte";
import NotFound from "./routes/NotFound.svelte";

let routes;
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("routemap")) {
  routes = {
    "/": Customers,
    "/customer": Customers,
    "/customer/new": NewCustomer,
    "/customer/:id/edit": EditCustomer,
    "/customer/:id": Customer,
    "/isp": Isps,
    "/isp/new": NewISP,
    "/isp/:id/edit": EditISP,
    "/isp/:id": Isp,
    "/uplatnica": PaymentSlips,
    "/logout": Home,
    "*": NotFound,
  };
} else {
  routes = new Map();
  routes.set("/", Customers);
  routes.set("/customer", Customers);
  routes.set("/customer/new", NewCustomer);
  routes.set("/customer/:id/edit", EditCustomer);
  routes.set("/customer/:id", Customer);
  routes.set("/isp", Isps);
  routes.set("/isp/new", NewISP);
  routes.set("/isp/:id/edit", EditISP);
  routes.set("/isp/:id", Isp);
  routes.set("/uplatnica", PaymentSlips);
  routes.set("*", NotFound);
}

export default routes;

import Signin from "./routes/Signin.svelte";
import Home from "./routes/Home.svelte";
import Isps from "./routes/Isps.svelte";
import Isp from "./routes/Isp.svelte";
import CustomerPaymentSlips from "./routes/CustomerPaymentSlips.svelte";
import EditISP from "./components/ISP/Edit.svelte";
import NewISP from "./components/ISP/New.svelte";
import EditCustomer from "./components/Customer/Edit.svelte";
import NewCustomer from "./components/Customer/New.svelte";
import CustomerList from "./routes/CustomerList.svelte";
import PaymentSlips from "./routes/PaymentSlipList.svelte";
import NotFound from "./routes/NotFound.svelte";
import { wrap } from "svelte-spa-router/wrap";
import { get } from "svelte/store";
import { store } from "./store";

const auth = () => {
  const { user } = get(store);
  if (!user) return false;
  return true;
};

const authConditions = {
  conditions: [
    () => {
      return auth();
    },
  ],
};

const routes = {
  "/signin": Signin,
  "/": wrap({
    component: CustomerList,
    ...authConditions,
  }),
  "/customer": wrap({
    component: CustomerList,
    ...authConditions,
  }),
  "/customer/new": wrap({
    component: NewCustomer,
    ...authConditions,
  }),
  "/customer/:id/edit": wrap({
    component: EditCustomer,
    ...authConditions,
  }),
  "/customer/:id": wrap({
    component: CustomerPaymentSlips,
    ...authConditions,
  }),
  "/isp": wrap({
    component: Isps,
    ...authConditions,
  }),
  "/isp/new": wrap({
    component: NewISP,
    ...authConditions,
  }),
  "/isp/:id/edit": wrap({
    component: EditISP,
    ...authConditions,
  }),
  "/isp/:id": wrap({
    component: Isp,
    ...authConditions,
  }),
  "/uplatnica": wrap({
    component: PaymentSlips,
    ...authConditions,
  }),
  "/logout": wrap({
    component: Home,
    ...authConditions,
  }),
  "*": NotFound,
};

export default routes;

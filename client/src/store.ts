import { writable } from "svelte/store";

export const store = writable({
  user: localStorage.getItem("user"),
  signin: false,
  customer: null,
  customers: [],
  isps: [],
  paymentSlips: [],
});

import { writable } from "svelte/store";

export const store = writable({
  customer: null,
  customers: [],
  isps: [],
  paymentSlips: [],
});

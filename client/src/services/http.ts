import { store } from "../store";
import config from "../config";

export async function createIsp(params) {
  return fetch(`${config.url}/isp`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    let item = await res.json();
    return item;
  });
}

export async function updateIsp(item) {
  return fetch(`${config.url}/isp/${item.id}`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(async (res) => {
    let item = await res.json();

    return item;
  });
}

export async function getIsps(search = "") {
  return fetch(
    `${config.url}/isp?naziv=${search}&adresa=${search}&mjesta=${search}`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    let item = await res.json();
    store.update((state) => ({ ...state, isps: item }));
    return item;
  });
}

export async function deleteIsp(id) {
  const promptVal = confirm("Izbrisati?");

  if (!promptVal) return;

  return fetch(`${config.url}/isp/${id}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    let item = await res.json();

    return item;
  });
}

export async function getCustomer(params) {
  return fetch(`${config.url}/customer/${params.id}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    let item = await res.json();
    store.update((state) => ({
      ...state,
      customer: item,
      paymentSlips: item?.paymentSlips,
    }));
    return item;
  });
}

export async function createCustomer(params) {
  return fetch(`${config.url}/customer`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    let item = await res.json();
    return item;
  });
}

export async function getPaymentSlips() {
  return fetch(`${config.url}/payment-slip`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    let item = await res.json();
    store.update((state) => ({ ...state, paymentSlips: item }));
    return item;
  });
}

export async function newPaymentSlip(params) {
  return fetch(`${config.url}/payment-slip`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(params),
  }).then(async (res) => {
    let item = await res.json();
    return item;
  });
}

export async function updatePaymentSlip(item) {
  return fetch(`${config.url}/payment-slip/${item.id}`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(async (res) => {
    let item = await res.json();

    return item;
  });
}

import { store } from "../store";
import config from "../config";
import { push } from "svelte-spa-router";

export function authorization() {
  let user: any = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  return `Bearer ${user?.token ?? ""}`;
}

export function unauthorized(res) {
  if (res.status === 401) {
    store.update((state) => ({ ...state, user: null }));
    push("#/signin");
  }
}

export function unauthorizedError(err) {
  if (err.statusCode === 401) {
    store.update((state) => ({ ...state, user: null }));
    push("#/signin");
    throw err;
  }
}

export async function login(params) {
  return fetch(`${config.url}/auth`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(params),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function createIsp(params) {
  return fetch(`${config.url}/isp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
    body: JSON.stringify(params),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function updateIsp(item) {
  return fetch(`${config.url}/isp/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
    body: JSON.stringify(item),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function getIsp(id) {
  fetch(`${config.url}/isp/${id}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function getIsps(search = "") {
  return fetch(
    `${config.url}/isp?naziv=${search}&adresa=${search}&mjesta=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: authorization(),
      },
    }
  )
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      store.update((state) => ({ ...state, isps: item }));
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function deleteIsp(id) {
  return fetch(`${config.url}/isp/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function getCustomer(params) {
  return fetch(`${config.url}/customer/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      store.update((state) => ({
        ...state,
        customer: item,
        paymentSlips: item?.paymentSlips,
      }));
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function createCustomer(params) {
  return fetch(`${config.url}/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
    body: JSON.stringify(params),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function getPaymentSlips() {
  return fetch(`${config.url}/payment-slip`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      store.update((state) => ({ ...state, paymentSlips: item }));
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function newPaymentSlip(params) {
  return fetch(`${config.url}/payment-slip`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
    method: "POST",
    body: JSON.stringify(params),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function updatePaymentSlip(item) {
  return fetch(`${config.url}/payment-slip/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
    body: JSON.stringify(item),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function deletePaymentSlip(id) {
  return fetch(`${config.url}/payment-slip/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function getGlobalSetting(id) {
  return fetch(`${config.url}/global-setting/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

export async function updateGlobalSetting(id, params) {
  return fetch(`${config.url}/global-setting/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: authorization(),
    },
    body: JSON.stringify(params),
  })
    .then(async (res) => {
      unauthorized(res);
      let item = await res.json();
      return item;
    })
    .catch((err) => {
      unauthorizedError(err);
    });
}

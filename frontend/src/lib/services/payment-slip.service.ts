import config from "$lib/config";
import { store } from "$lib/store";
import { authorization, unauthorized, unauthorizedError } from "./auth.service";

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
            const item = await res.json();
            store.update((state) => ({ ...state, paymentSlips: item }));
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}

export async function newPaymentSlip(params: any) {
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
            const item = await res.json();
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}

export async function updatePaymentSlip(item: { id: any; }) {
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
            const item = await res.json();
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}

export async function deletePaymentSlip(id: any) {
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
            const item = await res.json();
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}
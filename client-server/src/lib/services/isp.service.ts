import config from "$lib/config";
import { store } from "$lib/store";
import { authorization, unauthorized, unauthorizedError } from "./auth.service";

export async function createIsp(params: any) {
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
            const item = await res.json();
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}

export async function updateIsp(item: { id: any; }) {
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
            const item = await res.json();
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}

export async function getIsp(id: any) {
    return fetch(`${config.url}/isp/${id}`, {
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
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
            const item = await res.json();
            store.update((state) => ({ ...state, isps: item }));
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}

export async function deleteIsp(id: any) {
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
            const item = await res.json();
            return item;
        })
        .catch((err) => {
            unauthorizedError(err);
        });
}
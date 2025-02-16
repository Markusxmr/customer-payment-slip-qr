import { browser } from '$app/environment';
import config from '$lib/config';
import { store } from '$lib/store';
import { authorization, unauthorized, unauthorizedError } from './auth.service';

export async function getCustomer(params: Record<string, string> | null) {
	return fetch(`${config.url}/customer/${params?.id}`, {
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			authorization: authorization()
		}
	})
		.then(async (res) => {
			unauthorized(res);
			const item = await res.json();
			if (browser) {
				store.update((state) => ({
					...state,
					customer: item,
					paymentSlips: item?.paymentSlips
				}));
			}
			return item;
		})
		.catch((err) => {
			unauthorizedError(err);
		});
}

export async function createCustomer(params: unknown) {
	return fetch(`${config.url}/customer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			authorization: authorization()
		},
		body: JSON.stringify(params)
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

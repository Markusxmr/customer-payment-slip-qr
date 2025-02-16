import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import config from '$lib/config';
import { store } from '$lib/store';

export function authorization() {
	if (!browser) return '';

	let user: any = localStorage.getItem('user');
	if (user) user = JSON.parse(user);
	return `Bearer ${user?.token ?? ''}`;
}

export function unauthorized(res: Response) {
	if (res.status === 401) {
		store.update((state) => ({ ...state, user: null }));
		goto('/signin');
	}
}

export function unauthorizedError(err: { statusCode: number }) {
	if (err.statusCode === 401) {
		store.update((state) => ({ ...state, user: null }));
		goto('/signin');
		throw err;
	}
}

export async function login(params: any) {
	return fetch(`${config.url}/auth`, {
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
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

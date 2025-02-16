import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const store = writable({
	user: browser ? localStorage.getItem('user') : null,
	signin: false,
	customer: null,
	customers: [] as any[],
	isps: [],
	paymentSlips: []
});

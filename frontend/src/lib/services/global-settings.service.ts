import config from '../config';
import { authorization, unauthorized, unauthorizedError } from './auth.service';

export async function getGlobalSetting(id: any) {
	return fetch(`${config.url}/global-setting/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			authorization: authorization()
		}
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

export async function updateGlobalSetting(id: any, params: any) {
	return fetch(`${config.url}/global-setting/${id}`, {
		method: 'PUT',
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

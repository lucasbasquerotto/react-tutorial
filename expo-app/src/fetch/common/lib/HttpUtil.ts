/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export interface HttpRequestParams {
	headers?: { [key: string]: string };
	timeout?: number;
}

export interface HttpResponse<T> {
	status: number;
	data: T;
}

const rawGet = async <T>(url: string, params?: HttpRequestParams) =>
	axios.get<T>(url, params);
const rawDel = async <T>(url: string, params?: HttpRequestParams) =>
	axios.delete<T>(url, params);
const rawHead = async <T>(url: string, params?: HttpRequestParams) =>
	axios.head<T>(url, params);
const rawOptions = async <T>(url: string, params?: HttpRequestParams) =>
	axios.options<T>(url, params);
const rawPost = async <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.post(url, { data, ...params });
const rawPut = async <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.put(url, { data, ...params });
const rawPatch = async <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.patch(url, { data, ...params });

const wrap = <T extends unknown[], K>(
	fn: (...args: T) => Promise<AxiosResponse<K>>,
) => async (...args: T) =>
	fn(...args)
		.catch((error) => {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);

			throw error;
		})
		.then((response) => {
			if (!response) {
				return null;
			}

			const { status, data } = response;
			const resp: HttpResponse<K> = { status, data };
			return resp;
		});

const del = wrap(rawDel);
const get = wrap(rawGet);
const head = wrap(rawHead);
const options = wrap(rawOptions);
const patch = wrap(rawPatch);
const post = wrap(rawPost);
const put = wrap(rawPut);

const HttpUtil = { del, get, head, options, patch, post, put };

export default HttpUtil;

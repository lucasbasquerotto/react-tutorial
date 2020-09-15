import axios, { AxiosResponse } from 'axios';

export interface HttpRequestParams {
	headers?: { [key: string]: string };
	timeout?: number;
}

export interface HttpResponse<T> {
	status: number;
	data: T;
}

const rawGet = <T>(url: string, params?: HttpRequestParams) =>
	axios.get<T>(url, params);
const rawDel = <T>(url: string, params?: HttpRequestParams) =>
	axios.delete<T>(url, params);
const rawHead = <T>(url: string, params?: HttpRequestParams) =>
	axios.head<T>(url, params);
const rawOptions = <T>(url: string, params?: HttpRequestParams) =>
	axios.options<T>(url, params);
const rawPost = <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.post(url, { data, ...params });
const rawPut = <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.put(url, { data, ...params });
const rawPatch = <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.patch(url, { data, ...params });

// type Arr = readonly unknown[];

// const wrap = <T extends Arr, K>(
// 	fn: (...args: [...T]) => Promise<AxiosResponse<K>>
// ) => (...args: [...T]) =>
// 	fn(...args)
// 		.catch(function (error) {
// 			if (error.response) {
// 				// The request was made and the server responded with a status code
// 				// that falls out of the range of 2xx
// 				console.log(error.response.data);
// 				console.log(error.response.status);
// 				console.log(error.response.headers);
// 			} else if (error.request) {
// 				// The request was made but no response was received
// 				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
// 				// http.ClientRequest in node.js
// 				console.log(error.request);
// 			} else {
// 				// Something happened in setting up the request that triggered an Error
// 				console.log('Error', error.message);
// 			}
// 			console.log(error.config);

// 			return error.response;
// 		})
// 		.then((response) => {
// 			if (!response) {
// 				return null;
// 			}

// 			const { status, data } = response;
// 			const resp: HttpResponse<K> = { status, data };
// 			return resp;
// 		});

// const del = wrap(rawDel);
// const get = wrap(rawGet);
// const head = wrap(rawHead);
// const options = wrap(rawOptions);
// const patch = wrap(rawPatch);
// const post = wrap(rawPost);
// const put = wrap(rawPut);

const wrap = <T extends Array<unknown>, K>(
	fn: (...args: T) => Promise<AxiosResponse<K>>
) => (...args: T) =>
	fn(...args)
		.catch(function (error) {
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

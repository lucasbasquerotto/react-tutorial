import axios, { AxiosResponse } from 'axios';

export interface HttpRequestParams {
	headers: { [key: string]: string };
    timeout?: number;
}

export interface HttpResponse<T> {
	status: number;
    data: T;
}

const get = (url: string, params?: HttpRequestParams) => axios.get(url, params);
const del = (url: string, params?: HttpRequestParams) =>
	axios.delete(url, params);
const head = (url: string, params?: HttpRequestParams) =>
	axios.head(url, params);
const options = (url: string, params?: HttpRequestParams) =>
	axios.options(url, params);
const post = <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.post(url, { data, ...params });
const put = <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.put(url, { data, ...params });
const patch = <T>(url: string, data?: T, params?: HttpRequestParams) =>
	axios.patch(url, { data, ...params });

type Arr = readonly unknown[];

const wrap = <T extends Arr, K>(fn: (...args: [...T]) => Promise<AxiosResponse<K>>) => (...args: [...T]) =>
    fn(...args).catch(function (error) {
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

        return error.response;
  }).then(response => {
      if (!response) {
          return null;
      }

      const { status, data }: HttpResponse<K> = response;
      return { status, data };
  });

const wrappedDel = wrap(del);
const wrappedGet = wrap(get);
const wrappedHead = wrap(head);
const wrappedOptions = wrap(options);
const wrappedPatch = wrap(patch);
const wrappedPost = wrap(post);
const wrappedPut = wrap(put);

export {
    del: wrappedDel,
    get: wrappedGet,
    head: wrappedHead,
    options: wrappedOptions,
    patch: wrappedPatch,
    post: wrappedPost,
    put: wrappedPut,
};

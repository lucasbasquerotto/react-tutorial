import type { DataInfo } from '../../common/lib/DataInfo';
import { useDefaultDataApi } from '../../common/lib/useDataApi';
import type { HttpResponse } from '../../common/lib/HttpUtil';
import HttpUtil from '../../common/lib/HttpUtil';
import { useCallback } from 'react';

interface AlgoliaHits {
	objectID: string;
	url: string;
	title: string;
}

interface QueryData {
	hits: AlgoliaHits[];
}

function getUrl(query: string) {
	return `https://hn.algolia.com/api/v1/search?query=${query}`;
}

const makeCall = async (url: string) =>
	(
		await HttpUtil.get<QueryData>(url).then((r) => {
			return new Promise<HttpResponse<QueryData> | null>((fn) =>
				setTimeout(() => fn(r), 1000),
			);
		})
	)?.data;

const useFetchAlgolia = (initialQuery: string) => {
	const [dataInfo, doFetch] = useDefaultDataApi(
		makeCall,
		getUrl(initialQuery),
		{ hits: [] },
	);

	const _doFetch = useCallback((query: string) => doFetch(getUrl(query)), [
		doFetch,
	]);

	const result: [
		DataInfo<QueryData | undefined, unknown>,
		(state: string) => unknown,
	] = [dataInfo, _doFetch];

	return result;
};

export { useFetchAlgolia };

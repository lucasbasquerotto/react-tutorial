import { DataInfo } from '../../common/lib/DataInfo';
import { useDefaultDataApi } from '../../common/lib/useDataApi';
import HttpUtil, { HttpResponse } from '../../common/lib/HttpUtil';

interface AlgoliaHits {
	objectID: string;
	url: string;
	title: string;
}

interface QueryData {
	hits: Array<AlgoliaHits>;
}

function getUrl(query: string) {
	return `https://hn.algolia.com/api/v1/search?query=${query}`;
}

const useFetchAlgolia = (initialQuery: string) => {
	const [dataInfo, doFetch] = useDefaultDataApi(
		async (url: string) =>
			(
				await HttpUtil.get<QueryData>(url).then((r) => {
					return new Promise<HttpResponse<QueryData> | null>((fn) =>
						setTimeout(() => fn(r), 3000)
					);
				})
			)?.data,
		getUrl(initialQuery),
		{ hits: [] }
	);

	const _doFetch = (query: string) => doFetch(getUrl(query));

	const result: [
		DataInfo<QueryData | undefined, unknown>,
		(state: string) => unknown
	] = [dataInfo, _doFetch];

	return result;
};

export { useFetchAlgolia };

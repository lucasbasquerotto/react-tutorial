import type { DataInfo } from './DataInfo';

export interface DataApiAction<T, E> {
	type: string;
	payload?: T;
	error?: E;
}

const createDataFetchReducer = <T, E>() => (
	state: DataInfo<T, E>,
	action: DataApiAction<T, E>,
): DataInfo<T, E> => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				isLoading: true,
				isError: false,
				error: undefined,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
				error: undefined,
			};
		case 'FETCH_FAILURE':
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.error,
			};
		default:
			throw new Error();
	}
};

export { createDataFetchReducer };

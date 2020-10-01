import { useEffect, useReducer, useState } from 'react';
import { createDataFetchReducer } from './createDataFetchReducer';
import { DataInfo } from './DataInfo';

function useDataApi<S, T, E>(
	makeCall: (state: S) => Promise<T>,
	convertError: (error: unknown) => E,
	initialState: S,
	initialData: T,
): [DataInfo<T, E>, (state: S) => unknown] {
	const [outerState, setOuterState] = useState(initialState);

	const initialDataContainer: DataInfo<T, E> = {
		isLoading: false,
		isError: false,
		data: initialData,
	};
	const reducer = createDataFetchReducer<T, E>();
	const [state, dispatch] = useReducer(reducer, initialDataContainer);

	useEffect(() => {
		let didCancel = false;

		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' });

			try {
				const payload = await makeCall(outerState);

				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS', payload });
				}
			} catch (e) {
				const error = convertError(e);

				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILURE', error });
				}
			}
		};

		fetchData();

		return () => {
			didCancel = true;
		};
	}, [makeCall, convertError, outerState]);

	return [state, setOuterState];
}

const defaultConvertError = (e: unknown) => e;

const useDefaultDataApi = <S, T>(
	makeCall: (state: S) => Promise<T>,
	initialState: S,
	initialData: T,
) => useDataApi(makeCall, defaultConvertError, initialState, initialData);

export { useDataApi, useDefaultDataApi };

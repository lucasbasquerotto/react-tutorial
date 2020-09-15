import { useCallback, useEffect, useReducer, useState } from 'react';
import { createDataFetchReducer } from './createDataFetchReducer';
import { DataInfo } from './DataInfo';

function useDataApi<S, T, E>(
	makeCall: (state: S) => Promise<T>,
	convertError: (error: unknown) => E,
	initialState: S,
	initialData: T
): [DataInfo<T, E>, (state: S) => unknown] {
	const _makeCall = useCallback(makeCall, []);
	const _convertError = useCallback(convertError || (() => undefined), []);
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
				const payload = await _makeCall(outerState);

				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS', payload });
				}
			} catch (e) {
				const error = _convertError(e);

				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILURE', error });
				}
			}
		};

		fetchData();

		return () => {
			didCancel = true;
		};
	}, [_makeCall, _convertError, outerState]);

	return [state, setOuterState];
}

const useDefaultDataApi = <S, T>(
	makeCall: (state: S) => Promise<T>,
	initialState: S,
	initialData: T
) => useDataApi(makeCall, (e) => e, initialState, initialData);

export { useDataApi, useDefaultDataApi };

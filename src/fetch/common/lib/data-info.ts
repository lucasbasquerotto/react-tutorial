export interface DataInfo<T, E> {
	data?: T;
	error?: E;
	isLoading: boolean;
	isError: boolean;
}

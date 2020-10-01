export type DataInfo<T, E> =
	| {
			data?: T;
			error?: undefined;
			isLoading: boolean;
			isError: false;
	  }
	| {
			data?: T;
			error?: E;
			isLoading: false;
			isError: true;
	  };

import type { FunctionComponent } from 'react';
import React from 'react';

const LoadDataDefault: FunctionComponent<{
	isError: boolean;
	isLoading: boolean;
}> = ({ isError, isLoading, children }) => {
	if (isError) {
		return <div>Something went wrong...</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export { LoadDataDefault };

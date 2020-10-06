import type { FunctionComponent } from 'react';
import React from 'react';
import type { DataInfo } from '../../common/lib/DataInfo';

const LoadDataDefault: FunctionComponent<DataInfo<unknown, unknown>> = ({
	isError,
	isLoading,
	children,
}) => {
	if (isError) {
		return <div>Something went wrong...</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export { LoadDataDefault };

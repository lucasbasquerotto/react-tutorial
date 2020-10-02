import type { FunctionComponent } from 'react';
import React from 'react';
import type { DataInfo } from '../../common/lib/DataInfo';

const LoadDataDefault: FunctionComponent<DataInfo<unknown, unknown>> = ({
	isError,
	isLoading,
	children,
}) => {
	return (
		<>
			{isError ? (
				<div>Something went wrong...</div>
			) : isLoading ? (
				<div>Loading...</div>
			) : (
				children
			)}
		</>
	);
};

export { LoadDataDefault };

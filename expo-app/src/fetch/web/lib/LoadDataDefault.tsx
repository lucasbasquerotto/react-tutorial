import React, { FunctionComponent } from 'react';
import { DataInfo } from '../../common/lib/DataInfo';

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

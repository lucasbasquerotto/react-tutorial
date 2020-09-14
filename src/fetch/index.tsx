import React, { useState } from 'react';
import { useFetchAlgolia } from './web/demo';
import { LoadDataDefault } from './web/lib/load-data';

const initialQuery = 'redux';

function FetchApp() {
	const [query, setQuery] = useState(initialQuery);
	const [{ data, isLoading, isError }, doFetch] = useFetchAlgolia(initialQuery);

	return (
		<>
			<form
				onSubmit={(event) => {
					doFetch(query);
					event.preventDefault();
				}}
			>
				<input
					type='text'
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<button type='submit'>Search</button>
			</form>

			<LoadDataDefault isError={isError} isLoading={isLoading}>
				<ul>
					{data?.hits.map((item) => (
						<li key={item.objectID}>
							<a href={item.url}>{item.title}</a>
						</li>
					))}
				</ul>
			</LoadDataDefault>
		</>
	);
}

export { FetchApp };

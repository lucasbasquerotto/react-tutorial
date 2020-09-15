import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { Counter } from './features/counter/Counter';

export const ReduxApp = () => (
	<Provider store={store}>
		<Counter />
	</Provider>
);

import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { Counter } from './features/counter/Counter';
import logo from './logo.svg';

export function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo as string} className="App-logo" alt="logo" />
				<Counter />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<span>
					<span>Learn </span>
					<a
						className="App-link"
						href="https://reactjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React
					</a>
					<span>, </span>
					<a
						className="App-link"
						href="https://redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux
					</a>
					<span>, </span>
					<a
						className="App-link"
						href="https://redux-toolkit.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux Toolkit
					</a>
					,<span> and </span>
					<a
						className="App-link"
						href="https://react-redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React Redux
					</a>
				</span>
			</header>
		</div>
	);
}

export const ReduxApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

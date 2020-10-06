import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import type { Obj } from '../types';
import { ThemeContext, themes } from './theme-context';
import ThemedButton from './themed-button';

// An intermediate component that uses the ThemedButton
const Toolbar: FunctionComponent<{ changeTheme: () => void }> = ({
	changeTheme,
}) => <ThemedButton onClick={changeTheme}>Change Theme</ThemedButton>;

const Page: FunctionComponent<Obj> = ({ children }) => (
	<div className="page">{children}</div>
);

const Section: FunctionComponent<Obj> = ({ children }) => (
	<div className="section">{children}</div>
);

const ContextApp: FunctionComponent<Obj> = () => {
	const [state, setState] = useState({ theme: themes.light });

	const toggleTheme = () =>
		setState((s) => ({
			theme: s.theme === themes.dark ? themes.light : themes.dark,
		}));

	// The ThemedButton button inside the ThemeProvider
	// uses the theme from state while the one outside uses
	// the default dark theme
	return (
		<Page>
			<ThemeContext.Provider value={state.theme}>
				<Toolbar changeTheme={toggleTheme} />
				<Section>
					<ThemedButton>Themed</ThemedButton>
				</Section>
			</ThemeContext.Provider>
			<Section>
				<ThemedButton>Not Themed</ThemedButton>
			</Section>
		</Page>
	);
};

export default ContextApp;

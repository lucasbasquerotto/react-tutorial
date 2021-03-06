/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
	Card,
	CssBaseline,
	Switch,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import type { Obj } from '../types';
import CustomizedHook from './autocomplete';
import ClassesNesting, { StyledButton } from './override-css';
import { createMyTheme, ThemeColor } from './theme';

const MyTypography: FunctionComponent<Obj> = () => (
	<Typography variant="h1" component="h2">
		h1. Heading
	</Typography>
);

const Hello: FunctionComponent<Obj> = () => (
	<React.Fragment>
		<Button variant="contained" color={ThemeColor.PRIMARY}>
			Hello World
		</Button>
		<Button variant="contained" color={ThemeColor.SECONDARY}>
			Hello World 2
		</Button>
	</React.Fragment>
);

const useMaterialUiAppStyle = () => {
	const cssCard = css`
		margin: 20px;
	`;

	return { cssCard };
};

export function MaterialUiApp() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [darkMode, setDarkMode] = useState<boolean | null>(null);
	const finalDarkMode = darkMode ?? prefersDarkMode;
	const { cssCard } = useMaterialUiAppStyle();

	const theme = React.useMemo(() => createMyTheme(finalDarkMode), [
		finalDarkMode,
	]);

	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Switch
					checked={finalDarkMode}
					onChange={(e) => setDarkMode(e.target.checked)}
				/>
				<Card elevation={4} raised css={cssCard}>
					<MyTypography />
				</Card>
				<Hello />
				<CustomizedHook />
				<ClassesNesting />
				<StyledButton>classes shorthand</StyledButton>
			</ThemeProvider>
		</StylesProvider>
	);
}

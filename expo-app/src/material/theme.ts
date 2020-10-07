import type React from 'react';
import type { PropTypes } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import type { ThemeOptions } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
	export interface Theme {
		status: {
			danger: React.CSSProperties['color'];
		};
	}
	// eslint-disable-next-line no-shadow
	export interface ThemeOptions {
		status?: {
			danger: React.CSSProperties['color'];
		};
	}
}

declare module '@material-ui/core/styles/createPalette' {
	export interface Palette {
		neutral: Palette['primary'];
	}
	export interface PaletteOptions {
		neutral?: PaletteOptions['primary'];
	}
}

export const createMyThemeBase = (options: ThemeOptions) =>
	createMuiTheme({
		...options,
		palette: {
			neutral: {
				main: grey[200],
				light: grey[50],
				dark: grey[900],
			},
			...options.palette,
		},
		status: {
			danger: red[900],
			...options.status,
		},
	});

export const ThemeColor = {
	INHERIT: 'inherit' as PropTypes.Color,
	PRIMARY: 'primary' as PropTypes.Color,
	SECONDARY: 'secondary' as PropTypes.Color,
	DEFAULT: 'default' as PropTypes.Color,
	NEUTRAL: 'neutral' as PropTypes.Color,
};

export const createMyTheme = (dark: boolean) =>
	createMyThemeBase({
		palette: {
			type: dark ? 'dark' : 'light',
			primary: {
				main: dark ? '#eeeeee' : '#616161',
			},
			secondary: {
				main: dark ? '#4caf50' : '#cddc39',
				dark: dark ? '#cddc39' : '#4caf50',
			},
		},
	});

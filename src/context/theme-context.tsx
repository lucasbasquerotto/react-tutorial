import React from 'react';

export interface Theme {
	foreground: string;
	background: string;
}

export const themes: { [key: string]: Theme } = {
	light: {
		foreground: '#000000',
		background: '#eeeeee',
	},
	dark: {
		foreground: '#ffffff',
		background: '#222222',
	},
};

export const ThemeContext = React.createContext(
	themes.dark // default value
);

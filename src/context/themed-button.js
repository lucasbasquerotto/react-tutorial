/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeContext } from './theme-context';

const ThemedButton = (props) => {
	const renderBtn = (theme) => (
		<button {...props} style={{ backgroundColor: theme.background }}>
			{props.children}
		</button>
	);

	return (
		<ThemeContext.Consumer>{(theme) => renderBtn(theme)}</ThemeContext.Consumer>
	);
};

export default ThemedButton;

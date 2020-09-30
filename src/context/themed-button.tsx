import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { Theme, ThemeContext } from './theme-context';

const ThemedButton: FunctionComponent<ButtonHTMLAttributes<
	HTMLButtonElement
>> = (props) => {
	const renderBtn = (theme: Theme) => (
		<button {...props} style={{ backgroundColor: theme.background }}>
			{props.children}
		</button>
	);

	return (
		<ThemeContext.Consumer>{(theme) => renderBtn(theme)}</ThemeContext.Consumer>
	);
};

export default ThemedButton;

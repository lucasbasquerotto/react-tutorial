import type { FunctionComponent } from 'react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import type { Obj } from '../types';

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
	all: {
		padding: '10px',
	},
	myButton: {
		color: 'green',
		margin: {
			// jss-plugin-expand gives more readable syntax
			top: 5, // jss-plugin-default-unit makes this 5px
			right: 0,
			bottom: 0,
			left: '1rem',
		},
		'& span': {
			// jss-plugin-nested applies this to a child span
			fontWeight: 'bold', // jss-plugin-camel-case turns this into 'font-weight'
		},
	},
	myLabel: {
		fontStyle: 'italic; border: 3px solid red',
	},
});

// Define the component using these styles and pass it the 'classes' prop.
// Use this to assign scoped class names.
const Button: FunctionComponent<Obj> = ({ children }) => {
	const styles = useStyles();
	return (
		<button type="button" className={`${styles.all}  ${styles.myButton}`}>
			<span className={`${styles.all}  ${styles.myLabel}`}>{children}</span>
		</button>
	);
};

export const JssApp = () => (
	<Button>
		Submit <u>JSS</u>
	</Button>
);

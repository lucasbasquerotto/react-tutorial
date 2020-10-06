/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { faAddressBook, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMeasure } from 'react-use';

const useMyComponentStyle = (params) => {
	const { color } = params;
	const [ref, { width }] = useMeasure();

	const borderColor = width < 150 ? 'red' : width < 400 ? 'yellow' : 'green';
	const icon = width < 250 ? faCoffee : faAddressBook;

	const style = css`
		color: ${color};
		padding: 10px;
		border: 1px solid ${borderColor};
	`;

	return {
		ref,
		style,
		icon,
		width,
	};
};

export const MyComponent = (props) => {
	const { ref, style, icon, width } = useMyComponentStyle(props);
	const { children } = props;

	return (
		<div ref={ref} css={style}>
			<FontAwesomeIcon icon={icon} />
			{children} [[{parseInt(`${width}`, 10)}px]]
		</div>
	);
};

const containerStyle = css`
	padding: 100px 200px;
	border: 1px solid blue;
`;

export const MyContainer = () => (
	<div css={containerStyle}>
		<MyComponent color="blue">My content...</MyComponent>
	</div>
);

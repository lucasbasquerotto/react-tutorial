/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { faAddressBook, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, RefObject, useEffect, useState } from 'react';
import { useMeasure } from 'react-use';

const LOG = false;
const SANITIZE_CSS = true;

function sanitizeCss(value: number | string) {
	let valueStr = '' + (value ?? '');

	if (valueStr.split('"').length % 2 !== 1) {
		valueStr = valueStr.replace('"', '');
	}

	if (valueStr.split("'").length % 2 !== 1) {
		valueStr = valueStr.replace("'", '');
	}

	const valueToUse = SANITIZE_CSS ? valueStr.split(';')[0] : valueStr;

	return valueToUse;
}

const useInnermostComponentStyle = (params: { color: string }) => {
	const { color } = params;
	const [ref, { width }] = useMeasure();

	const borderColor = width < 150 ? 'red' : width < 400 ? 'yellow' : 'green';
	const icon = width < 250 ? faCoffee : faAddressBook;

	const styles = {
		color: sanitizeCss(color),
		padding: '10px',
		border: sanitizeCss('1px solid ' + borderColor),
	};

	return {
		ref: (ref as unknown) as RefObject<HTMLDivElement>,
		styles,
		icon,
		width,
	};
};

const InnermostComponent: FunctionComponent<{ color: string }> = (props) => {
	const { ref, styles, icon, width } = useInnermostComponentStyle(props);
	LOG && console.log('render innermost');

	return (
		<div ref={(ref as unknown) as RefObject<HTMLDivElement>} css={styles}>
			<FontAwesomeIcon icon={icon} />
			{props.children} [[{parseInt('' + width)}px]]
		</div>
	);
};

interface InnerComponentStyle {
	amount: number;
	bgColor: string;
	color: string;
}

const useInnerComponentStyle = (params: InnerComponentStyle) => {
	const { amount, bgColor, color } = params;
	const [ref, { width }] = useMeasure();

	const amountInt = parseInt('' + ((amount ?? 0) > 0 ? amount : 0));
	const max = Math.trunc(width / 200) + 1;
	const cols = amountInt > max || !width ? max : amountInt;

	const styles = css`
		position: relative;
		display: grid;
		grid-gap: 5px;
		grid-template-columns: repeat(${sanitizeCss(cols)}, 1fr);
		padding: ${sanitizeCss(cols > 0 ? '5px' : 0)};
		background-color: ${sanitizeCss(bgColor)};
		color: ${sanitizeCss(color)};
		overflow: hidden;
	`;

	return { ref: (ref as unknown) as RefObject<HTMLDivElement>, styles, width };
};

const InnerComponent: FunctionComponent<InnerComponentStyle> = (props) => {
	const { ref, styles, width } = useInnerComponentStyle(props);
	LOG && console.log('render inner - ' + props.amount);

	return (
		<div ref={ref} css={styles}>
			{Array(props.amount ?? 0)
				.fill(null)
				.map((_, idx) => (
					<InnermostComponent key={idx} color={props.color}>
						Test {idx} ({props.amount}) -- {width}px
					</InnermostComponent>
				))}
		</div>
	);
};

const SomeComponent: FunctionComponent<{ color: string }> = (props) => {
	return <div css={{ color: sanitizeCss(props.color) }} {...props} />;
};

export const EmotionApp = () => {
	const [{ oddColor, evenColor }, setState] = useState({
		oddColor: 'black',
		evenColor: 'white',
	});

	const tick = () =>
		setState(({ oddColor, evenColor }) => ({
			oddColor: evenColor,
			evenColor: oddColor,
		}));

	useEffect(() => {
		const timerId = setInterval(() => tick(), 5000);
		return () => clearInterval(timerId);
	}, []);

	console.log('render');

	return (
		<SomeComponent color='hotpink; padding: 50px; border: 1px solid black'>
			<u>Emotion</u> Component
			{[0, 1, 2, 3, 6, 9, 12, 15].map((amount, idx) => {
				const bgColor = idx % 2 === 0 ? oddColor : evenColor;
				const color = idx % 2 === 0 ? evenColor : oddColor;

				return (
					<InnerComponent
						key={idx}
						amount={amount}
						bgColor={bgColor + "'"}
						color={color}
					></InnerComponent>
				);
			})}
		</SomeComponent>
	);
};

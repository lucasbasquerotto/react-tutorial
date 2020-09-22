/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent, RefObject } from 'react';
import { useMeasure } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faAddressBook } from '@fortawesome/free-solid-svg-icons';

const InnermostComponent: FunctionComponent<{ color: string }> = (props) => {
	const [ref, { width }] = useMeasure();
	const borderColor = width < 150 ? 'red' : width < 400 ? 'yellow' : 'black';
	const icon = width < 250 ? faCoffee : faAddressBook;
	return (
		<div
			ref={(ref as unknown) as RefObject<HTMLDivElement>}
			css={{
				color: props.color,
				padding: '10px',
				border: '1px solid ' + borderColor,
			}}
		>
			<FontAwesomeIcon icon={icon} />
			{props.children} [[{parseInt('' + width)}px]]
		</div>
	);
};

const InnerComponent: FunctionComponent<{
	amount: number;
	bgColor: string;
	color: string;
}> = (props) => {
	const [ref, { width }] = useMeasure();
	const amount = parseInt('' + ((props.amount ?? 0) > 0 ? props.amount : 0));
	const max = Math.trunc(width / 200) + 1;
	const cols = amount > max ? max : amount;
	return (
		<div
			ref={(ref as unknown) as RefObject<HTMLDivElement>}
			css={css`
				position: relative;
				display: grid;
				grid-gap: 5px;
				grid-template-columns: repeat(${cols}, 1fr);
				padding: ${cols > 0 ? '5px' : 0};
				background-color: ${props.bgColor};
				color: ${props.color};
				overflow: hidden;
			`}
		>
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
	return <div css={{ color: props.color }} {...props} />;
};

export const EmotionApp = () => (
	<SomeComponent color='hotpink; padding: 50px'>
		<u>Emotion</u> Component
		<InnerComponent amount={0} bgColor='#ddd' color='black'></InnerComponent>
		<InnerComponent amount={1} bgColor='green' color='hotpink'></InnerComponent>
		<InnerComponent amount={2} bgColor='#ddd' color='black'></InnerComponent>
		<InnerComponent amount={3} bgColor='green' color='hotpink'></InnerComponent>
		<InnerComponent amount={6} bgColor='#ddd' color='black'></InnerComponent>
		<InnerComponent amount={9} bgColor='green' color='hotpink'></InnerComponent>
		<InnerComponent amount={12} bgColor='#ddd' color='black'></InnerComponent>
	</SomeComponent>
);

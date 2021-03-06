/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/** @jsx jsx */
// https://reactjs.org/tutorial/tutorial.html
import { jsx } from '@emotion/core';
import type { FunctionComponent, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import ContextApp from './context/app';
import { EmotionApp } from './emotion/emotion';
import { MyContainer } from './emotion/test';
import { FetchApp } from './fetch';
import { IntlApp } from './intl';
import { LinkifyApp } from './linkify/linkify';
import { MaterialUiApp } from './material/material';
import { NativeApp } from './native/App';
import Portal from './portal/portal';
import { ReduxApp } from './reduxEssentials/App';
import { MouseTracker } from './renderProps/index';
import type { Obj } from './types';

//////////////////////////////////////////////////////////////////////////
////////////////////////////////// CLOCK /////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const Clock = () => {
	const [state, setState] = useState({ date: new Date() });

	const tick = () => setState({ date: new Date() });

	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	}, []);

	return (
		<React.Fragment>
			<h1>Hello, world!</h1>
			<h2 suppressHydrationWarning>It is {state.date.toLocaleTimeString()}.</h2>
		</React.Fragment>
	);
};

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// CALCULATOR ///////////////////////////////
//////////////////////////////////////////////////////////////////////////

const scaleNames: { [key: string]: string } = {
	c: 'Celsius',
	f: 'Fahrenheit',
};

interface TemperatureInputProps {
	scale: string;
	temperature: string;
	onTemperatureChange: (value: string) => unknown;
}

const TemperatureInput: FunctionComponent<TemperatureInputProps> = ({
	temperature = '',
	scale = '',
	onTemperatureChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		onTemperatureChange(e.target.value);

	return (
		<fieldset>
			<legend>Enter temperature in {scaleNames?.[scale]}:</legend>
			<input value={temperature} onChange={handleChange} />
		</fieldset>
	);
};

const BoilingVerdict: FunctionComponent<{ celsius: number }> = ({
	celsius,
}) => {
	if (celsius >= 100) {
		return <p>The water would boil.</p>;
	}

	return <p>The water would not boil.</p>;
};

function tryConvert(temperature: string, convert: (value: number) => number) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function toCelsius(fahrenheit: number) {
	return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number) {
	return (celsius * 9) / 5 + 32;
}

const Calculator: FunctionComponent<Obj> = () => {
	const [state, setState] = useState({ temperature: '', scale: 'c' });

	const handleCelsiusChange = (temperature: string) =>
		setState({ scale: 'c', temperature });
	const handleFahrenheitChange = (temperature: string) =>
		setState({ scale: 'f', temperature });

	const { scale, temperature } = state;

	const celsius =
		scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
	const fahrenheit =
		scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

	return (
		<React.Fragment>
			<TemperatureInput
				scale="c"
				temperature={celsius}
				onTemperatureChange={handleCelsiusChange}
			/>
			<TemperatureInput
				scale="f"
				temperature={fahrenheit}
				onTemperatureChange={handleFahrenheitChange}
			/>
			<BoilingVerdict celsius={parseFloat(celsius)} />
		</React.Fragment>
	);
};

//////////////////////////////////////////////////////////////////////////
///////////////////////////////// DIALOG /////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const FancyBorder: FunctionComponent<{ color: string }> = ({
	color,
	children,
}) => <div className={`FancyBorder FancyBorder-${color}`}>{children}</div>;

const Dialog: FunctionComponent<{ title: string; message: string }> = ({
	title,
	message,
	children,
}) => (
	<FancyBorder color="blue">
		<h1 className="Dialog-title">{title}</h1>
		<p className="Dialog-message">{message}</p>
		{children}
	</FancyBorder>
);

const SignUpDialog: FunctionComponent<Obj> = () => {
	const [state, setState] = useState({ login: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setState({ login: e.target.value });
	const handleSignUp = () => console.log(`Welcome aboard, ${state.login}!`);

	return (
		<Dialog
			title="Mars Exploration Program"
			message="How should we refer to you?"
		>
			<input value={state.login} onChange={handleChange} />
			<button type="button" onClick={handleSignUp}>
				Sign Me Up!
			</button>
		</Dialog>
	);
};

//////////////////////////////////////////////////////////////////////////
////////////////////////////////// GAME //////////////////////////////////
//////////////////////////////////////////////////////////////////////////

interface SquareProps {
	highlighted: boolean;
	value: string | null;
	onClick: () => unknown;
}

const Square: FunctionComponent<SquareProps> = ({
	highlighted,
	onClick,
	value,
}) => (
	<button
		type="button"
		className={`square + ${highlighted ? ' highlighted' : ''}`}
		onClick={onClick}
	>
		{value}
	</button>
);

interface BoardProps {
	squares: (string | null)[];
	winnerSquares?: Set<number>;
	onClick: (i: number) => unknown;
}

const Board: FunctionComponent<BoardProps> = (props) => {
	const renderSquare = (i: number) => (
		<Square
			key={i}
			value={props.squares[i]}
			highlighted={props.winnerSquares?.has(i) ?? false}
			onClick={() => props.onClick(i)}
		/>
	);

	const renderCols = (row: number) =>
		new Array(3)
			.fill(1)
			.map((_, i) => i)
			.map((i) => renderSquare(row * 3 + i));

	const renderRows = () =>
		new Array(3)
			.fill(1)
			.map((_, i) => i)
			.map((i) => (
				<div key={i} className="board-row">
					{renderCols(i)}
				</div>
			));

	return <React.Fragment>{renderRows()}</React.Fragment>;
};

interface GameState {
	history: {
		squares: (string | null)[];
		col?: number;
		row?: number;
	}[];
	stepNumber: number;
	xIsNext: boolean;
	historyDesc: boolean;
}

function calculateWinner(squares: (string | null)[]) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	// eslint-disable-next-line no-restricted-syntax
	for (const [a, b, c] of lines) {
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { winner: squares[a], squares: new Set([a, b, c]) };
		}
	}
	return null;
}

const Game: FunctionComponent<Obj> = () => {
	const [state, setState] = useState<GameState>({
		history: [
			{
				squares: Array<string | null>(9).fill(null),
			},
		],
		stepNumber: 0,
		xIsNext: true,
		historyDesc: false,
	});

	const handleClick = (i: number) => {
		const history = state.history.slice(0, state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const winner = calculateWinner(squares)?.winner;
		if (winner || squares[i]) {
			return;
		}
		squares[i] = state.xIsNext ? 'X' : 'O';
		const col = (i % 3) + 1;
		const row = Math.trunc(i / 3) + 1;
		setState((s) => ({
			...s,
			history: history.concat([{ squares, col, row }]),
			stepNumber: history.length,
			xIsNext: !s.xIsNext,
		}));
	};

	const jumpTo = (step: number) =>
		setState((s) => ({
			...s,
			stepNumber: step,
			xIsNext: step % 2 === 0,
		}));

	const toggleHistory = () =>
		setState((s) => ({
			...s,
			historyDesc: !s.historyDesc,
		}));

	const render = () => {
		const { history, historyDesc } = state;
		const current = history[state.stepNumber];
		const { squares } = current;
		const winnerInfo = calculateWinner(squares);
		const winner = winnerInfo?.winner;
		const winnerSquares = winnerInfo?.squares;
		const draw = !winner && squares.filter((s) => s === null).length === 0;

		const moves = history.map((step, move) => {
			const { row, col } = step;
			const desc = move
				? `Go to move #${move} (${col ?? ''}, ${row ?? ''})`
				: 'Go to game start';
			const isCurrent = move === state.stepNumber;
			return (
				<li key={move}>
					<button type="button" onClick={() => jumpTo(move)}>
						{isCurrent ? <b>{desc}</b> : desc}
					</button>
				</li>
			);
		});

		const showMoves = historyDesc ? moves.reverse() : moves;

		const status = winner
			? `Winner: ${winner}`
			: draw
			? 'Draw'
			: `Next player: ${state.xIsNext ? 'X' : 'O'}`;

		const orderDescription = historyDesc ? 'Descending' : 'Ascending';

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={squares}
						winnerSquares={winnerSquares}
						onClick={(i) => handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div className="status">{status}</div>
					<div className="order-description">
						Order: {orderDescription}{' '}
						<button type="button" onClick={() => toggleHistory()}>
							Toggle
						</button>
					</div>
					<ol>{showMoves}</ol>
				</div>
			</div>
		);
	};

	return render();
};

//////////////////////////////////////////////////////////////////////////
//////////////////////////////// PRODUCTS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const ProductCategoryRow: FunctionComponent<{ category: string }> = ({
	category,
}) => (
	<tr>
		<th colSpan={2}>{category}</th>
	</tr>
);

interface Product {
	name: string;
	category: string;
	price: string;
	stocked: boolean;
}

const ProductRow: FunctionComponent<{ product: Product }> = ({ product }) => {
	const name = product.stocked ? (
		product.name
	) : (
		<span css={{ color: 'red' }}>{product.name}</span>
	);

	return (
		<tr>
			<td>{name}</td>
			<td>{product.price}</td>
		</tr>
	);
};

interface FilterableProductState {
	filterText: string;
	inStockOnly: boolean;
}

interface ProductTableProps extends FilterableProductState {
	products: Product[];
}

const ProductTable: FunctionComponent<ProductTableProps> = ({
	products,
	filterText,
	inStockOnly,
}) => {
	const rows: ReactNode[] = [];
	let lastCategory: string | null = null;

	products.forEach((product) => {
		if (!product.name.includes(filterText)) {
			return;
		}
		if (inStockOnly && !product.stocked) {
			return;
		}
		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow
					key={product.category}
					category={product.category}
				/>,
			);
		}
		rows.push(<ProductRow product={product} key={product.name} />);
		lastCategory = product.category;
	});

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
};

interface SearchBarProps extends FilterableProductState {
	onFilterTextChange: (value: string) => unknown;
	onInStockChange: (value: boolean) => unknown;
}

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
	const {
		filterText,
		onFilterTextChange,
		inStockOnly,
		onInStockChange,
	} = props;
	const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		onFilterTextChange(e.target.value);
	const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		onInStockChange(e.target.checked);

	return (
		<form>
			<input
				type="text"
				placeholder="Search..."
				value={filterText}
				onChange={handleFilterTextChange}
			/>
			<p>
				<input
					type="checkbox"
					checked={inStockOnly}
					onChange={handleInStockChange}
				/>{' '}
				Only show products in stock
			</p>
		</form>
	);
};

const FilterableProductTable: FunctionComponent<{
	products: Product[];
}> = (props) => {
	const [state, setState] = useState<FilterableProductState>({
		filterText: '',
		inStockOnly: false,
	});

	const handleFilterTextChange = (filterText: string) =>
		setState((s) => ({ ...s, filterText }));
	const handleInStockChange = (inStockOnly: boolean) =>
		setState((s) => ({ ...s, inStockOnly }));

	const { products } = props;

	return (
		<React.Fragment>
			<SearchBar
				filterText={state.filterText}
				inStockOnly={state.inStockOnly}
				onFilterTextChange={handleFilterTextChange}
				onInStockChange={handleInStockChange}
			/>
			<ProductTable
				products={products}
				filterText={state.filterText}
				inStockOnly={state.inStockOnly}
			/>
		</React.Fragment>
	);
};

const PRODUCTS = [
	{
		category: 'Sporting Goods',
		price: '$49.99',
		stocked: true,
		name: 'Football',
	},
	{
		category: 'Sporting Goods',
		price: '$9.99',
		stocked: true,
		name: 'Baseball',
	},
	{
		category: 'Sporting Goods',
		price: '$29.99',
		stocked: false,
		name: 'Basketball',
	},
	{
		category: 'Electronics',
		price: '$99.99',
		stocked: true,
		name: 'iPod Touch',
	},
	{
		category: 'Electronics',
		price: '$399.99',
		stocked: false,
		name: 'iPhone 5',
	},
	{ category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

const Products = () => <FilterableProductTable products={PRODUCTS} />;

//////////////////////////////////////////////////////////////////////////
////////////////////////////////// ROOT //////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const WebApp = () => (
	<React.Fragment>
		<div className="root-container">
			<div className="clock">
				<Clock />
			</div>
			<div className="calculator">
				<Calculator />
			</div>
			<div className="sign-up-dialog">
				<SignUpDialog />
			</div>
			<div className="products">
				<Products />
			</div>
			<div className="game">
				<Game />
			</div>
			<div className="context">
				<ContextApp />
			</div>
			<div className="portal">
				<Portal />
			</div>
			<div className="mouse-tracker">
				<MouseTracker />
			</div>
			<div className="fetch">
				<FetchApp />
			</div>
			<div className="redux-counter">
				<ReduxApp />
			</div>
			<div className="emotion">
				<EmotionApp />
			</div>
			<div className="material-ui">
				<MaterialUiApp />
			</div>
			<div className="test">
				<MyContainer />
			</div>
			<div className="intl">
				<IntlApp />
			</div>
			<div className="native">
				<NativeApp />
			</div>
			<div className="linkify">
				<LinkifyApp />
			</div>
		</div>
	</React.Fragment>
);

//////////////////////////////////////////////////////////////////////////
///////////////////////////////// RENDER /////////////////////////////////
//////////////////////////////////////////////////////////////////////////

export { WebApp };

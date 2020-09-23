// https://reactjs.org/tutorial/tutorial.html
/* eslint-disable react/prop-types */
import React, {
	FunctionComponent,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import ReactDOM from 'react-dom';
import ContextApp from './context/app';
import { EmotionApp } from './emotion/emotion';
import { FetchApp } from './fetch';
import './index.css';
import { JssApp } from './jss/jss';
import { MaterialUiApp } from './material/material';
import Portal from './portal/portal';
import { ReduxApp } from './reduxEssentials/App';
import { MouseTracker } from './renderProps/index';

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
		<>
			<h1>Hello, world!</h1>
			<h2>It is {state.date.toLocaleTimeString()}.</h2>
		</>
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

const TemperatureInput: FunctionComponent<TemperatureInputProps> = (props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.onTemperatureChange(e.target.value);

	const temperature = props.temperature ?? '';
	const scale = props.scale ?? '';

	return (
		<fieldset>
			<legend>Enter temperature in {scaleNames?.[scale]}:</legend>
			<input value={temperature} onChange={handleChange} />
		</fieldset>
	);
};

const BoilingVerdict: FunctionComponent<{ celsius: number }> = (props) => {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}

	return <p>The water would not boil.</p>;
};

const Calculator: FunctionComponent<{}> = () => {
	const [state, setState] = useState({ temperature: '', scale: 'c' });

	const handleCelsiusChange = (temperature: string) =>
		setState({ scale: 'c', temperature });
	const handleFahrenheitChange = (temperature: string) =>
		setState({ scale: 'f', temperature });

	const scale = state.scale;
	const temperature = state.temperature;
	const celsius =
		scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
	const fahrenheit =
		scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

	return (
		<>
			<TemperatureInput
				scale='c'
				temperature={celsius}
				onTemperatureChange={handleCelsiusChange}
			/>
			<TemperatureInput
				scale='f'
				temperature={fahrenheit}
				onTemperatureChange={handleFahrenheitChange}
			/>
			<BoilingVerdict celsius={parseFloat(celsius)} />
		</>
	);
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

//////////////////////////////////////////////////////////////////////////
///////////////////////////////// DIALOG /////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const FancyBorder: FunctionComponent<{ color: string }> = (props) => (
	<div className={'FancyBorder FancyBorder-' + props.color}>
		{props.children}
	</div>
);

const Dialog: FunctionComponent<{ title: string; message: string }> = (
	props
) => (
	<FancyBorder color='blue'>
		<h1 className='Dialog-title'>{props.title}</h1>
		<p className='Dialog-message'>{props.message}</p>
		{props.children}
	</FancyBorder>
);

const SignUpDialog: FunctionComponent<{}> = () => {
	const [state, setState] = useState({ login: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setState({ login: e.target.value });
	const handleSignUp = () => alert(`Welcome aboard, ${state.login}!`);

	return (
		<Dialog
			title='Mars Exploration Program'
			message='How should we refer to you?'
		>
			<input value={state.login} onChange={handleChange} />
			<button onClick={handleSignUp}>Sign Me Up!</button>
		</Dialog>
	);
};

//////////////////////////////////////////////////////////////////////////
////////////////////////////////// GAME //////////////////////////////////
//////////////////////////////////////////////////////////////////////////

interface SquareProps {
	highlighted: boolean;
	value: string;
	onClick: () => unknown;
}

const Square: FunctionComponent<SquareProps> = (props) => (
	<button
		className={'square' + (props.highlighted ? ' highlighted' : '')}
		onClick={props.onClick}
	>
		{props.value}
	</button>
);

interface BoardProps {
	squares: Array<string>;
	winnerSquares?: Set<number>;
	onClick: (i: number) => unknown;
}

const Board: FunctionComponent<BoardProps> = (props) => {
	const renderSquare = (i: number) => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				highlighted={props.winnerSquares?.has(i) ?? false}
				onClick={() => props.onClick(i)}
			/>
		);
	};

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
				<div key={i} className='board-row'>
					{renderCols(i)}
				</div>
			));

	return <>{renderRows()}</>;
};

interface GameState {
	history: {
		squares: string[];
		col?: number;
		row?: number;
	}[];
	stepNumber: number;
	xIsNext: boolean;
	historyDesc: boolean;
}

const Game: FunctionComponent<{}> = () => {
	const [state, setState] = useState<GameState>({
		history: [
			{
				squares: Array(9).fill(null),
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

	const jumpTo = (step: number) => {
		return setState((s) => ({
			...s,
			stepNumber: step,
			xIsNext: step % 2 === 0,
		}));
	};

	const toggleHistory = () => {
		return setState((s) => ({
			...s,
			historyDesc: !s.historyDesc,
		}));
	};

	const render = () => {
		const history = state.history;
		const historyDesc = state.historyDesc;
		const current = history[state.stepNumber];
		const squares = current.squares;
		const winnerInfo = calculateWinner(squares);
		const winner = winnerInfo?.winner;
		const winnerSquares = winnerInfo?.squares;
		const draw = !winner && squares.filter((s) => s === null).length === 0;

		const moves = history.map((step, move) => {
			const desc = move
				? 'Go to move #' + move + ' (' + step.col + ', ' + step.row + ')'
				: 'Go to game start';
			const isCurrent = move === state.stepNumber;
			return (
				<li key={move}>
					<button onClick={() => jumpTo(move)}>
						{isCurrent ? <b>{desc}</b> : desc}
					</button>
				</li>
			);
		});

		const showMoves = historyDesc ? moves.reverse() : moves;

		const status = winner
			? 'Winner: ' + winner
			: draw
			? 'Draw'
			: 'Next player: ' + (state.xIsNext ? 'X' : 'O');

		const orderDescription = historyDesc ? 'Descending' : 'Ascending';

		return (
			<div className='game'>
				<div className='game-board'>
					<Board
						squares={squares}
						winnerSquares={winnerSquares}
						onClick={(i) => handleClick(i)}
					/>
				</div>
				<div className='game-info'>
					<div className='status'>{status}</div>
					<div className='order-description'>
						Order: {orderDescription}{' '}
						<button onClick={() => toggleHistory()}>Toggle</button>
					</div>
					<ol>{showMoves}</ol>
				</div>
			</div>
		);
	};

	return render();
};

function calculateWinner(squares: Array<string>) {
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
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { winner: squares[a], squares: new Set([a, b, c]) };
		}
	}
	return null;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////// PRODUCTS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const ProductCategoryRow: FunctionComponent<{ category: string }> = (props) => (
	<tr>
		<th colSpan={2}>{props.category}</th>
	</tr>
);

interface Product {
	name: string;
	category: string;
	price: string;
	stocked: boolean;
}

const ProductRow: FunctionComponent<{ product: Product }> = (props) => {
	const product = props.product;
	const name = product.stocked ? (
		product.name
	) : (
		<span style={{ color: 'red' }}>{product.name}</span>
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
	products: Array<Product>;
}

const ProductTable: FunctionComponent<ProductTableProps> = (props) => {
	const filterText = props.filterText;
	const inStockOnly = props.inStockOnly;

	const rows: Array<ReactNode> = [];
	let lastCategory: string | null = null;

	props.products.forEach((product) => {
		if (product.name.indexOf(filterText) === -1) {
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
				/>
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
	const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.onFilterTextChange(e.target.value);
	const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		props.onInStockChange(e.target.checked);

	return (
		<form>
			<input
				type='text'
				placeholder='Search...'
				value={props.filterText}
				onChange={handleFilterTextChange}
			/>
			<p>
				<input
					type='checkbox'
					checked={props.inStockOnly}
					onChange={handleInStockChange}
				/>{' '}
				Only show products in stock
			</p>
		</form>
	);
};

const FilterableProductTable: FunctionComponent<{
	products: Array<Product>;
}> = (props) => {
	const [state, setState] = useState<FilterableProductState>({
		filterText: '',
		inStockOnly: false,
	});

	const handleFilterTextChange = (filterText: string) =>
		setState((s) => ({ ...s, filterText }));
	const handleInStockChange = (inStockOnly: boolean) =>
		setState((s) => ({ ...s, inStockOnly }));

	return (
		<>
			<SearchBar
				filterText={state.filterText}
				inStockOnly={state.inStockOnly}
				onFilterTextChange={handleFilterTextChange}
				onInStockChange={handleInStockChange}
			/>
			<ProductTable
				products={props.products}
				filterText={state.filterText}
				inStockOnly={state.inStockOnly}
			/>
		</>
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

const Root = () => (
	<>
		<div className='root-container'>
			<div className='clock'>
				<Clock />
			</div>
			<div className='calculator'>
				<Calculator />
			</div>
			<div className='sign-up-dialog'>
				<SignUpDialog />
			</div>
			<div className='products'>
				<Products />
			</div>
			<div className='game'>
				<Game />
			</div>
			<div className='context'>
				<ContextApp />
			</div>
			<div className='portal'>
				<Portal />
			</div>
			<div className='mouse-tracker'>
				<MouseTracker />
			</div>
			<div className='fetch'>
				<FetchApp />
			</div>
			<div className='redux-counter'>
				<ReduxApp />
			</div>
			<div className='jss'>
				<JssApp />
			</div>
			<div className='emotion'>
				<EmotionApp />
			</div>
			<div className='material-ui'>
				<MaterialUiApp />
			</div>
		</div>
	</>
);

//////////////////////////////////////////////////////////////////////////
///////////////////////////////// RENDER /////////////////////////////////
//////////////////////////////////////////////////////////////////////////

ReactDOM.render(<Root />, document.getElementById('root'));

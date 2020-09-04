// https://reactjs.org/tutorial/tutorial.html
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//////////////////////////////////////////////////////////////////////////
////////////////////////////////// CLOCK /////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const Clock = () => {
	const [state, setState] = useState({ date: new Date() });

	const tick = () => setState({ date: new Date() });

	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	});

	return (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {state.date.toLocaleTimeString()}.</h2>
		</div>
	);
};

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// CALCULATOR ///////////////////////////////
//////////////////////////////////////////////////////////////////////////

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit',
};

const TemperatureInput = (props) => {
	const handleChange = (e) => props.onTemperatureChange(e.target.value);

	const temperature = props.temperature ?? '';
	const scale = props.scale ?? '';

	return (
		<fieldset>
			<legend>Enter temperature in {scaleNames?.[scale]}:</legend>
			<input value={temperature} onChange={handleChange} />
		</fieldset>
	);
};

const BoilingVerdict = (props) => {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}

	return <p>The water would not boil.</p>;
};

const Calculator = () => {
	const [state, setState] = useState({ temperature: '', scale: 'c' });

	const handleCelsiusChange = (temperature) =>
		setState({ scale: 'c', temperature });
	const handleFahrenheitChange = (temperature) =>
		setState({ scale: 'f', temperature });

	const scale = state.scale;
	const temperature = state.temperature;
	const celsius =
		scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
	const fahrenheit =
		scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

	return (
		<div>
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
		</div>
	);
};

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function toCelsius(fahrenheit) {
	return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9) / 5 + 32;
}

//////////////////////////////////////////////////////////////////////////
////////////////////////////////// GAME //////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const Square = (props) => (
	<button
		className={'square' + (props.highlighted ? ' highlighted' : '')}
		onClick={props.onClick}
	>
		{props.value}
	</button>
);

const Board = (props) => {
	const renderSquare = (i) => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				highlighted={props.winnerSquares?.has(i)}
				onClick={() => props.onClick(i)}
			/>
		);
	};

	const renderCols = (row) =>
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

	return <div>{renderRows()}</div>;
};

const Game = () => {
	const [state, setState] = useState({
		history: [
			{
				squares: Array(9).fill(null),
				col: null,
				row: null,
			},
		],
		stepNumber: 0,
		xIsNext: true,
		historyDesc: false,
	});

	const handleClick = (i) => {
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
			history: history.concat([{ squares, col, row }]),
			stepNumber: history.length,
			xIsNext: !s.xIsNext,
		}));
	};

	const jumpTo = (step) => {
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
					<div>{status}</div>
					<div>
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

const Root = () => (
	<div>
		<div>
			<Clock />
		</div>
		<div>
			<Calculator />
		</div>
		<div>
			<Game />
		</div>
	</div>
);

// ========================================

ReactDOM.render(<Root />, document.getElementById('root'));

function calculateWinner(squares) {
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

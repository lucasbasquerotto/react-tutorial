// https://reactjs.org/tutorial/tutorial.html
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	const className = 'square' + (props.highlighted ? ' highlighted' : '');

	return (
		<button className={className} onClick={props.onClick}>
			{props.value}
		</button>
	);
}

function Board(props) {
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
}

function Game() {
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
		setState({
			history: history.concat([{ squares, col, row }]),
			stepNumber: history.length,
			xIsNext: !state.xIsNext,
		});
	};

	const jumpTo = (step) => {
		return setState({
			...state,
			stepNumber: step,
			xIsNext: step % 2 === 0,
		});
	};

	const toggleHistory = () => {
		return setState({
			...state,
			historyDesc: !state.historyDesc,
		});
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
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

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

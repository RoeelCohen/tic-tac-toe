import React, { Fragment, Component } from 'react';

import { withGame } from '../HOC/withGame';
import { gameLogic } from '../gamesLogic/TicTacToe';
import TicTacToeCell from './TicTacToeCell';
import { EMPTY } from '../gamesLogic/constants';

class TicTacToe extends Component {
	constructor(props) {
		super(props);

		this.renderCells = this.renderCells.bind(this);
		this.onCellClicked = this.onCellClicked.bind(this);
	}

	onCellClicked(e, cell, cellIndex, rowIndex) {
		const { currentPlayerTurn, playerMadeAMove, gameOver, playerWon } = this.props;

		e.stopPropagation();
		e.preventDefault();

		if (cell !== EMPTY || gameOver || playerWon) {
			return;
		}

		playerMadeAMove({
			x: cellIndex,
			y: rowIndex,
			playerTurn: currentPlayerTurn
		});
	}

	renderCells() {
		const { board, winStreak } = this.props;

		//winStreak(pin): [[1,1],[2,2],[0,0]]

		return board.map((row, rowIndex) => {
			return row.map((cell, cellIndex) => {
				return (
					<TicTacToeCell
						key={`${rowIndex}${cellIndex}`}
						value={cell}
						onCellClicked={e => this.onCellClicked(e, cell, cellIndex, rowIndex)}
					/>
				);
			});
		});
	}

	render() {
		const { gameOver, playerWon, restartGame, score } = this.props;

		return (
			<Fragment>
				<div className="game-ended">
					{`P1  - ${score.p1}`} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`P2 - ${score.p2}`}
				</div>
				{gameOver && <div className="game-ended">Game Over</div>}
				{playerWon && <div className="game-ended">{`Player ${playerWon} win`}</div>}
				<div className="board">{this.renderCells()}</div>
				{(gameOver || playerWon) && (
					<div
						className="restart-game"
						onClick={e => {
							e.stopPropagation();
							e.preventDefault();
							restartGame();
						}}
					>
						Restart Game
					</div>
				)}
			</Fragment>
		);
	}
}

export default withGame(gameLogic, TicTacToe);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playerMadeAMove, onPlayerWon, onGameOver, restartGame } from '../actions/game';

export const withGame = (gameLogic, WrappedComponent) => {
	class BoardGame extends Component {
		componentDidUpdate(prevProps) {
			const { board, lastMove, nextMoveNumber, onPlayerWon, onGameOver } = this.props;
			const { didPlayerWin, isGameOver, minMovesToWin = 0 } = gameLogic;

			if (lastMove !== prevProps.lastMove && nextMoveNumber > minMovesToWin) {
				const result = didPlayerWin(lastMove.playerTurn, lastMove, board);
				if (result.win) {
					onPlayerWon(result);
					return;
				}

				if (isGameOver(nextMoveNumber - 1)) {
					onGameOver();
				}
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	const mapStateToProps = state => ({
		board: state.game.board,
		currentPlayerTurn: state.game.currentPlayerTurn,
		lastMove: state.game.lastMove,
		nextMoveNumber: state.game.nextMoveNumber,
		gameOver: state.game.gameOver,
		playerWon: state.game.playerWon,
		winStreak: state.game.winStreak,
		score: state.game.score
	});

	const mapDispatchToProps = dispatch => {
		return {
			playerMadeAMove: move => dispatch(playerMadeAMove(move)),
			onPlayerWon: result => dispatch(onPlayerWon(result)),
			onGameOver: () => dispatch(onGameOver()),
			restartGame: () => dispatch(restartGame())
		};
	};

	return connect(
		mapStateToProps,
		mapDispatchToProps
	)(BoardGame);
};

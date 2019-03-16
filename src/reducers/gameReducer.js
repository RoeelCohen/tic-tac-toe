import { PLAYER_PLAYED, GAME_WON, GAME_OVER, RESTART_GAME } from '../actions/types';
import { createNewBoard } from '../gamesLogic/gameUtils';
import { P1, P2 } from '../gamesLogic/constants';

const initalState = () => ({
	board: createNewBoard(3),
	lastMove: { playerTurn: 0, x: -1, y: -1 },
	score: { p1: 0, p2: 0 },
	currentPlayerTurn: 1,
	nextMoveNumber: 1
});

export default (state = initalState(), action) => {
	switch (action.type) {
		case PLAYER_PLAYED:
			const { move } = action;
			const { nextMoveNumber, currentPlayerTurn } = state;
			const board = [...state.board];
			board[move.y][move.x] = move.playerTurn;

			const newState = {
				board,
				nextMoveNumber: nextMoveNumber + 1,
				currentPlayerTurn: currentPlayerTurn === P1 ? P2 : P1,
				lastMove: move
			};

			return Object.assign({}, state, newState);

		case GAME_WON:
			const { playerWon, winStreak } = action.gameResult;
			const { score } = state;

			const newScore = {
				p1: playerWon === P1 ? score.p1 + 1 : score.p1,
				p2: playerWon === P2 ? score.p2 + 1 : score.p2
			};

			return Object.assign({}, state, {
				score: newScore,
				gameWon: true,
				playerWon,
				winStreak
			});

		case GAME_OVER:
			return Object.assign({}, state, { gameOver: true });

		case RESTART_GAME:
			return Object.assign(initalState(), { score: state.score });

		default:
			return state;
	}
};

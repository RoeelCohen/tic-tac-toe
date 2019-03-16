import { PLAYER_PLAYED, GAME_WON, GAME_OVER, RESTART_GAME } from './types';

export const playerMadeAMove = move => ({
	type: PLAYER_PLAYED,
	move
});

export const onPlayerWon = gameResult => ({
	type: GAME_WON,
	gameResult
});

export const onGameOver = () => ({
	type: GAME_OVER
});

export const restartGame = () => ({
	type: RESTART_GAME
});

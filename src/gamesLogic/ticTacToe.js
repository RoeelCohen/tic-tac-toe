export const BOARD_SIZE = 5;

const getBoardCenter = boardSize => {
	return Math.floor(boardSize / 2);
};

const getWinStreak = (player, lastMove, boardState) => {
	const rowStreak = [];
	const columnStreak = [];

	for (let i = 0; i < BOARD_SIZE; i++) {
		const rowStep = boardState[lastMove.y][i];
		const ColumnStep = boardState[i][lastMove.x];

		rowStep === player && rowStreak.push([i, lastMove.y]);
		ColumnStep === player && columnStreak.push([lastMove.x, i]);
	}

	if (rowStreak.length === BOARD_SIZE) {
		return rowStreak;
	} else if (columnStreak.length === BOARD_SIZE) {
		return columnStreak;
	}

	const boardCenter = getBoardCenter(BOARD_SIZE);
	if (player === boardState[boardCenter][boardCenter]) {
		const steps = Math.ceil(BOARD_SIZE / 2);
		const forwardDiagonalStreak = [[boardCenter, boardCenter]];
		const backDiagonalStreak = [[boardCenter, boardCenter]];
		for (let i = 1; i < steps; i++) {
			const nFDStep = boardState[boardCenter + i][boardCenter + i];
			const pFDStep = boardState[boardCenter - i][boardCenter - i];

			const nBKStep = boardState[boardCenter - i][boardCenter + i];
			const pBKStep = boardState[boardCenter + i][boardCenter - i];

			nFDStep === player && forwardDiagonalStreak.push([boardCenter + i, boardCenter + i]);
			pFDStep === player && forwardDiagonalStreak.push([boardCenter - i, boardCenter - i]);

			nBKStep === player && backDiagonalStreak.push([boardCenter - i, boardCenter + i]);
			pBKStep === player && backDiagonalStreak.push([boardCenter + i, boardCenter - i]);
		}

		if (forwardDiagonalStreak.length === BOARD_SIZE) {
			return forwardDiagonalStreak;
		} else if (backDiagonalStreak.length === BOARD_SIZE) {
			return backDiagonalStreak;
		}
	}

	return [];
};

const didPlayerWin = (player, lastMove, boardState) => {
	const winStreak = getWinStreak(player, lastMove, boardState);
	return { win: winStreak.length === 3, playerWon: player, winStreak };
};

const isGameOver = turnNumber => {
	return turnNumber === 9;
};

const minMovesToWin = 5;

export const gameLogic = {
	didPlayerWin,
	isGameOver,
	minMovesToWin
};

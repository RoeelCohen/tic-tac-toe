// return 2d array with state for each 'board cell'
// where the default state is 0 with the size of @boardSize param
// example:  [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
export const createNewBoard = (boardSize, defaultState = 0) => {
	const board = [];

	for (let y = 0; y < boardSize; y++) {
		const subBoard = [];
		for (let x = 0; x < boardSize; x++) {
			subBoard.push(defaultState);
		}
		board.push(subBoard);
	}

	return board;
};

export const getWhosPlayerTurn = turnNumber => {
	return turnNumber % 2 === 0 ? 2 : 1;
};

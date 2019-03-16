import React from 'react';
import circle from '../assets/circle.svg';
import x from '../assets/x.svg';

import { P1, P2 } from '../gamesLogic/constants';

export default props => {
	let src;
	const { value, onCellClicked } = props;

	if (value === P1) {
		src = x;
	} else if (value === P2) {
		src = circle;
	}

	return <img className="cell" src={src} onClick={onCellClicked} alt="" />;
};

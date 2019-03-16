import React, { Component } from 'react';
import './style/app.scss';

import TicTacToe from './components/TicTacToe';
class App extends Component {
	render() {
		return (
			<div className="App">
				<TicTacToe />
			</div>
		);
	}
}

export default App;

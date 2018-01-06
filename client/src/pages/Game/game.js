import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

class Game extends Component{
	constructor(props) {
		super(props);
		this.state = {
			stateSketch: sketch,
		};
	}

	render () {
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch} />
			</div>
		);
	}
}

export default Game;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import BackgroundSound from './backgroundSound';

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
				<BackgroundSound />
				<center><P5Wrapper sketch={this.state.stateSketch} /></center>
			</div>
		);
	}
}

export default Game;

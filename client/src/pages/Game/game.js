import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

class Game extends Component{
	constructor(props) {
		super(props);
		this.state = {
			stateSketch: sketch
		};
	}
  
	render () {
		return (
			<div>
				<center><P5Wrapper sketch={this.state.stateSketch} /></center>
			</div>
		);
	}
}

export default Game;

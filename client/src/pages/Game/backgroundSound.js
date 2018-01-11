import React, {Component} from 'react';
import Sound from 'react-sound';

class backgroundSound extends Component {
	render () {
		return (
			<div className = "bkmusic">
				<Sound
					url = 'http://k003.kiwi6.com/hotlink/6dvg0y02xl/trimbackground.wav'
					playStatus = {Sound.status.PLAYING}
					playFromPosition = {0}
					onLoading = {this.handleSongLoading}
					onPlaying = {this.handleSongPlaying}
					loop = {true}
				/>
			</div>
		);
	}
}

export default backgroundSound;

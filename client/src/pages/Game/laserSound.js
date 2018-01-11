import React, {Component} from 'react';
import Sound from 'react-sound';

class laserSound extends Component {
	render () {
		return (
			<div className = "bkmusic">
				<Sound
					url = 'http://k003.kiwi6.com/hotlink/mvssllcdt8/laser_gun.wav'
					playStatus = {Sound.status.PLAYING}
					playFromPosition = {0}
					onLoading = {this.handleSongLoading}
					onPlaying = {this.handleSongPlaying}
				/>
			</div>
		);
	}
}

export default laserSound;
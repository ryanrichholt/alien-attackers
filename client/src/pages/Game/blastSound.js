import React, {Component} from 'react';
import Sound from 'react-sound';

class blastSound extends Component {
	render () {
		return (
			<div className = "bkmusic">
				<Sound
					url = 'http://k003.kiwi6.com/hotlink/gvhzffh5we/bomb.mp3'
					playStatus = {Sound.status.PLAYING}
					playFromPosition = {0}
					onLoading = {this.handleSongLoading}
					onPlaying = {this.handleSongPlaying}
				/>
			</div>
		);
	}
}

export default blastSound;
import React from 'react';
import Video from '../../images/earth_from_space.mp4';
import './BackGround.css';

const BackGround = props => (
            <div className="video-background">
              <div className="video-foreground">
                <iframe src="https://www.youtube.com/embed/y2RVEK8XkFk?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=y2RVEK8XkFk" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
);

export default BackGround;

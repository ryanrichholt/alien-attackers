import React from 'react';
import Video from '../../images/earth_from_space.mp4';
import './BackGround.css';

const BackGround = props => (
  <video id="background-video" loop autoPlay>
    <source src= {Video} type="video/mp4" />
    <source src= {Video} type="video/ogg" />
    Your browser does not support the video tag.
  </video>
);

export default BackGround;

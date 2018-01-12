import React from "react";
import { Link } from 'react-router-dom';
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer w-100 bg-dark text-white align-content-around">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">Leaderboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/game">New Game</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/API">API</a>
            </li>
          </ul>    
    </div>
  )
}


export default Footer;
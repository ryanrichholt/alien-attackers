import React from "react";
import "./Nav.css";

const Nav = () =>
  <nav className="navbar center-align">
    <div className="container-fluid">
      <div className="nav-wrapper">
        <ul className="nav navbar-nav">
          <li><a href="/" className="brand-logo">Home</a></li>
          <li><a href="/leaderboard" className="brand-logo">Leaderboard</a></li>
          <li><a href="/game" className="brand-logo">Game</a></li>
          <li><a href="/profile" className="brand-logo">Profile</a></li>
        </ul>
        </div>
      </div>
    
  </nav>;

export default Nav;

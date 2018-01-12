import React from "react";
import "./Nav.css";

const Nav = () =>
  <nav className="navbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <ul className="nav navbar-nav">
          <li><a href="/" className="navbar-brand">Home</a></li>
          <li><a href="/leaderboard" className="navbar-brand">Leaderboard</a></li>
          <li><a href="/game" className="navbar-brand">Game</a></li>
          <li><a href="/profile" className="navbar-brand">Profile</a></li>
        </ul>
      </div>
    </div>
  </nav>;

export default Nav;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home/home';
import Leaderboard from './pages/Leaderboard/leaderboard';
import Profile from './pages/Profile/profile';
import Game from './pages/Game/game';
import Nav from "./components/Nav";
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';


const App = () =>
  <Router>
    <div>
     <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </div>
  </Router>;


export default App;

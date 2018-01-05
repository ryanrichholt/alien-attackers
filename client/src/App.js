import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home/home'
import Leaderboard from './pages/Leaderboard/leaderboard'
import Profile from './pages/Profile/profile'
//import NoMatch from './pages/NoMatch/nomatch'
//import './App.css';
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
     <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/profile" component={Profile} />

      </Switch>
    </div>
  </Router>;


export default App;

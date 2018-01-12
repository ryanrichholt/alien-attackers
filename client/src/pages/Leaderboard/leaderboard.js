import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import BackGround from "../../components/BackGround";
import API from "../../utils/API";
import './leaderboard.css';
class Leaderboard extends Component {
  state = {
    leaders: [],
  };
  componentDidMount() {
      this.getLeaders();
  }
  getLeaders() {
    API.getLeaders()
    .then( response => {
        this.setState({ leaders: response.data })
      })
      .catch( error => {
          console.log('Error getting profile: ', error)
      })
  }
  render() {
    // ********** The way you did it is totally fine, just wanting to show you the different routes you can go ***********


    // There is no need for this line since we can handle it in the render
    /* const leaderList = this.state.leaders.map((list) =>
    //   <li>{list}</li>
    );*/   
    return (
      <Container fluid>
        <BackGround />
        <center>
          <header id="showcase">
            <h1>Leaderboard</h1>
          </header>

            <table id="highScore" class="highlight-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>

                <tbody>
                    { this.state.leaders.length > 0 &&
                    /*Map over our array */
                    this.state.leaders.map((list, i) => 
                      <tr><td>{list.pilot}</td><td>{list.score}</td></tr>)
                    }
                </tbody>
            </table>
        </center>
      </Container>
    );
  }
}
export default Leaderboard;
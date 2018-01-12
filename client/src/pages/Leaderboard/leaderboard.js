import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import BackGround from "../../components/BackGround";
import API from "../../utils/API";
import './leaderboard.css';

class Leaderboard extends Component {
  state = {
    leaders: null,
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
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <article>
            <h1>Leaderboard</h1>
            <div>{JSON.stringify(this.state.leaders)}</div>
          </article>
            <BackGround />  
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Leaderboard;

import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import BackGround from "../../components/BackGround";
import './leaderboard.css';

class Leaderboard extends Component {
  state = {
    name: [],
    email: "",
    score: "",
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <article>
            <h1>Leaderboard</h1>
          </article>
            <BackGround />  
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Leaderboard;

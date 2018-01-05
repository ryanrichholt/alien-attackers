import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import BackGround from "../../components/BackGround";
import './leaderboard.css';

class Leaderboard extends Component {
  state = {
    name: [],
    email: "",
    score: "",
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, name: "", email: "", score: "" })
      )
      .catch(err => console.log(err));
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

import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Panel from "../../components/ProfPanel";
import ProfileBox from "../../components/UserAuth/ProfileBox"
import RegisterForm from "../../components/UserAuth/RegisterForm"
import './profile.css';

class Profile extends Component {
    state = {
      user: null
    };

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        API.getProfile()
        .then( response => {
            if (response.data.success){
                this.setState({ user: response.data.user })
            } else {
                this.setState({ user: null })
            }
          })
          .catch( error => {
              console.log('Error getting profile: ', error)
          })
    }

// This page should show the profile and allow for edits
    render() { 
      const user = this.state.user

      if (user) {
        return (
          <Container>
            <div>Profile for { user.email }</div>
            <div>Ship name: {user.shipName}</div>
            <ProfileBox/>
          </Container>
        )
      } else {
        return (
          <Container>
            <div>You must be logged in to view/edit profile</div>
            <ProfileBox/>
            <div> Register: </div>
            <RegisterForm/>
          </Container>
        )
      }
    }
}

export default Profile;

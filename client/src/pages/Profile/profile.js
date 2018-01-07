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
          <Container fluid>
            <div className="video-background">
              <div className="video-foreground">
                <iframe src="https://www.youtube.com/embed/y2RVEK8XkFk?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=y2RVEK8XkFk" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
            
            <div className="user-email">Profile for { user.email }</div>
            <div className="user-email">Ship name: {user.shipName}</div>
            <ProfileBox/>
          </Container>
        )
      } else {
        return (
          <Container fluid>
            <div className="video-background">
              <div className="video-foreground">
                <iframe src="https://www.youtube.com/embed/y2RVEK8XkFk?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=y2RVEK8XkFk" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
            <div className="user-email">You must be logged in to view/edit profile</div>
            <ProfileBox/>
            <div className="user-email"> Register: </div>
            <RegisterForm/>
          </Container>
        )
      }
    }
}

export default Profile;
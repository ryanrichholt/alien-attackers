import React, { Component } from "react";
import {Input, FormBtn} from "../Form";
import API from "../../utils/API"

const formStyle = {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    textAlign: 'center',
    left: '0',
    right: '0',
    paddingTop: '30px'
}

const btnStyle = {
    color: 'black',
    backgroundColor: '#ffff00',
    borderColor: 'white',
    fontFamily: 'spacey',
    width: '50%',
    padding: '10px',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0',
    right: '0',
    top: '150px'
}

class RegisterForm extends Component {
    state = {
        email: null,
        pilotName: null,
        password: null,
        passwordAgain: null,
        errors: null,
        success: null,
    }

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    }

    handlePilotNameChange = event => {
        this.setState({pilotName: event.target.value});
    }

    handlePasswordChange = event => {
       this.setState({password: event.target.value});
    }

    handlePasswordAgainChange = event => {
       this.setState({passwordAgain: event.target.value});
    }

    handleRegisterSubmit = (event) => {
        event.preventDefault();

        if(this.state.password !== this.state.passwordAgain){
            this.setState({ errors: 'Passwords must match' })
            return
        }

        let formData = {
            email: this.state.email,
            pilotName: this.state.pilotName,
            password: this.state.password
        }

        API.register(formData)
        .then( response => {
            if (response.data.success){
               this.setState({ success: true })
            } else {
               this.setState({ errors: 'Error from registration server: ' + response.data.message })
            }
        })
        .catch( error => {
            this.setState({ errors: 'Error from registration server: ' + error })
        })
    }

    render() { 
        let error = this.state.errors
        let success = this.state.success

        if (this.state.success){
            return <div>Registration complete!</div>
        } else {
            return (
            <div className="form-inline">
                <div>{error}</div>
                <form style={formStyle}>
                  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="text" id="register-email" placeholder="Email" onChange={this.handleEmailChange}></Input>
                  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="text" id="register-pilot-name" placeholder="Pilot Name" onChange={this.handlePilotNameChange}></Input>
                  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="password" id="register-password" placeholder="Password" onChange={this.handlePasswordChange}></Input>
                  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="password" id="register-password-again" placeholder="Password (again)" onChange={this.handlePasswordAgainChange}></Input>
                  <FormBtn style={btnStyle} type="submit" id="register-submit" onClick={this.handleRegisterSubmit}>Register</FormBtn>
                </form>
            </div>)
        }
    }
}

export default RegisterForm
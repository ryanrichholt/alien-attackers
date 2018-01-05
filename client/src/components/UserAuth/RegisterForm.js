import React, { Component } from "react";
import {Input, FormBtn} from "../Form";
import API from "../../utils/API"

class RegisterForm extends Component {
	state = {
		email: null,
		password: null,
		passwordAgain: null,
		errors: null,
        success: null,
	}

	handleEmailChange = event => {
   		this.setState({email: event.target.value});
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
    	        <form>
    			  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="text" id="register-email" placeholder="Email" onChange={this.handleEmailChange}></Input>
    			  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="password" id="register-password" placeholder="Password" onChange={this.handlePasswordChange}></Input>
    			  <Input className="form-control mb-2 mr-sm-2 mb-sm-0" type="password" id="register-password-again" placeholder="Password (again)" onChange={this.handlePasswordAgainChange}></Input>
    	          <FormBtn type="submit" id="register-submit" onClick={this.handleRegisterSubmit}>Register</FormBtn>
    	        </form>
    		</div>)
        }
	}
}

export default RegisterForm

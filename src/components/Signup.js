// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

import { signup } from '../api'
import MyInput from './MyInput'
import { Button, Form, Segment, Grid, Label, Input, Message } from 'semantic-ui-react'


class Signup extends React.Component {
    
  state: {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: string,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }
  
  handleFirstNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({firstname: event.target.value})
    }
  }

  handleLastNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({lastname: event.target.value})
    }
  }
  
  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, firstname, lastname, password } = this.state
    signup(login, firstname, lastname, password).then(result => {
      console.log("Signup result ", result)
      this.setState({redirectToReferrer: true, error: null})
    }).catch(error => 
      this.setState({error})
    )
  }

  render() {    
    const { redirectToReferrer, error } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to='/login'/>
      )
    }
    
    return (
      <Grid container>
        <Grid.Column>
          <Segment raised>
            <Label as='a' ribbon>Bank of Rapperswil</Label>
            <Form>
              <h2>Registrieren</h2>
              <MyInput fluid onChange={this.handleLoginChanged} label='Login' value={this.state.login} />
              <br />
              <MyInput fluid onChange={this.handleFirstNameChanged} label='Given Name' value={this.state.firstname} />
              <br />
              <MyInput fluid onChange={this.handleLastNameChanged} label='Family Name' value={this.state.lastname} />
              <br />
              <MyInput fluid onChange={this.handlePasswordChanged} label='Password' type="password" value={this.state.password} />
              <br />
              <Button className="primary fluid" onClick={this.handleSubmit}>Create Account</Button>
            </Form>

            <br />
            { error && <Message attached='bottom' error>Es ist ein Fehler aufgetreten!</Message> }
          </Segment>

          <Message attached='bottom' warning>
            Already registered?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Signup

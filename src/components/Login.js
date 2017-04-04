// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input, Segment, Grid, Label, Message } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can 
     redirect after logging in */
  location: {
    state?: {

      from: string,
    }
  }
}

class Login extends React.Component {
  
  props: Props
  
  state: {
    login: string,
    password: string,
    error?: Error,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state
    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
        
    return (
      <Grid container>
        <Grid.Column>
          <Segment raised>
            <Label as='a' ribbon>Bank of Rapperswil</Label>
            <Form>
              <h2>Login</h2>
              <Input fluid onChange={this.handleLoginChanged} label='Login' value={this.state.login} />
              <br/>
              <Input fluid onChange={this.handlePasswordChanged} label='Password' type="password" value={this.state.password} />
              <br/>
              <Button className="primary fluid" onClick={this.handleSubmit}>Log-in</Button>
            </Form>

            <br />
            { error && <Message attached='bottom' error>Es ist ein Fehler aufgetreten!</Message> }
          </Segment>

          <Message attached='bottom' warning>
            Not registered yet?&nbsp;<a href='/signup'>Sign up here</a>&nbsp;instead.
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login

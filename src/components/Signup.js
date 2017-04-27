// @flow

import React from 'react'
import {Redirect} from 'react-router-dom'

import {signup} from '../api'
import FormFieldWithValidation from './FormFieldWithValidation'
import {Button, Form, Segment, Grid, Label, Message, FormField} from 'semantic-ui-react'

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

class Signup extends React.Component {

    props: Props

    state: {
        login: string,
        firstname: string,
        lastname: string,
        password: string,
        passwordConfirmation: string,
        error: string,
        redirectToReferrer: boolean,
    }

    state = {
        login: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordConfirmation: "",
        error: null,
        redirectToReferrer: false,
    }

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value});
        }
    }

    handleFirstNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({firstname: event.target.value})
        }
    }

    handleLastNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({lastname: event.target.value})
        }
    }

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value})
        }
    }

    handlePasswordConfirmationChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({passwordConfirmation: event.target.value})
        }
    }

    unlessErrors = (callback: any) => {
        var hasErrors = false;
        [
            this.refs.login,
            this.refs.firstname,
            this.refs.lastname,
            this.refs.password,
            this.refs.pwconf
        ].forEach(function (field) {
            if (!field.runValidations(field.props.value)) {
                hasErrors = true;
            }
        });
        if (hasErrors !== true) {
            callback();
        }
    }

    handleSubmit = (event: Event) => {
        event.preventDefault()

        const {login, firstname, lastname, password} = this.state
        console.dir(this);
        this.unlessErrors(() => {
            signup(login, firstname, lastname, password).then(result => {
                console.dir(this);
                this.props.authenticate(login, password, (error) => {
                    if (error) {
                        this.setState({error})
                    } else {
                        this.setState({redirectToReferrer: true, error: null})
                    }
                })
            }).catch(error => {
                console.dir(error);
                this.setState({error})
            })
        });
    }

    render() {
        const {redirectToReferrer, error} = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to='/dashboard'/>
            )
        }

        this.loginValidations = {
            presence: true,
            minLength: 3
        }
        this.passwordConfirmationValidations = {
            presence: true,
            equalTo: this.refs.password
        }

        return (
            <Grid container>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' ribbon>Bank of Rapperswil</Label>
                        <Form>
                            <h2>Registrieren</h2>
                            <FormFieldWithValidation fluid onChange={this.handleLoginChanged}
                                                     validations={this.loginValidations} label='Login'
                                                     value={this.state.login} ref="login"/>
                            <FormFieldWithValidation fluid onChange={this.handleFirstNameChanged}
                                                     validations={this.loginValidations} label='Given Name'
                                                     value={this.state.firstname} ref="firstname"/>
                            <FormFieldWithValidation fluid onChange={this.handleLastNameChanged}
                                                     validations={this.loginValidations} label='Family Name'
                                                     value={this.state.lastname} ref="lastname"/>
                            <FormFieldWithValidation fluid onChange={this.handlePasswordChanged}
                                                     validations={this.loginValidations} label='Password'
                                                     type="password" value={this.state.password} ref="password"/>
                            <FormFieldWithValidation fluid onChange={this.handlePasswordConfirmationChanged}
                                                     validations={this.passwordConfirmationValidations}
                                                     label='Password Confirmation' type="password" ref="pwconf"
                                                     value={this.state.passwordConfirmation}/>
                            <FormField>
                                <Button className="primary fluid" onClick={this.handleSubmit}>Create Account</Button>
                            </FormField>
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

// @flow

import React from 'react';
import {Form, FormField, Input, Header, Label, Button} from 'semantic-ui-react';
import {getAccountDetails, transfer, AccountNr, getAccount} from '../api';
import FormFieldWithValidation from './FormFieldWithValidation'

export type Props = {
    token: string,
    handleReloadTransactions: Function,
}

class NewPayment extends React.Component {

    props: Props;

    state = {
        fromAccount: AccountNr,
        fromAccountAmount: Number,
        toAccount: AccountNr,
        toAccountLabel: String,
        toAccountError: Boolean,
        transferAmount: Number,
        transferStatus: String,
        transferStatusError: Boolean,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            fromAccount: '',
            fromAccountAmount: 0,
            toAccount: '',
            toAccountError: false,
            transferAmount: 0,
            transferStatus: '',
            transferStatusError: false,
        };

    }

    componentDidMount() {
        this.handleRefreshAccountDetails();
    }

    handleRefreshAccountDetails = () => {
        getAccountDetails(this.props.token).then(p1 => this.setState({
            fromAccount: p1.accountNr,
            fromAccountAmount: p1.amount
        })).catch();

    };

    handleToChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({toAccount: event.target.value});
        }
    };


    handleAmountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({transferAmount: event.target.value})
        }
    };

    unlessErrors = (callback: any) => {
        let hasErrors = false;
        [
            this.refs.toAccount,
            this.refs.transferAmount
        ].forEach(function (field) {
            if (field.hasError()) {
                hasErrors = true;
            }
        });
        if (hasErrors !== true) {
            callback();
        }
    };


    handleResetAllValidationMessages = () => {
        [
            this.refs.toAccount,
            this.refs.transferAmount
        ].forEach(function (field) {
            field.resetMessage();
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {toAccount, transferAmount} = this.state;

        this.unlessErrors(() => {
            transfer(toAccount, transferAmount, this.props.token).then(p1 => {
                this.setState({
                    toAccount: '',
                    toAccountError: false,
                    transferAmount: '',
                    transferStatus: 'Transfer successful',
                    transferStatusError: false,
                });
                this.props.handleReloadTransactions();
                this.handleRefreshAccountDetails();
                this.handleResetAllValidationMessages();
            }).catch(p1 => {
                this.setState({
                    transferStatus: 'Transfer failed',
                    transferStatusError: true,
                })
            });
        });
    };

    validateExistingAccount = (value: any, callback: Function) => {
        if (value && value.length > 2) {
            getAccount(value, this.props.token).then(p1 => {
                callback(true, false, p1.owner.firstname + ' ' + p1.owner.lastname, 'green');
            }).catch(p1 => {
                callback(true, true, 'Account number does not exist', 'red');
            })
        } else {
            // set as not yet validated
            callback(true, true, 'Account number is required', 'red');
        }
    };

    transferAmountValidations = {
        presence: true,
        greaterOrEqualTo: 0.05
    };

    render() {


        return (
            <Form onSubmit={this.handleSubmit}>
                <Header as='h1'>New Payment</Header>
                <FormField>
                    <Input fluid label='From' placeholder='From' readOnly
                           value={this.state.fromAccount + ' [' + this.state.fromAccountAmount + ']'}/>
                </FormField>
                <FormFieldWithValidation fluid label='To' placeholder='To' icon='user' value={this.state.toAccount}
                                         onChange={this.handleToChanged} validations={this.validateExistingAccount}
                                         token={this.props.token} ref='toAccount'/>
                <FormFieldWithValidation labelPosition={'right'} type={'currency'} fluid placeholder='0.00'
                                         value={this.state.transferAmount} onChange={this.handleAmountChanged}
                                         validations={this.transferAmountValidations} token={this.props.token}
                                         ref='transferAmount'>
                    <Label>Amount</Label>
                    <input />
                    <Label basic>CHF</Label>
                </FormFieldWithValidation>
                <FormField>
                    <Button content={'Pay'} icon={'payment'} primary/>
                    { this.state.transferStatus ? <Label basic pointing='left'
                                                         color={this.state.transferStatusError ? 'red' : 'green'}>{this.state.transferStatus}</Label> : '' }
                </FormField>

            </Form>
        )
    }
}

export default NewPayment
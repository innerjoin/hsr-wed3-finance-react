// @flow

import React from 'react';
import {Form, Header, Input, Label, Button} from 'semantic-ui-react';
import { getAccountDetails, getAccount, transfer, AccountNr } from '../api';

export type Props = {
    token: string,
}

class NewPaymentContainer extends React.Component {

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

    constructor (props: Props){
        super(props);
        this.state = {
            fromAccount: '',
            fromAccountAmount: 0,
            toAccount: '',
            toAccountLabel: '',
            toAccountError: false,
            transferAmount: '',
            transferStatus: '',
            transferStatusError: false,
        };

    }

    componentDidMount() {
        getAccountDetails(this.props.token).then(p1 => this.setState({fromAccount: p1.accountNr, fromAccountAmount: p1.amount})).catch();
    }

    handleToChanged = (event: Event) => {
        if(event.target instanceof HTMLInputElement) {
            this.setState({toAccount: event.target.value})
            if (event.target.value.length > 2){
                getAccount(event.target.value, this.props.token).then(p1 => {
                    this.setState({toAccountError: false, toAccount: p1.accountNr, toAccountLabel: p1.owner.firstname + ' ' + p1.owner.lastname})
                }).catch(p1 => {
                    this.setState({toAccountLabel: 'Account number does not exist', toAccountError: true})
                })
            } else {
                this.setState({toAccountLabel: '', toAccountError: false})
            }

        }
    };


    handleAmountChanged = (event: Event) => {
        if(event.target instanceof HTMLInputElement) {
            this.setState({transferAmount: event.target.value})
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        transfer(this.state.toAccount,this.state.transferAmount,this.props.token).then(p1 => {
            this.setState({
                toAccount: '',
                toAccountError: false,
                toAccountLabel: '',
                transferAmount: '',
                transferStatus: 'Transfer successful',
                transferStatusError: false,
            });
            //TODO: reload the transactions
            setTimeout(() => {location.reload()},2000);
        }).catch(p1 => {
                this.setState({
                    transferStatus: 'Transfer failed',
                    transferStatusError: true,
                })
            })
    };


    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Header as='h1'>New Payment</Header>
                <Form.Field>
                    <Input fluid label='From' placeholder='From' readOnly value={this.state.fromAccount + ' [' + this.state.fromAccountAmount + ']'}/>
                </Form.Field>
                <Form.Field>
                    <Input fluid label={'To'} placeholder='To' icon={'user'} value={this.state.toAccount} onChange={this.handleToChanged}/>
                   { this.state.toAccountLabel? <Label basic pointing color={this.state.toAccountError?'red':'green'}>{this.state.toAccountLabel}</Label> : '' }
                </Form.Field>
                <Form.Field>
                    <Input labelPosition={'right'} type={'currency'} fluid placeholder='00.00' value={this.state.transferAmount} onChange={this.handleAmountChanged}>
                        <Label>Amount</Label>
                        <input />
                        <Label basic>CHF</Label>
                    </Input>
                </Form.Field>
                <Form.Field>
                    <Button content={'Pay'} icon={'payment'} primary />
                    { this.state.transferStatus? <Label basic pointing='left' color={this.state.transferStatusError?'red':'green'}>{this.state.transferStatus}</Label> : '' }
                </Form.Field>
            </Form>
        )
    }
}

export default NewPaymentContainer
// @flow

import React from 'react';
import {Header, Input, Label, Button} from 'semantic-ui-react'

export type Props = {
    token: string,
}

class NewPaymentContainer extends React.Component {

    props: Props

    render() {

        return (
            <div>
                <Header as='h1'>New Payment</Header>
                <Input fluid label='From' placeholder='From' icon={'user'}/>
                <br/>
                <Input fluid label={'To'} placeholder='To' icon={'user'} loading/>
                <br/>
                <Input labelPosition={'right'} type={'currency'} fluid placeholder='00.00'>
                    <Label>Amount</Label>
                    <input />
                    <Label basic>CHF</Label>
                </Input>
                <br/>
                <Button content={'Pay'} icon={'payment'} primary />
            </div>
        )
    }
}

export default NewPaymentContainer
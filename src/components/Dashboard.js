// @flow

import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import NewPaymentContainer from './NewPaymentContainer'
import LatestTransactionListContainer from './LatestTransactionListContainer'

/*
 Use the api functions to call the API server. For example, the transactions
 can be retrieved and stored in the state as follows:

 getTransactions(this.props.token)
 .then(({result: transactions}) =>
 this.setState({transactions})
 )

 import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
 */

export type Props = {
    token: string,
}

class Dashboard extends React.Component {

    props: Props


    handleReloadTransactions = () => {
        this.latestTransactions.updateTransactionData();
    }

    render() {
        return (
            <Grid stackable container columns={2}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Segment>
                            <NewPaymentContainer token={this.props.token} handleReloadTransactions={this.handleReloadTransactions} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <LatestTransactionListContainer token={this.props.token} ref={(latestTransactions) => { this.latestTransactions = latestTransactions; }} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Dashboard

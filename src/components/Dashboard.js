// @flow

import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import NewPaymentContainer from '../containers/NewPaymentContainer'
import LatestTransactionListContainer from '../containers/LatestTransactionListContainer'
import { getTransactions } from '../api';

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

    state = {
        transactions:[],
    }

    updateTransactionData() {
        var now = new Date();
        var priorYear = new Date(now.getUTCFullYear() - 1, now.getUTCMonth());
        getTransactions(this.props.token, priorYear, now, 3, 0).then(
            (data) => {
                this.setState(state => ({transactions: data.result}));
            }
        );
    }

    handleReloadTransactions = () => {
        this.updateTransactionData();
    }

    render() {
        return (
            <Grid container columns={2}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Segment>
                            <NewPaymentContainer token={this.props.token} handleReloadTransactions={this.handleReloadTransactions} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <LatestTransactionListContainer transactions={this.state.transactions} handleReloadTransactions={this.handleReloadTransactions} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Dashboard

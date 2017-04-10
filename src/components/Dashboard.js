// @flow

import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import NewPaymentContainer from '../containers/NewPaymentContainer'
import LatestTransactionListContainer from '../containers/LatestTransactionListContainer'

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

    render() {
        return (
            <Grid container columns={2}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Segment>
                            <NewPaymentContainer />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <LatestTransactionListContainer token={this.props.token} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Dashboard

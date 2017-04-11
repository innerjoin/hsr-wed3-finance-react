// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import TransactionTable from '../components/TransactionTable';

export type Props = {
    transactions: Array,
}

class LatestTransactionListContainer extends React.Component {

    props: Props

    componentDidMount() {
        this.props.handleReloadTransactions();
    }

    render() {

        return (
            <div>
                <Header as='h1'>Latest Transaction</Header>
                <TransactionTable showDate={false} transactions={this.props.transactions} />
                <Link className="ui button primary fluid" to="/transactions">All Transactions</Link>
            </div>
        )
    }
}

export default LatestTransactionListContainer
// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import TransactionTable from '../components/TransactionTable';
import { getTransactions } from '../api';

export type Props = {
    token: string,
}

class LatestTransactionListContainer extends React.Component {

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

    componentDidMount() {
        this.updateTransactionData();
    }

    render() {

        return (
            <div>
                <Header as='h1'>Latest Transaction</Header>
                <TransactionTable showDate={false} transactions={this.state.transactions} />
                <Link className="ui button primary fluid" to="/transactions">All Transactions</Link>
            </div>
        )
    }
}

export default LatestTransactionListContainer
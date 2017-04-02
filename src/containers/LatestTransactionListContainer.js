// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export type Props = {
    token: string,
}

class LatestTransactionListContainer extends React.Component {

    props: Props

    render() {

        return (
            <div>
                <div>Latest Transaction List Container</div>
                <Link className="ui button primary fluid" to="/transactions">All Transactions</Link>
            </div>
        )
    }
}

export default LatestTransactionListContainer
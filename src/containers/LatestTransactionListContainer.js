// @flow

import React, {Component} from 'react';
import {getTransactions} from '../api'

export type Props = {
    token: string,
    fromDate: string,
    toDate: string,
    count: number,
    skip: number,
}


class LatestTransactionListContainer extends React.Component {

    props: Props

    // state = {
    //     token: "test",
    //     fromDate: "2017-01-01",
    //     toDate: "2017-12-31",
    //     count: "3",
    //     skip: "0",
    //     error: null
    // }

    render() {
        // const {token, fromDate, toDate, count, skip} = this.state
        // getTransactions(token, fromDate, toDate, count, skip).then(result => {
        //     console.log("getTransaction result ", result)
        //     //this.setState({redirectToReferrer: true, error: null})
        // }).catch(error =>
        //     this.setState({error})
        // )
        return (
            //getTransactions()
            <div>Latest Transaction List Container</div>
        )
    }
}

export default LatestTransactionListContainer
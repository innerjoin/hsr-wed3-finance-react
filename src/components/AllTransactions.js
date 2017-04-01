// @flow

import React from 'react';
import { Table } from 'semantic-ui-react'

import type { User } from '../api';
import { getTransactions } from '../api';

export type Props = {
  token: string,
  user: User,
}

class AllTransactions extends React.Component {
  
  props: Props

  state = {
    transactions:[],
    total: 0,
    fromDate: "",
    toDate: "",
    count: 10,
    skip: 0
  }

  updateTransactionData() {
    getTransactions(this.props.token, this.state.fromDate, this.state.toDate, this.state.count, this.state.skip).then(
      (data) => {
        console.log("result is: ", data);
        this.setState(state => ({transactions: data.result}));
        this.setState(state => ({total: data.query.resultcount}));
      }
    );
  }

  updateDateRange() {
    var selectedYear = 2017; // TODO dynamic from UI
    var selectedMonth = 0; // TODO dynamic from UI
    this.setState(state => ({fromDate: new Date(selectedYear, selectedMonth, 1).toJSON()}));
    if((selectedMonth + 1) % 12 !== 0) {
      this.setState(state => ({toDate: new Date(selectedYear, selectedMonth + 1, 1).toJSON()}));
    } else {
      this.setState(state => ({toDate: new Date(selectedYear + 1, 0, 1).toJSON()}));
    }
  }

  componentDidMount() {
    this.props = {};
    this.props.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIiwiZmlyc3RuYW1lIjoiQm9iIiwibGFzdG5hbWUiOiJNw7xsbGVyIiwiYWNjb3VudE5yIjoiMTAwMDAwMSIsImlhdCI6MTQ5MTA0MTgwMywiZXhwIjoxNDkxMTI4MjAzLCJhdWQiOiJzZWxmIiwiaXNzIjoiYmFuayJ9.tBlqGGRCEZIvw6XR-sNT5iXIvT6xrsJ4NWMCk_O7Cts";
    this.updateDateRange();
    this.updateTransactionData();
  }
  
  render() {
    var trans = this.state.transactions;
    return (
      <div>
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
              <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
              <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
            trans.map((item, index) => 
              <Table.Row key={index}>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.from}</Table.Cell>
                <Table.Cell>{item.target}</Table.Cell>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>{item.total}</Table.Cell>
              </Table.Row>
            )
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default AllTransactions

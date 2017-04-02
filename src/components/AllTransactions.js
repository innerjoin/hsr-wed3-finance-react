// @flow

import React from 'react';
import { Select, Table } from 'semantic-ui-react'

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
    skip: 0,
    month: new Date().getMonth(),
    months: [...Array(12)].map(function(_, idx) {
      var monthText = ["Jaunary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return {key: idx, value: idx, text: monthText[idx]};
    }),
    year: new Date().getFullYear(),
    years: Array(3).fill(new Date().getFullYear()).map(function(maxYear, idx) {
      var year = maxYear - idx;
      return {key: year, value: year, text: year};
    })
  }

  updateTransactionData() {
    getTransactions(this.props.token, this.state.fromDate, this.state.toDate, this.state.count, this.state.skip).then(
      (data) => {
        this.setState(state => ({transactions: data.result}));
        this.setState(state => ({total: data.query.resultcount}));
      }
    );
  }

  updateDateRange(selectedYear, selectedMonth) {
    this.setState(state => ({fromDate: new Date(selectedYear, selectedMonth, 1).toJSON()}));
    if((selectedMonth + 1) % 12 !== 0) {
      this.setState(state => ({toDate: new Date(selectedYear, selectedMonth + 1, 1).toJSON()}));
    } else {
      this.setState(state => ({toDate: new Date(selectedYear + 1, 0, 1).toJSON()}));
    }
    this.updateTransactionData();
  }

  componentDidMount() {
    this.props = {};
    this.props.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIiwiZmlyc3RuYW1lIjoiQm9iIiwibGFzdG5hbWUiOiJNw7xsbGVyIiwiYWNjb3VudE5yIjoiMTAwMDAwMSIsImlhdCI6MTQ5MTEzMjYzOSwiZXhwIjoxNDkxMjE5MDM5LCJhdWQiOiJzZWxmIiwiaXNzIjoiYmFuayJ9.yXmJS2cC-_XGMRIgSLf9pecjTnZdFVe6nYjQlEsSKcE";
    this.updateDateRange();
  }

  updateMonth(month) {
    this.setState(state => ({month: month}));
    this.updateDateRange(this.state.year, month);
  }

  updateYear(year) {
    this.setState(state => ({year: year}));
    this.updateDateRange(year, this.state.month);
  }
  
  render() {
    return (
      <div>
        <Select value={this.state.month} onChange={(e, data) => this.updateMonth(data.value)} placeholder='Choose Month' options={this.state.months} />
        <Select defaultValue={this.state.year} onChange={(e, data) => this.updateYear(data.value)} placeholder='Choose Year' options={this.state.years} />

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
            this.state.transactions.map((item, index) => 
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

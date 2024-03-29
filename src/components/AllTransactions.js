// @flow

import React from 'react';
import { Grid, Segment, Select } from 'semantic-ui-react'

import TransactionTable from './TransactionTable';
import type { User } from '../api';
import { getTransactions } from '../api';
import moment from 'moment';

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
    count: 999999,
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

  updateTransactionData(cb) {
    getTransactions(this.props.token, this.state.fromDate, this.state.toDate, this.state.count, this.state.skip).then(
      (data) => {
        this.setState(state => ({transactions: data.result, total: data.query.resultcount}));
      }
    );
  }

  updateDateRange(selectedYear, selectedMonth) {
    this.setState(state => ({
      fromDate: new Date(selectedYear, selectedMonth, 1).toJSON(),
      toDate: (selectedMonth + 1) % 12 !== 0 
              ? new Date(selectedYear, selectedMonth + 1, 1).toJSON() 
              : new Date(selectedYear + 1, 0, 1).toJSON()
    }), () => this.updateTransactionData());
  }

  componentDidMount() {
    this.updateDateRange(this.state.year, this.state.month);
  }

  updateMonth(month) {
    this.setState(state => ({month: month}));
    this.updateDateRange(this.state.year, month);
  }

  updateYear(year) {
    this.setState(state => ({year: year}));
    this.updateDateRange(year, this.state.month);
  }

  formatDate(dateString) {
    return moment(dateString).format("DD.MM.YYYY HH:mm");
  }
  
  render() {
    return (
      <Grid container>
        <Grid.Column>
          <Segment raised>
            <Select value={this.state.month} onChange={(e, data) => this.updateMonth(data.value)} placeholder='Choose Month' options={this.state.months} />
            <Select defaultValue={this.state.year} onChange={(e, data) => this.updateYear(data.value)} placeholder='Choose Year' options={this.state.years} />

            <TransactionTable formatDate={this.formatDate} transactions={this.state.transactions} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default AllTransactions

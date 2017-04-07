// @flow

import React from 'react';
import { Table } from 'semantic-ui-react'

export type Props = {
  transactions: Array
}

class TransactionTable extends React.Component {

  props: Props

  formatDate(dateString) {
    var date = new Date(dateString);
    return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
  }
 
  render() {
    return (
        <Table unstackable striped>
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
                {this.props.transactions.map((item, index) => 
                    <Table.Row key={index}>
                        <Table.Cell>{this.formatDate(item.date)}</Table.Cell>
                        <Table.Cell>{item.from}</Table.Cell>
                        <Table.Cell>{item.target}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell>{item.total}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
  }
}

export default TransactionTable

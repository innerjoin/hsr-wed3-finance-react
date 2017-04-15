// @flow

import React from 'react';
import { Table } from 'semantic-ui-react'

function TransactionTable({transactions, formatDate = null}) {

    return (
        <Table unstackable striped>
            <Table.Header>
            <Table.Row>
                {formatDate !== null && <Table.HeaderCell>Date</Table.HeaderCell>}
                <Table.HeaderCell>Source</Table.HeaderCell>
                <Table.HeaderCell>Target</Table.HeaderCell>
                <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {transactions.map((item, index) => 
                    <Table.Row key={index}>
                        {formatDate !== null && <Table.Cell>{formatDate(item.date)}</Table.Cell>}
                        <Table.Cell>{item.from}</Table.Cell>
                        <Table.Cell>{item.target}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell>{item.total}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}

export default TransactionTable

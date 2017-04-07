// @flow

import React from 'react';
import { Table } from 'semantic-ui-react'

function formatDate(dateString) {
    var date = new Date(dateString);
    return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
}

function TransactionTable({transactions, showDate = true}) {

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
                {transactions.map((item, index) => 
                    <Table.Row key={index}>
                        <Table.Cell>{formatDate(item.date)}</Table.Cell>
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

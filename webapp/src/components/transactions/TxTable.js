import { css } from '@emotion/core'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import React from 'react'

const makeDataTestId = (transactionId, fieldName) => (
  `transaction-${transactionId}-${fieldName}`
)

export function TxTable ({ data }) {
  return (
    <div css={styles} >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Description</th>
            <th>Merchant ID</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(({
              id,
              user_id: userId,
              description,
              merchant_id: merchantId,
              debit,
              credit,
              amount
            }) => (
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                <td data-testid={makeDataTestId(id, 'debit')}> {debit ? <div className='tx-type-indicator'>&nbsp;</div> : ''}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{credit ? <div className='tx-type-indicator'>&nbsp;</div> : ''}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>
                  {(amount / 100).toFixed(2)}
                </td>
              </tr>
            )).reverse()
          }
        </tbody>
      </table>
    </div>
  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}

const styles = css`
  table {
    border-collapse: separate;
    border-spacing: .3rem 0;
  }
  th {
    background-color: lightsteelblue;
    padding: .3rem;
    text-align: left;
  }
  thead th:first-of-type {
    border-top-left-radius: .5rem;
  }
  thead th:last-of-type {
    border-top-right-radius: .5rem;
  }
  td {
    padding: .3rem;
    border-color: white;
  }
  .tx-type-indicator {
    background-color: lightsteelblue;
    border-radius: 20px;
    border-width: .5rem;
    margin: auto;
    height: .8rem;
    width: 1rem;
    user-select: none;
  }
  tbody tr {
    transition: background-color 120ms ease-in-out;
  }
  tbody tr:nth-of-type(2n+2) {
    background-color: whitesmoke;
  }
  tbody tr:hover {
    background-color: darkgray;
  }
`

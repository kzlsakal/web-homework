import { css } from '@emotion/core'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const makeDataTestId = (transactionId, fieldName) => (
  `transaction-${transactionId}-${fieldName}`
)

export function TxTable ({ data, editTx }) {
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
        <TransitionGroup component='tbody'>
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
              <CSSTransition classNames='transaction' key={`transaction-${id}`} timeout={500}>
                <tr
                  data-testid={`transaction-${id}`}
                  onClick={() => editTx({
                    id, userId, description, merchantId, debit, credit, amount
                  })}
                >
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
              </CSSTransition>
            )).reverse()
          }
        </TransitionGroup>
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
  })),
  editTx: func
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
    cursor: pointer;
  }
  .transaction-enter {
    opacity: 0;
    color: lightseagreen;
    transform: scale(0);
  }
  .transaction-enter-active {
    opacity: 1;
    color: black;
    transition: opacity 500ms ease-in;
    transition: color 500ms ease-in;
    transition: transform 500ms ease-in;
    transform: scale(1);
  }
`

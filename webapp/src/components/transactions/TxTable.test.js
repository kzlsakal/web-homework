import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { HistoryWrapper } from '../../../mocks/router-history'
import { transactions } from '../../../mocks/transactions-data'
import { TxTable } from './TxTable'

describe('Transactions Table', () => {
  jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ pageNo: 1 })
  }))
  it('should show user "employee4" with amount "150.00"', () => {
    render(<TxTable data={transactions} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f863-amount'))
      .toHaveTextContent('150.00')
  })
  it('should show user "employee5" with description "refund"', () => {
    render(<TxTable data={transactions} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f865-description'))
      .toHaveTextContent('refund')
  })
  it('should show user "employee3" with merchant "target"', () => {
    render(<TxTable data={transactions} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f864-merchant'))
      .toHaveTextContent('target')
  })
  it('should show "credit" indicator for employee3\'s transaction', () => {
    render(<TxTable data={transactions} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f864-debit'))
      .toBeEmpty()
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f864-credit'))
      .toContainHTML('div')
  })
  it('should display Roman Numerals when "Amount" header is clicked', () => {
    render(<TxTable data={transactions} />, { wrapper: HistoryWrapper })
    fireEvent.click(screen.getByTestId('header-amount'), { button: 1 })
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f863-amount'))
      .toHaveTextContent('CL')
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f864-amount'))
      .toHaveTextContent('CCL')
    expect(screen
      .getByTestId('transaction-5d5c1f747e01cd704f18f865-amount'))
      .toHaveTextContent('C')
  })
})

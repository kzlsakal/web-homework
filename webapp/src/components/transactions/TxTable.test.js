import { render, screen } from '@testing-library/react'
import React from 'react'
import { TxTable } from './TxTable'

describe('Transactions Table', () => {
  it('should show user "employee4" with amount "150.00"', () => {
    const mockData = [{
      id: '1',
      userId: 'employee4',
      description: 'test',
      merchantId: 'Google',
      debit: false,
      credit: true,
      amount: 15000
    }]
    render(<TxTable data={mockData} />)
    expect(screen.getByTestId('transaction-1-amount')).toHaveTextContent('150.00')
  })
})

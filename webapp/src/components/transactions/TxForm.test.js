import { render, screen } from '@testing-library/react'
import React from 'react'
import { HistoryWrapper } from '../../../mocks/router-history'
import { transactions } from '../../../mocks/transactions-data'
import { TxForm } from './TxForm'

describe('Transactions Table', () => {
  const inputTemplate = () => ({
    id: '',
    userId: '',
    description: '',
    merchantId: '',
    credit: false,
    debit: false,
    amount: 0
  })

  const emptyFormProps = {
    addTransaction: () => {},
    deleteTransaction: () => {},
    updateTransaction: () => {},
    result: ['', () => {}],
    formInput: [inputTemplate(), () => {}],
    inputTemplate
  }

  const editingFormProps = {
    ...emptyFormProps,
    formInput: [transactions[0], () => {}]
  }

  it('should display the "add new transaction" header when NOT editing', () => {
    render(<TxForm {...emptyFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByRole('heading'))
      .toHaveTextContent('Add')
  })
  it('should display the "editing transaction" header when editing', () => {
    render(<TxForm {...editingFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByRole('heading'))
      .toHaveTextContent('Editing')
  })
  it('should display the ID of the transaction that is being edited', () => {
    render(<TxForm {...editingFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByRole('heading'))
      .toHaveTextContent('5d5c1f747e01cd704f18f863')
  })
  it('should display a form with empty fields', () => {
    render(<TxForm {...emptyFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByPlaceholderText('User ID'))
      .toBeEmpty()
      .toBeRequired()
    expect(screen
      .getByPlaceholderText('Description'))
      .toBeEmpty()
      .toBeRequired()
    expect(screen
      .getByPlaceholderText('Merchant ID'))
      .toBeEmpty()
      .toBeRequired()
    expect(screen
      .getByLabelText('Credit'))
      .toBeEmpty()
      .toBeRequired()
    expect(screen
      .getByLabelText('Debit'))
      .toBeEmpty()
      .toBeRequired()
    expect(screen
      .getByText('Submit'))
      .toBeEnabled()
  })
  it('should properly populate the transaction fields while editing', () => {
    render(<TxForm {...editingFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByTestId('form-tx'))
      .toHaveFormValues({ description: 'cleaningsupplies', txType: 'debit' })
  })
  it('should display a cancel button while editing', () => {
    render(<TxForm {...editingFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByText('Cancel'))
      .toBeEnabled()
  })
  it('should display a delete button while editing', () => {
    render(<TxForm {...editingFormProps} />, { wrapper: HistoryWrapper })
    expect(screen
      .getByText('Delete'))
      .toHaveClass('button-delete')
      .toBeEnabled()
  })
})

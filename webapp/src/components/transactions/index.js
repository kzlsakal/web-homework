
import { useMutation } from '@apollo/client'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import React, { useState } from 'react'
import AddTransaction from '../../gql/addTransaction.gql'
import GetTransactions from '../../gql/transactions.gql'
import { TxForm } from './TxForm'
import { TxTable } from './TxTable'

export function Transactions ({ data }) {
  const inputTemplate = () => ({
    id: '',
    userId: '',
    description: '',
    merchantId: '',
    credit: false,
    debit: false,
    amount: 0
  })

  const addToCache = (cache, { data }) => {
    const { transactions } = cache.readQuery({ query: GetTransactions })
    const newTransaction = data.addTransaction
    cache.writeQuery({
      query: GetTransactions,
      data: { transactions: [...transactions, newTransaction] }
    })
  }

  const [addTransaction] = useMutation(
    AddTransaction,
    { update: addToCache }
  )

  const [editingTx, setEditingTx] = useState(inputTemplate())
  const [userMessage, setUserMessage] = useState('')

  return (
    <>
      <TxForm
        addTransaction={addTransaction}
        formInput={[editingTx, setEditingTx]}
        inputTemplate={inputTemplate}
        result={[userMessage, setUserMessage]}
      />
      <TxTable data={data} />
    </>
  )
}

Transactions.propTypes = {
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

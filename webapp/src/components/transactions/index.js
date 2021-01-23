
import { useMutation } from '@apollo/client'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import React, { useState } from 'react'
import AddTransaction from '../../gql/addTransaction.gql'
import DeleteTransaction from '../../gql/deleteTransaction.gql'
import GetTransactions from '../../gql/transactions.gql'
import UpdateTransaction from '../../gql/updateTransaction.gql'
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

  const editInCache = (cache, { data }) => {
    const { transactions } = cache.readQuery({ query: GetTransactions })
    const { updateTransaction } = data
    const newTransactions = []
    for (let tx of transactions) {
      if (tx.id === updateTransaction.id) {
        newTransactions.push(updateTransaction)
      } else {
        newTransactions.push(tx)
      }
    }

    cache.writeQuery({
      query: GetTransactions,
      data: { transactions: newTransactions }
    })
  }

  const deleteFromCache = (cache, { data }) => {
    const { transactions } = cache.readQuery({ query: GetTransactions })
    const deletedId = data.deleteTransaction.id
    cache.evict({
      fieldName: 'transactions',
      broadcast: false
    })
    cache.writeQuery({
      query: GetTransactions,
      data: { transactions: [...transactions.filter(({ id }) => id !== deletedId)] }
    })
  }

  const [addTransaction] = useMutation(
    AddTransaction,
    { update: addToCache }
  )
  const [updateTransaction] = useMutation(
    UpdateTransaction,
    { update: editInCache }
  )
  const [deleteTransaction] = useMutation(
    DeleteTransaction,
    { update: deleteFromCache }
  )

  const [editingTx, setEditingTx] = useState(inputTemplate())
  const [userMessage, setUserMessage] = useState('')

  return (
    <>
      <TxForm
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        formInput={[editingTx, setEditingTx]}
        inputTemplate={inputTemplate}
        result={[userMessage, setUserMessage]}
        updateTransaction={updateTransaction}
      />
      <TxTable data={data} editTx={setEditingTx} />
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

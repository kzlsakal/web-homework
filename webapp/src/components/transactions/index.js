
import { useMutation } from '@apollo/client'
import { css, Global } from '@emotion/core'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddTransaction from '../../gql/addTransaction.gql'
import DeleteTransaction from '../../gql/deleteTransaction.gql'
import GetTransactions from '../../gql/transactions.gql'
import TransactionsInfo from '../../gql/transactionsInfo.gql'
import UpdateTransaction from '../../gql/updateTransaction.gql'
import { TxForm } from './TxForm'
import { TxTable } from './TxTable'

export function Transactions ({ data, refetch, txInfo }) {
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
    try {
      const queryVariables = { skip: 0, limit: 10 }
      const { transactions } = cache.readQuery({
        query: GetTransactions,
        variables: queryVariables
      })
      const newTransaction = data.addTransaction

      cache.writeQuery({
        query: GetTransactions,
        variables: queryVariables,
        data: { transactions: [newTransaction, ...transactions] }
      })
    } catch {
      refetch()
    }

    const { transactionsInfo } = cache.readQuery({ query: TransactionsInfo })
    cache.writeQuery({
      query: TransactionsInfo,
      data: { transactionsInfo: {
        ...transactionsInfo,
        count: transactionsInfo.count + 1
      } }
    })
  }

  const editInCache = (cache, { data }) => {
    try {
      const queryVariables = { skip: pageNo > 0 ? pageNo - 1 : 0, limit: 10 }
      const { transactions } = cache.readQuery({
        query: GetTransactions,
        variables: queryVariables
      })
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
    } catch {
      refetch()
    }
  }

  const deleteFromCache = (cache, { data }) => {
    try {
      const queryVariables = { skip: pageNo > 0 ? pageNo - 1 : 0, limit: 10 }
      const { transactions } = cache.readQuery({ query: GetTransactions })
      const deletedId = data.deleteTransaction.id
      cache.evict({
        fieldName: 'transactions',
        broadcast: false
      })
      cache.writeQuery({
        query: GetTransactions,
        variables: queryVariables,
        data: { transactions: [...transactions.filter(({ id }) => id !== deletedId)] }
      })
    } catch {
      refetch()
    }

    const { transactionsInfo } = cache.readQuery({ query: TransactionsInfo })
    cache.writeQuery({
      query: TransactionsInfo,
      data: { transactionsInfo: {
        ...transactionsInfo,
        count: transactionsInfo.count - 1
      } }
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
  const { pageNo } = useParams()

  return (
    <>
      <Global styles={css`body { overflow-y: scroll; }`} />
      <TxForm
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        formInput={[editingTx, setEditingTx]}
        inputTemplate={inputTemplate}
        result={[userMessage, setUserMessage]}
        updateTransaction={updateTransaction}
      />
      <TxTable data={data} editTx={setEditingTx} txInfo={txInfo} />
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
  })),
  refetch: func,
  txInfo: shape({ count: number })
}

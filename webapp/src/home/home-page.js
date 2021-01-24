import { useQuery } from '@apollo/client'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Transactions } from '../components/transactions'
import GetTransactions from '../gql/transactions.gql'
import TransactionsInfo from '../gql/transactionsInfo.gql'

export function Home () {
  const { pageNo } = useParams()
  const { infoLoading, infoError, data: infoData = {} } = useQuery(TransactionsInfo)
  const { loading, error, data = {}, refetch } = useQuery(GetTransactions, {
    variables: { skip: pageNo > 0 ? pageNo - 1 : 0, limit: 10 }
  })

  if (loading || infoLoading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error || infoError) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Transactions
        data={data.transactions}
        refetch={refetch}
        txInfo={infoData.transactionsInfo}
      />
    </Fragment>
  )
}

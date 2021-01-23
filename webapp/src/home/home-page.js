import { useQuery } from '@apollo/client'
import React, { Fragment } from 'react'
import { Transactions } from '../components/transactions'
import GetTransactions from '../gql/transactions.gql'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Transactions data={data.transactions} />
    </Fragment>
  )
}

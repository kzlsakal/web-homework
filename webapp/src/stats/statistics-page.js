import { useQuery } from '@apollo/client'
import React, { Fragment } from 'react'
import { Stats } from '../components/stats'
import GetTransactions from '../gql/transactions.gql'

export function Statistics () {
  const { loading, error, data = {} } = useQuery(GetTransactions, {
    variables: { skip: 0, limit: 10000 }
  })

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
      <Stats data={data.transactions} />
    </Fragment>
  )
}

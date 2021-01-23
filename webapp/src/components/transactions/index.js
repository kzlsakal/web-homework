
import { arrayOf, bool, number, shape, string } from 'prop-types'
import React from 'react'
import { TxTable } from './TxTable'

export function Transactions ({ data }) {
  return (
    <>
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

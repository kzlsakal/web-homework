import { css } from '@emotion/core'
import { array, func } from 'prop-types'
import React, { useState } from 'react'

export function TxForm ({
  addTransaction,
  deleteTransaction,
  updateTransaction,
  result,
  formInput,
  inputTemplate
}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const isEditing = editingTx.id
    const handleQuery = editingTx.id ? updateTransaction : addTransaction
    Promise.resolve(setProcessing(true))
      .then(() => setUserMessage('Processing Request'))
      .then(() => handleQuery({ variables: editingTx }))
      .then(() => setEditingTx(inputTemplate()))
      .then(() => setUserMessage(
        isEditing
          ? `Successfully edited transaction ID ${isEditing}`
          : 'Successfully added transaction'
      ))
      .then(() => setProcessing(false))
  }

  const handleDelete = (id) => {
    Promise.resolve(setProcessing(true))
      .then(() => setUserMessage('Processing Request'))
      .then(() => deleteTransaction({ variables: { id } }))
      .then(() => setEditingTx(inputTemplate()))
      .then(() => setUserMessage(`Transaction ${id} deleted`))
      .then(() => setProcessing(false))
  }

  const handleChange = (event) => {
    const newState = { ...editingTx }
    const { name, value } = event.target

    switch (name) {
      case 'txType':
        newState['credit'] = value === 'credit'
        newState['debit'] = value === 'debit'
        break
      case 'amount':
        newState[name] = Math.round(value * 100)
        break
      default:
        newState[name] = value
    }

    setEditingTx(newState)
  }

  const [userMessage, setUserMessage] = result
  const [editingTx, setEditingTx] = formInput
  const [processing, setProcessing] = useState(false)

  return (
    <form css={styles} onSubmit={handleSubmit}>
      <h3>{editingTx.id
        ? `Editing Transaction ID ${editingTx.id}`
        : 'Add new transaction'}
      </h3>
      <input
        name='userId'
        onChange={handleChange}
        placeholder='User ID'
        required
        type='text'
        value={editingTx.userId}
      />
      <input
        name='description'
        onChange={handleChange}
        placeholder='Description'
        required
        type='text'
        value={editingTx.description}
      />
      <input
        name='merchantId'
        onChange={handleChange}
        placeholder='Merchant ID'
        required
        type='text'
        value={editingTx.merchantId}
      />
      <label><input
        checked={editingTx.credit}
        name='txType'
        onChange={handleChange}
        required
        type='radio'
        value='credit'
      /> Credit </label>
      <label><input
        checked={editingTx.debit}
        name='txType'
        onChange={handleChange}
        required
        type='radio'
        value='debit'
      /> Debit </label>
      <input
        max={2e11}
        min='0'
        name='amount'
        onChange={handleChange}
        placeholder='Amount'
        required
        step='0.01'
        type='number'
        value={(editingTx.amount / 100) || ''}
      />
      <p>
        <button disabled={processing} type='submit'> Submit </button>
        <button
          disabled={processing}
          onClick={() => setEditingTx(inputTemplate())}
          type='button'
        >
          {editingTx.id ? 'Cancel' : 'Reset'}
        </button>
        {editingTx.id && (
          <button
            className='button-delete'
            disabled={processing}
            onClick={() => handleDelete(editingTx.id)}
            type='button'
          >
            Delete
          </button>
        )}
        {userMessage}
      </p>
    </form>
  )
}

TxForm.propTypes = {
  addTransaction: func,
  deleteTransaction: func,
  updateTransaction: func,
  result: array,
  formInput: array,
  inputTemplate: func
}

const styles = css`
  button {
    cursor: pointer;
    margin-right: 1rem;
    border-radius: 1rem;
    border-width: .1rem;
    outline: none;
    padding: .2rem 1rem;
  }
  button:hover {
    background-color: lightsteelblue;
  }
  button:active {
    color: snow;
    background-color: steelblue;
  }
  .button-delete {
    background-color: lightcoral;
  }
  .button-delete:hover {
    background-color: indianred;
  }
  .button-delete:active {
    color: snow;
    background-color: firebrick;
  }
  input {
    margin: .2rem;
    border-radius: .5rem;
    border-width: .1rem;
    padding: .2rem .5rem;
  }
  input:required {
    box-shadow:none;
  }
  input:invalid {
    box-shadow:none;
  }
  h3 {
    margin-bottom: .4rem;
  }
  p {
    font-size .8rem;
  }
`

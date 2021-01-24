const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function saveOne (tx) {
  const transaction = await (new TransactionModel(tx)).save()

  return packageModel(transaction)[0] || null
}

async function updateOne (tx) {
  const query = TransactionModel.findOneAndUpdate({ _id: tx.id }, tx)
  const updatedTx = await query.exec()

  return Object.assign(packageModel(updatedTx)[0], tx) || null
}

async function deleteOne (tx) {
  const query = TransactionModel.deleteOne({ _id: tx.id })
  await query.exec()

  return tx
}

module.exports = {
  deleteOne,
  find,
  findOne,
  saveOne,
  updateOne
}

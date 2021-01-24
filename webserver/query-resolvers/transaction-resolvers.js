const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const limit = criteria._limit ?? 10
  delete criteria._limit
  const skip = criteria._skip ?? 0
  delete criteria._skip

  const query =
    TransactionModel
      .find(criteria)
      .sort({ createdAt: -1 })
      .skip(skip * limit)
      .limit(limit)

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

async function totalCount () {
  const query = TransactionModel.countDocuments()
  const count = await query.exec()

  return { count }
}

module.exports = {
  deleteOne,
  find,
  findOne,
  saveOne,
  totalCount,
  updateOne
}

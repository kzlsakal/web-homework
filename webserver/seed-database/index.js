const faker = require('faker')
const mongoose = require('mongoose')
const { TransactionModel } = require('../data-models/Transaction')

const MONGO_URI = 'mongodb://localhost:27017/graphql'
const generateArg = process.argv.slice(2)[0]
let txCount = generateArg ? Number(generateArg.split('=')[1]) : 50

mongoose.connect(process.env.MONGODB_URL || MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const generateTx = () => {
  const isCredit = faker.random.boolean()
  return {
    user_id: users[Math.floor(Math.random() * users.length)],
    amount: faker.random.number(389900) + 10000,
    credit: isCredit,
    debit: !isCredit,
    description: faker.finance.transactionDescription(),
    merchant_id: faker.company.companyName()
  }
}
const users = Array.from({ length: Math.ceil(txCount / 3) }, () => faker.name.lastName())
const transactions = Array.from({ length: txCount }, () => generateTx())

process.stdout.write(`[1/3] Truncating Transactions Collection\n`)
TransactionModel.deleteMany({})
  .then((result) => {
    process.stdout.write(`[2/3] Deleted ${result.deletedCount} Transactions\n`)
    return TransactionModel.insertMany(transactions)
  })
  .then((result) => {
    process.stdout.write(`[3/3] Added ${result.length} Transactions\n`)
    return mongoose.disconnect()
  })
  .then(() => process.exit())
  .catch((err) => { throw err })

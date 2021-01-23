export const getCreditDebitStats = (data) => {
  const [creditData, debitData] = [{ x: 'Credit', y: 0 }, { x: 'Debit', y: 0 }]
  data.forEach(
    ({ credit, debit, amount }) => {
      if (credit) creditData.y += amount
      if (debit) debitData.y += amount
    })
  creditData.y /= 100
  debitData.y /= 100

  return [creditData, debitData]
}

export const getUserExpenseData = (data) => {
  const expensesPerUser = {}
  data.forEach(({ user_id: userId, amount }) => {
    if (!expensesPerUser[userId]) {
      expensesPerUser[userId] = {
        name: userId,
        x: amount / 100,
        y: 1,
        size: 12
      }
    } else {
      expensesPerUser[userId].x += amount / 100
      expensesPerUser[userId].y += 1
    }
  })
  let maxExpense = 1000
  let maxCount = 10
  const result = []
  for (const expense of Object.values(expensesPerUser)) {
    result.push(expense)
    maxExpense = Math.max(maxExpense, expense.x)
    maxCount = Math.max(maxCount, expense.y)
  }
  result.maxExpense = maxExpense
  result.maxCount = maxCount
  return result
}

export const createUserExpenseDataLabel = ({ datum }) =>
  `User ID: ${datum.name}\nExpenses: ${datum.x.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD'
  })}\nCount: ${datum.y}`

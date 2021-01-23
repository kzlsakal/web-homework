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
  `User ID: ${datum.name}\nExpenses: ${convertToCurrency(datum.x)}\nCount: ${datum.y}`

export const convertToCurrency = (num) => num.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'USD'
})

export const convertToCommaSeparated = (num) => num.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const ROMAN_NUMERALS = new Map([
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
])

export const convertToRoman = (num) => {
  num = Math.round(num)
  let result = ''

  for (let [value, symbol] of ROMAN_NUMERALS) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }

  return result
}

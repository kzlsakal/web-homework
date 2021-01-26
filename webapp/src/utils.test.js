import { transactions } from '../mocks/transactions-data'
import {
  convertToCommaSeparated,
  convertToCurrency,
  convertToRoman,
  createUserExpenseDataLabel,
  getCreditDebitStats,
  getUserExpenseData
} from './utils'

describe('getCreditDebitStats()', () => {
  it('should convert data to credit/debit ratio pie chart format', () => {
    const actual = getCreditDebitStats(transactions)
    const expected = [{ x: 'Credit', y: 350.00 }, { x: 'Debit', y: 150.00 }]
    expect(actual).toEqual(expected)
  })
})

describe('getUserExpenseData()', () => {
  it('should convert data to expense per user format', () => {
    const actual = getUserExpenseData(transactions)
    expect(actual[0].name).toBe('employee 4')
    expect(actual[0].x).toBe(150)
    expect(actual[0].y).toBe(1)
    expect(actual[1].name).toBe('employee 3')
    expect(actual[1].x).toBe(250)
    expect(actual[1].y).toBe(1)
    expect(actual[2].name).toBe('employee 5')
    expect(actual[2].x).toBe(100)
    expect(actual[2].y).toBe(1)
  })
})

describe('createUserExpenseDataLabel()', () => {
  it('should convert credit/debit ratio to pie chart format', () => {
    const actual = createUserExpenseDataLabel({ datum: {
      name: 'Bob',
      x: 200,
      y: 2
    } })
    const expected = 'User: Bob\nExpenses: $200.00\nCount: 2'
    expect(actual).toBe(expected)
  })
})

describe('convertToCurrency()', () => {
  it('should convert number to 2 decimals currency format', () => {
    const actual = convertToCurrency(100000.25)
    const expected = '$100,000.25'
    expect(actual).toBe(expected)
  })
  it('should add fixed decimals if an integer is provided', () => {
    const actual = convertToCurrency(100000)
    const expected = '$100,000.00'
    expect(actual).toBe(expected)
  })
  it('should handle $0.00', () => {
    const actual = convertToCurrency(0)
    const expected = '$0.00'
    expect(actual).toBe(expected)
  })
})

describe('convertToCommaSeparated()', () => {
  it('should convert number to 2 decimals comma-separated format', () => {
    const actual = convertToCommaSeparated(100000.25)
    const expected = '100,000.25'
    expect(actual).toBe(expected)
  })
  it('should add fixed decimals if an integer is provided', () => {
    const actual = convertToCommaSeparated(100000)
    const expected = '100,000.00'
    expect(actual).toBe(expected)
  })
  it('should handle 0.00', () => {
    const actual = convertToCommaSeparated(0)
    const expected = '0.00'
    expect(actual).toBe(expected)
  })
})

describe('convertToRoman()', () => {
  it('should handle 0', () => {
    const result = convertToRoman(0)
    expect(result).toBe('')
  })
  it('should convert single-digit numbers to Roman Numerals', () => {
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => convertToRoman(num))
    const expected = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
    expect(result).toEqual(expected)
  })
  it('should handle large numbers', () => {
    const result = [350, 925, 1920, 1645].map((num) => convertToRoman(num))
    const expected = ['CCCL', 'CMXXV', 'MCMXX', 'MDCXLV']
    expect(result).toEqual(expected)
  })

  it('should not produce error for numbers >= 4000', () => {
    const result = convertToRoman(4005)
    expect(result).not.toBeFalsy()
  })
})

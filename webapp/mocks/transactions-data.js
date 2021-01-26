const transactions = [
  {
    'id': '5d5c1f747e01cd704f18f863',
    'user': { id: 'employee4', firstName: 'employee', lastName: '4' },
    'description': 'cleaningsupplies',
    'merchant': { id: 'uber', name: 'uber', description: 'transportation' },
    'debit': true,
    'credit': false,
    'amount': 15000,
    '__typename': 'Transaction'
  },
  {
    'id': '5d5c1f747e01cd704f18f864',
    'user': { id: 'employee3', firstName: 'employee', lastName: '3' },
    'description': 'refund',
    'merchant': { id: 'target', name: 'target', description: 'shopping' },
    'debit': false,
    'credit': true,
    'amount': 25000,
    '__typename': 'Transaction'
  },
  {
    'id': '5d5c1f747e01cd704f18f865',
    'user': { id: 'employee5', firstName: 'employee', lastName: '5' },
    'description': 'refund',
    'merchant': { id: 'walmart', name: 'walmart', description: 'shopping' },
    'debit': false,
    'credit': true,
    'amount': 10000,
    '__typename': 'Transaction'
  }
]

export { transactions }

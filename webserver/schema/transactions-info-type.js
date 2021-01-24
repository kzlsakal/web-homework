const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLInt
} = graphql

const TransactionsInfoType = new GraphQLObjectType({
  name: 'TransactionsInfo',
  fields: () => ({
    count: { type: GraphQLInt }
  })
})

module.exports = TransactionsInfoType

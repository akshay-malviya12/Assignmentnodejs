const { buildSchema } = require("graphql");
const db = require("../../models/db");

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    price: Float!
  }
type Books {
message: String!
  
}
  type Query {
    books: [Book!]!
    book(id: ID!): Book!
  }

  type Mutation {
    createBook(title: String!, author: String!, description: String!, price: Float!): Book!
    updateBook(id: ID!, title: String!, author: String!, description: String!, price: Float!): Book!
    deleteBook(id: ID!):Books!
  }
`);

module.exports = schema;

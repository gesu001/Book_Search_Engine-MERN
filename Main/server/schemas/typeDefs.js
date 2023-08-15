const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    saveBooks: [Book]
  }

  type Book {
    _id: ID
    title: String
    authors: String
    description: String
    image: String
    bookId: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(title: String!, authors: String!, description: String!, image: String!, bookId: String!, link: String): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        bookCount: Int
        saveBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }
    type Book {
        _id: ID!
        title: String
        authors: String
        description: String
        image: String
        bookId: String
        image: String
        link: String

    }

    type Query {
        users: [User]!
        user(_id: String): User
        books: [Book]
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addBook(userId: ID!, title: String!, authors: String!, description: String ): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      saveBooks {
        _id
        title
        authors
        description
        image
        bookId
        link
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        email
        saveBooks {
          _id
          title
          authors
          description
          image
          bookId
          link
        }
    }
  }
`;

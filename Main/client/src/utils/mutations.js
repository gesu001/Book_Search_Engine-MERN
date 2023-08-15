import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
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
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
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
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $authors: String!, $description: String!, $image: String!, $bookId: String!, $link: String) {
    addBook(title: $title, authors: $authors, description: $description, image: $image, bookId: $bookId, link: $link) {
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

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
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
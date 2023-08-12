import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            saveBooks
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
                name
                email
                password
                bookCount
                saveBooks
            }
        }

    }
`;

// export const ADD_BOOK = gql`
//     mutation addBook()    
// `
// ;
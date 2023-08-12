import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($_id: String){
    user(_id: $_id) {
        _id
        username
        email
        bookCount
        saveBooks
    }
}
`;
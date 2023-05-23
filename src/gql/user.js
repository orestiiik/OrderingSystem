import {gql} from '@apollo/client'

export const GET_USERS = gql`
    query Query {
        getUsers {
            id
            data {
                firstName
                lastName
                roles
                username
            }
        }
    }
`

export const GET_USER_BY_ID = gql`
    query Query($id: String!) {
        getUserById(id: $id) {
            id
            data {
                firstName
                lastName
                roles
                username
            }
        }
    }
`

export const GET_USER_FROM_TOKEN = gql`
    query Query($token: String!) {
        getUserFromToken(token: $token) {
            token
            user {
                id
                data {
                    firstName
                    lastName
                    username
                    roles
                }
            }
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($user: inputUser!) {
        updateUser(user: $user)
    }
`;

export const CREATE_USER = gql`
    mutation Mutation($newUser: userData!) {
        createUser(newUser: $newUser) {
            id
            data {
                firstName
                lastName
                roles
                username
            }
        }
    }
`

export const DELETE_USER = gql`
    mutation Mutation($userId: Int!) {
        deleteUser(id: $userId)
    }
`

export const LOGIN_USER = gql`
    mutation Mutation($username: String!, $password: String!) {
        loginUser(input: {password: $password, username: $username}) {
            token
            user {
                id
                data {
                    firstName
                    lastName
                    username
                    roles
                }
            }
        }
    }
`

export const LOGIN_USER_WITH_TOKEN = gql`
    mutation Mutation($token: String!) {
        getUserFromToken(token: $token) {
            token
            user {
                id
                data {
                    firstName
                    lastName
                    username
                    roles
                }
            }
        }
    }
`
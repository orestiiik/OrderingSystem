import {gql} from '@apollo/client'

export const GET_CATEGORIES = gql`
    query Query {
        getCategories {
            id
            data {
                name
                active
            }
        }
    }
`

export const GET_CATEGORY_BY_ID = gql`
    query Query($id: String!, $token: String!) {
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
        getCategoryById(id: $id) {
            id
            data {
                name
                active
            }
        }
    }
`

export const CREATE_CATEGORY = gql`
    mutation Mutation($newCategory: CategoryInput!) {
         createCategory(newCategory: $newCategory) {
             id
             data {
                 name
                 active
             }
         }
    }
`

export const DELETE_CATEGORY = gql`
    mutation Mutation($id: String!) {
        deleteCategory(id: $id)
    }
`

export const UPDATE_CATEGORY = gql`
    mutation Mutation($category: CategoryInputWithId!) {
        updateCategory(category: $category)
    }
`
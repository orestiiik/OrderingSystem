import {gql} from '@apollo/client'

export const GET_INGREDIENTS = gql`
    query Query {
        getIngredients {
            id
            name
            extraPrice
            canBeExtra
        }
    }
`

export const GET_INGREDIENT_BY_ID = gql`
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
        getIngredientById(id: $id) {
            id
            name
            extraPrice
            canBeExtra
        }
    }
`

export const CREATE_INGREDIENT = gql`
    mutation Mutation($ingredient: IngredientInput!) {
         createIngredient(ingredient: $ingredient)
    }
`

export const DELETE_INGREDIENT = gql`
    mutation Mutation($id: String!) {
        deleteIngredient(id: $id)
    }
`

export const UPDATE_INGREDIENT = gql`
    mutation Mutation($ingredient: UpdateIngredientInput!) {
        updateIngredient(ingredient: $ingredient)
    }
`
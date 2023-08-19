import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
    query Query {
        getItems {
            id
            data {
                name
                category {
                    id
                    data {
                        name
                        active
                    }
                }
                ingredients {
                    id
                    name
                    canBeExtra
                    extraPrice
                }
                price
                weight
                liquid
                state
            }
        }
    }
`;

export const GET_ITEM_BY_ID = gql`
    query Query($id: String!) {
        getItemById(id: $id) {
            id
            data {
                name
                category {
                    id
                    data {
                        name
                        active
                    }
                }
                ingredients {
                    id
                    name
                    canBeExtra
                    extraPrice
                }
                price
                weight
                liquid
                state
            }
        }
    }
`;

export const CREATE_ITEM = gql`
    mutation Mutation($newItem: ItemInput!) {
        createItem(newItem: $newItem) {
            id
            data {
                name
                category {
                    id
                    data {
                        name
                        active
                    }
                }
                ingredients {
                    id
                }
                price
                weight
                liquid
                state
            }
        }
    }
`;

export const DELETE_ITEM = gql`
    mutation Mutation($id: String!) {
        deleteItem(id: $id)
    }
`;

export const UPDATE_ITEM = gql`
    mutation Mutation($item: ItemInputWithId!) {
        updateItem(item: $item)
    }
`;

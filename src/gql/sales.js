import { gql } from '@apollo/client';

export const GET_TOTAL_TODAY_SALES= gql`
    query Query {
        getTodaySalesTotal
        getTotalSoldQuantity
        getTodayPriceTotal
        getLastSales {
            totalPrice
            date
        }
    }
`;

export const GET_SALES= gql`
    query Query($active: Boolean!) {
        getSales(active: $active) {
            id
            data {
                timestamp
                address {
                    city
                    street
                    note
                }
                person {
                    fullName
                    telephone
                }
                done
                price
                order {
                    category {
                        id
                        data {
                            name
                        }
                    }
                    items {
                        name
                        quantity
                        price
                        liquid
                        weight
                    }
                }
            }
        }
    }
`;

export const UPDATE_STATUS = gql`
    mutation Mutation($id: String!) {
        updateSaleStatus(id: $id)
    }
`

export const DELETE_SALE = gql`
    mutation Mutation($id: String!) {
        deleteSale(id: $id)
    }
`
import {createApolloClient} from '../config/apolloClient'
import {GET_USER_FROM_TOKEN} from '../gql/user'

export const withAuthentication = (getServerSidePropsFn) => async ctx => {
    const token = ctx.req?.cookies?.userToken
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        }
    }
    const {data} = await createApolloClient(token).query({
        query: GET_USER_FROM_TOKEN,
        variables: {
            token,
        },
    })

    if (!data?.getUserFromToken) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        }
    }

    return getServerSidePropsFn({token})
}
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import { getCookie } from 'cookies-next';

const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: `${process.env.HOSTNAME}/graphql`,
    }),
    cache: new InMemoryCache({
        addTypename: false,
    }),
    headers: {
        Authorization: getCookie('userToken')
    },
    ssrMode: typeof window === 'undefined',
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export function createApolloClient(token) {
    const httpLink = createHttpLink({
        uri: `${process.env.HOSTNAME}/graphql`,
        credentials: 'include',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ?? '',
            },
        };
    });

    const link = authLink.concat(httpLink);

    return new ApolloClient({
        link,
        cache: new InMemoryCache({
            addTypename: false,
        }),
        ssrMode: typeof window === 'undefined',
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        },
    });
}

export default apolloClient


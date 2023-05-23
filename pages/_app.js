import * as React from 'react'
import {useState} from 'react'
import Head from 'next/head'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../src/theme/theme'
import MainLayout from '../src/layouts/MainLayout'
import apolloClient from '../src/config/apolloClient'
import {ApolloProvider} from '@apollo/client'
import UserContext from '../src/context/UserContext'

export default function MyApp(props) {
    const {Component, pageProps} = props
    const [user, setUser] = useState(props.user)

    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <title>Objednávkový systém - MAXIM PIZZA</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <UserContext.Provider value={{user, setUser}}>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </UserContext.Provider>
            </ThemeProvider>
        </ApolloProvider>
    )
}


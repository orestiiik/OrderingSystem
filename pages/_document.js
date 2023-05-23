import * as React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'
import theme from '../src/theme/theme'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="sk">
                <Head>
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

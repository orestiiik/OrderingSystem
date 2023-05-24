const {createServer} = require('https')
const {parse} = require('url')
const next = require('next')
const fs = require('fs')
const httpProxy = require('http-proxy')

const httpsOptions = {
    key: fs.readFileSync('tls/localhost-key.pem'),
    cert: fs.readFileSync('tls/localhost.pem'),
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const dev = process.env.NODE_ENV !== 'production'

const app = next({dev})

const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true)

        if (parsedUrl.path.startsWith('/api')) {
            req.url = req.url.substring(4) // Remove /api from beginning
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Server started on https://localhost:3000')
    })
})

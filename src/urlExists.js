const http = require('http')
const url = require('url')

export const urlExists = Url =>
    new Promise(resolve => {
        const options = {
            method: 'HEAD',
            host: url.parse(Url).host,
            port: 80,
            path: url.parse(Url).pathname,
        }
        const req = http.request(options, r => {
            resolve(r.statusCode === 200)
        })
        req.end()
    })

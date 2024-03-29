require('isomorphic-fetch');

const { required } = require('./util')

class Hokage {
    constructor (baseURL) {
        this.baseURL = baseURL
        this.resetHeaders()
    }

    init (baseURL) {
        this.baseURL = baseURL
    }

    getFullURL (path) {
        return this.baseURL + path
    }

    setHeaders (headers) {
        this.headers = {
            ...this.headers,
            ...headers,
        }
    }

    resetHeaders () {
        this.headers = {
            'content-type': 'application/json'
        }
    }

    makeRequest (method, path, body, headers={}) {
        const options = {
            method,
            headers: {
              ...this.headers,
              ...headers,
            },
        }

        if (body) {
            if (method === 'GET' || method === 'HEAD') {
              path += body
            } else {
              options.body = JSON.stringify(body)
            }
        }

        const req = new Request(this.getFullURL(path), options)
        return req
    }

    async parseResponse (resp) {
        let contentType = resp.headers.get('content-type')
        let body

        if (contentType.includes('json')) {
            // json response
            body = await resp.json()
        } else {
            // non-json response
            body = await resp.text()
        }

        let neatResponse = {
            status: resp.status,
            headers: resp.headers,
            body,
        }
        return neatResponse
    }

    addMethod (opts) {
        const {
            name = required(`'name' is a required field`),
            path = required(`'path' is a required field`),
            method = 'GET',
            headers = {},
        } = opts

        this[name] = async (...args) => {
            let param = ''
            let body = args[0]

            if (args.length > 1) {
                param = args[0]
                body = args[1]
            }

            let req = this.makeRequest(method, path + param, body, headers)
            let resp = this.parseResponse(await fetch(req))
            return resp
        }
    }
}


module.exports = Hokage;

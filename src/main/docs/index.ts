import { badRequest, serverError, unauthorized, notFound } from './components'
import { loginPath } from './paths'
import { accountSchema, errorSchema, loginParamSchema } from './schemas'

export default {
    openapi: '3.0.0',
    info: {
        title: 'Clena Node Api',
        description: 'Api do curso do Mango para realizar enquetes entre programadores',
        version: '1.0.0'
    },
    license: {
        name: "GPL-3.0-or-later",
        url: "https://spdx.org/license/GPL-3.0-or-later.html"
    },
    servers: [{
        url: '/api'
    }],
    tags: [{
        name: 'Login'
    }],
    paths: {
        '/login': loginPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamSchema,
        error: errorSchema
    },
    components: {
        badRequest,
        serverError,
        unauthorized,
        notFound
    }
}
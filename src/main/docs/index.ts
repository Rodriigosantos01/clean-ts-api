import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { loginParamSchema } from './schemas/login-params-schema'

export default {
    openapi: '3.0.0',
    info: {
        title: 'Clena Node Api',
        description: 'Api do curso do Mango para realizar enquetes entre programadores',
        version: '1.0.0'
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
        loginParams: loginParamSchema
    }
}
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'
import { loginPath, signUpPath, surveyPath } from './paths'
import { accountSchema, apiKeySchema, errorSchema, loginParamSchema, signUpParamsParamSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'

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
    tags: [
        {
            name: 'Login',
        },
        {
            name: 'Enquete',
        }
    ],
    paths: {
        '/login': loginPath,
        '/signup': signUpPath,
        '/surveys': surveyPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamSchema,
        signUpParams: signUpParamsParamSchema,
        error: errorSchema,
        surveys: surveysSchema,
        survey: surveySchema,
        surveyAnswer: surveyAnswerSchema
    },
    components: {
        securitySchemes: {
            apiKeyAuth: apiKeySchema
        },
        badRequest,
        serverError,
        unauthorized,
        notFound,
        forbidden
    }
}
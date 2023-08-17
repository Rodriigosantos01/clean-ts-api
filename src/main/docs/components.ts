import { apiKeySchema } from './schemas'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components/'

export default {
    securitySchemes: {
        apiKeyAuth: apiKeySchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
}
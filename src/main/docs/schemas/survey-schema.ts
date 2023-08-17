export const surveySchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        question: {
            type: 'string'
        },
        answer: {
            type: 'array',
            items: {
                $ref: '#/schemas/surveyAnswer'
            }
        },
        data: {
            type: 'string'
        },
    }
}
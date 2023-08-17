export const surveyResultSchema = {
    type: 'object',
    properties: {
        surveyId: {
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
    },
    required: ['surveyId', 'question', 'answer', 'data']
}
export const AddSurveyParamsSchema = {
    type: 'object',
    properties: {       
        question: {
            type: 'string'
        },
        answer: {
            type: 'array',
            items: {
                $ref: '#/schemas/surveyAnswer'
            }
        }
    }
}
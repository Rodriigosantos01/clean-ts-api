export const surveyResultSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        surveyId: {
            type: 'string'
        },
        accountId: {
            type: 'string'
        },
        date: {
            type: 'string'
        }
    }
}
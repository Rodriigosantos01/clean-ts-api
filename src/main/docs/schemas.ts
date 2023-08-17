import { AddSurveyParamsSchema, accountSchema, apiKeySchema, errorSchema, loginParamSchema, saveSurveyParamsSchema, signUpParamsParamSchema, surveyAnswerSchema, surveySchema, surveysSchema, surveyResultSchema } from './schemas/'

export default {
    account: accountSchema,
    loginParams: loginParamSchema,
    signUpParams: signUpParamsParamSchema,
    addSurveyParams: AddSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema
}
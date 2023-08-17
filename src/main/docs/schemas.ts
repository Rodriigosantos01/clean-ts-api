import {
    AddSurveyParamsSchema,
    accountSchema, 
    errorSchema, 
    loginParamSchema, 
    saveSurveyParamsSchema, 
    signUpParamsParamSchema, 
    surveyAnswerSchema, 
    surveySchema, 
    surveysSchema, 
    surveyResultSchema,
    surveyResultAnswerSchema
} from './schemas/'

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
    surveyResult: surveyResultSchema,
    surveyResultAnswer: surveyResultAnswerSchema
}
import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols";
import { MongoHelper } from "../helpers/mongo-helpers";
import { ObjectId } from 'mongodb'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResults')

        const survey = await surveyResultCollection.findOneAndUpdate({ 
            surveyId: new ObjectId(data.surveyId),
            accountId: new ObjectId(data.accountId)
         }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
         }, {
            upsert: true
         }
         )
        return survey && MongoHelper.map(survey)
    }
}
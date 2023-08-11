import { MongoHelper } from "../helpers/mongo-helpers";
import { SurveyModel } from "@/domain/models/survey";
import { AddSurveyModel } from "@/domain/usecases/add-survey";
import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository";

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys ? surveys.map(survey => MongoHelper.map(survey)) : []
  }
}

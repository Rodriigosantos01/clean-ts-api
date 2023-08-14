import { MongoHelper } from "../helpers/mongo-helpers";
import { SurveyModel } from "@/domain/models/survey";
import { AddSurveyModel } from "@/domain/usecases/add-survey";
import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository";
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-surve-by-id-repository";

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
  
  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys ? surveys.map(survey => MongoHelper.map(survey)) : []
  }
  
  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: id })
    return MongoHelper.map(survey)
  }
}

import { DbLoadSurveyResult } from "./db-load-survey-result";
import { SurveyResultModel } from "../save-survey-result/db-save-survey-result-protocols";
import { mockSurveyResultModel } from "@/domain/test";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result/load-survey-result-repository";

describe('DbLoadSurveyResult UseCase', () => {
    test('Should call LoadSurveyResultRepository', async () => {
        class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
            async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
                return Promise.resolve(mockSurveyResultModel())
            }
        }
        
        const loadSurveyResultRpositoryStub = new LoadSurveyResultRepositoryStub()
        const sut = new DbLoadSurveyResult(loadSurveyResultRpositoryStub)
        const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRpositoryStub, 'loadBySurveyId')
        await sut.load('any_survey_id')
        expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
    })
});
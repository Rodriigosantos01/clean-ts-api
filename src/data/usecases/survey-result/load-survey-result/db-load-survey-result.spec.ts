import { DbLoadSurveyResult } from "./db-load-survey-result";
import { SurveyResultModel } from "../save-survey-result/db-save-survey-result-protocols";
import { mockSurveyResultModel } from "@/domain/test";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result/load-survey-result-repository";

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
        async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResultModel())
        }
    }

    return new LoadSurveyResultRepositoryStub()
}

type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRpositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
    const loadSurveyResultRpositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRpositoryStub)

    return {
        sut,
        loadSurveyResultRpositoryStub
    }
}


describe('DbLoadSurveyResult UseCase', () => {
    test('Should call LoadSurveyResultRepository', async () => {

        const { sut, loadSurveyResultRpositoryStub } = makeSut()
        const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRpositoryStub, 'loadBySurveyId')
        await sut.load('any_survey_id')
        expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
    })
});
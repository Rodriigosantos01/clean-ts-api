import { DbLoadSurveyResult } from "./db-load-survey-result";
import { LoadSurveyResultRepository } from "./db-load-survey-result-protocols";
import { mockLoadSurveyResultRepository } from "@/data/test";

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
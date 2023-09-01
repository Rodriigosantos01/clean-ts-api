import { DbLoadSurveyResult } from "./db-load-survey-result";
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from "./db-load-survey-result-protocols";
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from "@/data/test";
import { mockSurveyResultModel, throwError } from "@/domain/test";

type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRpositoryStub: LoadSurveyResultRepository
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
    const loadSurveyResultRpositoryStub = mockLoadSurveyResultRepository()
    const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRpositoryStub, loadSurveyByIdRepositoryStub)

    return {
        sut,
        loadSurveyResultRpositoryStub,
        loadSurveyByIdRepositoryStub
    }
}

describe('DbLoadSurveyResult UseCase', () => {
    test('Should call LoadSurveyResultRepository', async () => {

        const { sut, loadSurveyResultRpositoryStub } = makeSut()
        const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRpositoryStub, 'loadBySurveyId')
        await sut.load('any_survey_id')
        expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRpositoryStub } = makeSut()

        jest.spyOn(loadSurveyResultRpositoryStub, 'loadBySurveyId').mockImplementation(throwError)
        const promise = sut.load('any_survey_id')
        await expect(promise).rejects.toThrow()
    });
    
    test('Should call LoadSurveyByUDRepository if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRpositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
        jest.spyOn(loadSurveyResultRpositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
        const surveyResult = await sut.load('any_survey_id')
        expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
    });
    
    test('Should return surveyResultModel on success', async () => {
        const { sut } = makeSut()

        const surveyResult = await sut.load('any_survey_id')
        expect(surveyResult).toEqual(mockSurveyResultModel())
    });
});
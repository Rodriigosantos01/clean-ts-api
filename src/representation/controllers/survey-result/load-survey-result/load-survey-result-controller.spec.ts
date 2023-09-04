import { forbidden, ok, serverError } from "@/representation/helpers/http/http-helpers";
import { LoadSurveyResultController } from "./load-survey-result-controller";
import { HttpRequest, LoadSurveyById, LoadSurveyResult } from "./load-survey-result-controller-protocols";
import { mockLoadSurveyById, mockLoadSurveyResult } from "@/representation/test";
import { InvalidParamError } from "@/representation/errors";
import { mockSurveyResultModel, throwError } from "@/domain/test";

const makeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_id'
    }
})

type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const loadSurveyResultStub = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        loadSurveyResultStub
    }
}

describe('LoadSurveyResult Controller', () => {
    test('Should call LoadSurveyById with correct value', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(makeRequest())
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
    });
    test('Should return 403 if LoadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    });
    test('Should return 500 if LoadSurveyById throws', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    });
    test('Should call LoadSurveyResult with correct value', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
        await sut.handle(makeRequest())
        expect(loadSpy).toHaveBeenCalledWith('any_id')
    });
    test('Should return 500 if LoadSurveyResult throws', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    });
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeRequest())
        expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
    });
})
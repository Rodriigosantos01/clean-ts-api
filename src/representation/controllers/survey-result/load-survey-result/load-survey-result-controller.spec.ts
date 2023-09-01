import { forbidden, serverError } from "@/representation/helpers/http/http-helpers";
import { LoadSurveyResultController } from "./load-survey-result-controller";
import { HttpRequest, LoadSurveyById } from "./load-survey-result-controller-protocols";
import { mockLoadSurveyById } from "@/representation/test";
import { InvalidParamError } from "@/representation/errors";
import { throwError } from "@/domain/test";

const makeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_id'
    }
})

type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub)
    return {
        sut,
        loadSurveyByIdStub
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
})
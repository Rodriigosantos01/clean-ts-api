import { mockSurveysModels, throwError } from '@/domain/test';
import { LoadSurveys, SurveyModel } from './load-survey-controller-protocols';
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok, serverError } from '@/representation/helpers/http/http-helpers'
import MockDate from 'mockdate'
import { mockLoadSurveys } from '@/representation/test';

type SutTypes = {
    sut: LoadSurveysController
    loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
    const loadSurveysStub = mockLoadSurveys()
    const sut = new LoadSurveysController(loadSurveysStub)

    return {
        sut,
        loadSurveysStub
    }
}

describe('LoadSurveys Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveys', async () => {
        const { sut, loadSurveysStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveysStub, 'load')
        await sut.handle({})
        expect(loadSpy).toHaveBeenCalled()
    });

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(ok(mockSurveysModels()))
    });

    test('Should return 204 if LoadSurveys returns empty', async () => {
        const { sut, loadSurveysStub } = makeSut()
        jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(noContent())
    });

    test('Should return 500 if LoadSurveys throws', async () => {
        const { sut, loadSurveysStub } = makeSut()
        jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    });
});
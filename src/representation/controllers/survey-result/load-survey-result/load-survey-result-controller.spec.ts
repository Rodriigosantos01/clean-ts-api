import { LoadSurveyResultController } from "./load-survey-result-controller";
import { HttpRequest } from "./load-survey-result-controller-protocols";
import { mockLoadSurveyById } from "@/representation/test";

const makeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_id'
    }
})

describe('LoadSurveyResult Controller', () => {
    test('Should call LoadSurveyById with correct value', async () => {
        const loadSurveyByIdStub = mockLoadSurveyById()
        const sut = new LoadSurveyResultController(loadSurveyByIdStub)
        const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(makeRequest())
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
    });
})
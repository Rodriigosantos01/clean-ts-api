import { SaveSurveyResultController } from "./save-survey-result-controller";
import { HttpRequest, LoadSurveyById, SurveyModel } from "./save-survey-result-controller-protocols";

const makeFakeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    }
})

const makeFakeSurvey = (): SurveyModel => ({
    id: 'any_id',
    question: 'any_question',
    answers: [{
        answer: 'any_answer',
        image: 'any_image'
    }],
    date: new Date()
})

const makeLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById(id: string): Promise<SurveyModel> {
            return new Promise(resolve => resolve(makeFakeSurvey()))
        }

    }

    return new LoadSurveyByIdStub()
}

type SutTypes = {
    sut: SaveSurveyResultController,
    loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = makeLoadSurveyById();
    const sut = new SaveSurveyResultController(loadSurveyByIdStub)
    return {
        sut,
        loadSurveyByIdStub
    }
}

describe('SaveSurveyResultController', () => {
    test('Should call LoadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = makeSut();
        const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
        sut.handle(makeFakeRequest())

        expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
    });
});
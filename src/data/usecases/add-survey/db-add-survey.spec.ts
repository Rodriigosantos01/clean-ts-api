import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';


const makaFaleSurveyData = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }]
})

describe('DbaddSurvey Usecase', () => {
    test('Should call AddSurveyRepository with correct values', async () => {
        class AddSurveyRepositoryStub implements AddSurveyRepository {
            async add(surveyData: AddSurveyModel): Promise<void> {
                return new Promise(resolve => resolve())
            }

        }
        
        const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
        const sut = new DbAddSurvey(addSurveyRepositoryStub)
        const surveyData = makaFaleSurveyData()
        await sut.add(surveyData)
        expect(addSpy).toHaveBeenCalledWith(surveyData)
    });
});
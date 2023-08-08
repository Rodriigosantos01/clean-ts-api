import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';


const makaFaleSurveyData = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }]
})


const makeAddSurveyRepository = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add(surveyData: AddSurveyModel): Promise<void> {
            return new Promise(resolve => resolve())
        }

    }
    return new AddSurveyRepositoryStub()
}
interface SutTypes {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
    const addSurveyRepositoryStub = makeAddSurveyRepository()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)

    return {
        sut,
        addSurveyRepositoryStub
    }

}


describe('DbaddSurvey Usecase', () => {
    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()

        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
        const surveyData = makaFaleSurveyData()
        await sut.add(surveyData)
        expect(addSpy).toHaveBeenCalledWith(surveyData)
    });
});
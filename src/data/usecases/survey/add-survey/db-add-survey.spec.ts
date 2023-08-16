import { mockSurveyData, throwError } from '@/domain/test';
import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols';
import MockDate from 'mockdate'
import { mockAddSurveyRepository } from '@/data/test';

type SutTypes = {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
    const addSurveyRepositoryStub = mockAddSurveyRepository()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)

    return {
        sut, 
        addSurveyRepositoryStub
    }

}


describe('DbaddSurvey Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()

        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
        const surveyData = mockSurveyData()
        await sut.add(surveyData)
        expect(addSpy).toHaveBeenCalledWith(surveyData)
    });

    test("Shold throw if AddSurveyRepository throws", async () => {
        const { sut, addSurveyRepositoryStub } =  makeSut()
        jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementation(throwError)
        const promise = sut.add(mockSurveyData())
        await expect(promise).rejects.toThrow()
      });
});
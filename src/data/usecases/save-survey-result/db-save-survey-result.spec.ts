import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepository, SaveSurveyResultModel, SurveyResultModel } from "./db-save-survey-result-protocols";
import MockDate from 'mockdate'

const makeFakeSurveyResultData = (): SurveyResultModel => ({
    id: 'any_id',
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answers: 'any_answer',
    date: new Date()
})

const makaFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), { id: 'any_id' })

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(makaFakeSurveyResult()))
        }

    }
    return new SaveSurveyResultRepositoryStub()
}
type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

    return {
        sut,
        saveSurveyResultRepositoryStub
    }

}


describe('DbSaveSurveyResult Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()

        const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        const surveyResultData = makeFakeSurveyResultData()
        await sut.save(surveyResultData)
        expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
    });
});
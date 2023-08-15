import { SurveyResultMongoRepository } from "./survey-result-mongo-repository";
import { MongoHelper } from "../helpers/mongo-helpers";
import { Collection } from "mongodb";

let surveyCollection: Collection
let surveyResultCollection: Collection
let AccountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<string> => {
    const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
            {
                image: 'any_image',
                answer: 'any_answer'
            },
            {
                answer: 'other_answer'
            }
        ],
        date: new Date()
    })

    return res.insertedId.toHexString()
}

const makeAccount = async (): Promise<string> => {
    const res = await AccountCollection.insertOne({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
    })

    return res.insertedId.toHexString()
}

describe('Survey Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
        surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        await surveyResultCollection.deleteMany({})
        AccountCollection = await MongoHelper.getCollection('account')
        await AccountCollection.deleteMany({})
    })

    describe('save()', () => {
        test('Shold add a survey result if its new', async () => {
            const surveyId = await makeSurvey();
            const accountId = await makeAccount();
            const sut = makeSut()

            const surveyResult = await sut.save({
                surveyId,
                accountId,
                answer: 'any_answer',
                date: new Date()
            })

            expect(surveyResult).toBeTruthy()
            expect(surveyResult.id).toBeTruthy()
            expect(surveyResult.answer).toBe('any_answer')
        })
        
        test('Shold update survey result if its not new', async () => {
            const surveyId = await makeSurvey();
            const accountId = await makeAccount();

            const res = await surveyCollection.insertOne({
                surveyId,
                accountId,
                answer: 'any_answer',
                date: new Date()
            })
            const sut = makeSut()
            const surveyResult = await sut.save({
                surveyId,
                accountId,
                answer: 'other_answer',
                date: new Date()
            })

            expect(surveyResult).toBeTruthy()
            expect(surveyResult.id).toEqual(res.insertedId)
            expect(surveyResult.answer).toBe('other_answer')
        })
    });
});
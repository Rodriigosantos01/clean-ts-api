import { AccountMongoRepository } from "./account-mongo-repository";
import { MongoHelper } from "../helpers/mongo-helpers";
import { Collection } from "mongodb";
import { mockAccountParams } from '@/domain/test'
let accountCollection: Collection

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }
    describe('add()', () => {
        test('Shold return an account on add success', async () => {
            const sut = makeSut()
            const account = await sut.add(mockAccountParams())
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
        })        
    });

    describe('loadByEmail()', () => {
        test('Shold return an account on loadByEmail success', async () => {
            const sut = makeSut()
            await sut.add(mockAccountParams())
            const account = await sut.loadByEmail('any_email@email.com')
    
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
        })
    
        test('Shold return null if loadByEmail fails', async () => {
            const sut = makeSut()
            const account = await sut.loadByEmail('any_email@email.com')
    
            expect(account).toBeFalsy()
        })        
    });

    describe('updateAccessToken()', () => {
        test('Shold update the account accessToken on updateAccessToken success', async () => {
            const sut = makeSut()
    
            const result = await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password'
            });
            const id = result.insertedId;
            const account = await accountCollection.findOne({
                _id: id,
            });
    
            expect(account.accessToken).toBeFalsy()
    
            await sut.updateAccessToken(`${account._id}`, 'any_token')
            const accountLogin = await accountCollection.findOne({
                _id: account._id,
            });
    
            expect(accountLogin).toBeTruthy()
        })        
    });

    describe('loadByToken()', () => {
        test('Shold return an account on loadByToken without role', async () => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                accessToken: 'any_token'
            })
            const account = await sut.loadByToken('any_token')
    
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
        })    
        
        test('Shold return an account on loadByToken with admin role', async () => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin'
            })
            const account = await sut.loadByToken('any_token', 'admin')
    
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
        })

        test('Shold return null on loadByToken with invalid role', async () => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                accessToken: 'any_token'
            })
            const account = await sut.loadByToken('any_token', 'admin')
            expect(account).toBeFalsy()
        })
        
        test('Shold return an account on loadByToken with if user is admin', async () => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@email.com',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin'
            })
            const account = await sut.loadByToken('any_token')
    
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
        })
        
        test('Shold return null if loadByToken fails', async () => {
            const sut = makeSut()
            const account = await sut.loadByToken('any_token')
    
            expect(account).toBeFalsy()
        }) 
    });

});
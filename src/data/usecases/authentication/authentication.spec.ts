import { AuthenticationModel } from "../../../domain/usecases/authentication";
import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email-repository-";
import { AccountModel } from "../add-account/db-add-account-protocols";
import { DbAuthentication } from "./db.authentication";

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
})

const makeFakeAthentication = (): AuthenticationModel => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load(email: string): Promise<AccountModel> {
            const account = makeFakeAccount()
            return new Promise(resolve => resolve(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut= () : SutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    return {
        loadAccountByEmailRepositoryStub,
        sut
    }
}

describe('DbAuthentication usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
        await sut.auth(makeFakeAthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    });
    
    test('Should throw if  LoadAccountByEmailRepository throws', () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAthentication())
        expect(promise).rejects.toThrow()
    });
});
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRpository } from '../../protocols/db/account/load-account-by-token-repository'

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
})

const makeDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async dencrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_value'))
        }

    }

    return new DecrypterStub()
}

const makeLoadAccountByTokenRpository = (): LoadAccountByTokenRpository => {
    class LoadAccountByTokenRpositoryStub implements LoadAccountByTokenRpository {
        async loadByToken(token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }

    }

    return new LoadAccountByTokenRpositoryStub()
}
interface SutTypes {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRpository
}

const makeSut = (): SutTypes => {
    const decrypterStub = makeDecrypter()
    const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRpository()
    const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)

    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub
    }
}

describe('DbLoadAccountByToken Usecase', () => {
    test('Should call Decrypt with correct values', async () => {
        const { sut, decrypterStub } = makeSut()
        const decryptSpy = jest.spyOn(decrypterStub, 'dencrypt')
        await sut.load('any_token', 'any_role')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    });

    test('Should return null if Decrypt return null', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'dencrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const account = await sut.load('any_token', 'any_role')
        expect(account).toBeNull()
    });

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
        await sut.load('any_token', 'any_role')
        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
    });
});
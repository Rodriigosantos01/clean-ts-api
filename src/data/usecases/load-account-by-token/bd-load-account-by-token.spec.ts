import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter, LoadAccountByTokenRpository, LoadAccountByToken, AccountModel } from './db-load-account-by-token-protocols';

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
})

const makeDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt(value: string): Promise<string> {
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
type SutTypes = {
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
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
        await sut.load('any_token', 'any_role')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    });

    test('Should return null if Decrypt return null', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const account = await sut.load('any_token', 'any_role')
        expect(account).toBeNull()
    });

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
        await sut.load('any_token', 'any_role')
        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
    });
    
    test('Should return an account on success', async () => {
        const { sut } = makeSut()

        const account = await sut.load('any_token', 'any_role')
        expect(account).toEqual(makeFakeAccount())
    });
    
    test('Should throw if Decrypter throws', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.load('any_token', 'any_role')
        expect(promise).rejects.toThrow()
    });
    
    test('Should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.load('any_token', 'any_role')
        expect(promise).rejects.toThrow()
    });
});
import { DbAuthentication } from "./db.authentication";
import { AccountModel, LoadAccountByEmailRepository, HashComparer, UpdateAccessTokenRepository, Encrypter } from "./db-authentication-protocols";
import { mockAccountModel, mockFakeAuthentication, throwError } from "@/domain/test";
import { mockEncrypter, mockHashComparer, mockUpdateAccessTokenRepository } from "@/data/test";



const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<AccountModel> {
            const account = mockAccountModel()
            return new Promise(resolve => resolve(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
    sut: DbAuthentication
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    hashComparerStub: HashComparer
    encrypterStub: Encrypter
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const hashComparerStub = mockHashComparer()
    const encrypterStub = mockEncrypter()
    const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)
    return {
        loadAccountByEmailRepositoryStub,
        sut,
        hashComparerStub,
        encrypterStub,
        updateAccessTokenRepositoryStub
    }
}

describe('DbAuthentication usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.auth(mockFakeAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    });

    test('Should throw if LoadAccountByEmailRepository throws', () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementation(throwError)
        const promise = sut.auth(mockFakeAuthentication())
        expect(promise).rejects.toThrow()
    });

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
        const accessToken = await sut.auth(mockFakeAuthentication())
        expect(accessToken).toBeNull()
    });

    test('Should call HashComparer with corretc values', async () => {
        const { sut, hashComparerStub } = makeSut()
        const compareSpy = jest.spyOn(hashComparerStub, 'compare')
        await sut.auth(mockFakeAuthentication())
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
    });

    test('Should throw if  LoadAccountByEmailRepository throws', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockImplementation(throwError)
        const promise = sut.auth(mockFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });

    test('Should return null if HashComparer returns false', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const accessToken = await sut.auth(mockFakeAuthentication())
        expect(accessToken).toBeNull()
    });

    test('Should call Encrypter with correct id', async () => {
        const { sut, encrypterStub } = makeSut()
        const generateSpySpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.auth(mockFakeAuthentication())
        expect(generateSpySpy).toHaveBeenCalledWith('any_id')
    });

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockImplementation(throwError)
        const promise = sut.auth(mockFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });

    test('Should return a token on success', async () => {
        const { sut } = makeSut()

        const accessToken = await sut.auth(mockFakeAuthentication())
        expect(accessToken).toBe('any_token')
    });


    test('Should call UpdateAccessTokenRepository with correct values', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
        await sut.auth(mockFakeAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    });

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut()
        jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementation(throwError)
        const promise = sut.auth(mockFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });
});
import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'


const makeDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async dencrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_value'))
        }

    }

    return new DecrypterStub()
}
interface SutTypes {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
    const decrypterStub = makeDecrypter()
    const sut = new DbLoadAccountByToken(decrypterStub)

    return {
        sut,
        decrypterStub
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
});
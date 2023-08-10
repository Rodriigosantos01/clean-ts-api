import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
    test('Should call Decrypt with correct values', async () => {
        class DecrypterStub implements Decrypter {
            async dencrypt(value: string): Promise<string> {
                return new Promise(resolve => resolve('any_value'))
            }

        }
        const decrypterStub = new DecrypterStub()
        const decryptSpy = jest.spyOn(decrypterStub, 'dencrypt')
        const sut = new DbLoadAccountByToken(decrypterStub)
        await sut.load('any_token')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    });
});
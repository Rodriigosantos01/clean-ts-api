import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken, HttpRequest } from './auth-middleware-protocols'
import { forbidden, ok, serverError } from '@/representation/helpers/http/http-helpers'
import { AccessDeniedError } from '@/representation/errors';
import { throwError } from '@/domain/test';
import { mockLoadAccountByToken } from '../test';

const makeFakeRequest = (): HttpRequest => ({
    headers: {
        'x-access-token': 'any_token'
    }
})

type SutTypes = {
    sut: AuthMiddleware,
    loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
    const loadAccountByTokenStub = mockLoadAccountByToken()
    const sut = new AuthMiddleware(loadAccountByTokenStub, role)

    return {
        sut, loadAccountByTokenStub
    }
}

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in header', async () => {
        const { sut } = makeSut()

        const HttpResponse = await sut.handle({})
        expect(HttpResponse).toEqual(forbidden(new AccessDeniedError()))
    });

    test('Should call LoadAccountByToken with correct accessToken', async () => {
        const role = 'any_role'
        const { sut, loadAccountByTokenStub } = makeSut(role)
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

        await sut.handle(makeFakeRequest())
        expect(loadSpy).toHaveBeenCalledWith('any_token', role)
    });

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const HttpResponse = await sut.handle(makeFakeRequest())
        expect(HttpResponse).toEqual(forbidden(new AccessDeniedError()))
    });

    test('Should return 200 if LoadAccountByToken returns an account', async () => {
        const { sut } = makeSut()
        const HttpResponse = await sut.handle(makeFakeRequest())
        expect(HttpResponse).toEqual(ok({ accountId: 'any_id' }))
    });

    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwError);
        const HttpResponse = await sut.handle(makeFakeRequest())
        expect(HttpResponse).toEqual(serverError(new Error()))
    });
});
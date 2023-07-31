import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email-repository-";
import { AccountModel } from "../add-account/db-add-account-protocols";
import { DbAuthentication } from "./db.authentication";

describe('DbAuthentication usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', () => {
        class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository{
            async load (email: string): Promise<AccountModel> {
                const account: AccountModel = {
                    id: 'any_id',
                    name: 'any_name',
                    email: 'any_email@mail.com',
                    password: 'any_password',
                }
                return new Promise(resolve => resolve(account))
            }
        }
        
        const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
        const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
        sut.auth({
            email: 'any_email@mail.com',
            password: 'any_password'
        })
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    });
});
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { AccountModel, AddAccountParams, LoadAccountByEmailRepository } from "@/data/usecases/account/add-account/db-add-account-protocols";
import { mockAccountModel } from "@/domain/test";
import { LoadAccountByTokenRpository } from "../protocols/db/account/load-account-by-token-repository";
import { UpdateAccessTokenRepository } from "../protocols/db/account/update-access-token-repository";

export const mockAddAccountRepository = (): AddAccountRepository => {
    class addAccountRepositoryStub implements AddAccountRepository {
        async add(accountData: AddAccountParams): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel())
        }
    }

    return new addAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel())
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRpository = (): LoadAccountByTokenRpository => {
    class LoadAccountByTokenRpositoryStub implements LoadAccountByTokenRpository {
        async loadByToken(token: string, role?: string): Promise<AccountModel> {
            return Promise.resolve(mockAccountModel())
        }

    }

    return new LoadAccountByTokenRpositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async updateAccessToken(id: string, token: string): Promise<void> {
            const updaye = mockAccountModel()
            return Promise.resolve()
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}
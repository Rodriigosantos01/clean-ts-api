import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
    constructor(private readonly hahser: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository){}

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
        const hashedPassword = await this.hahser.hash(accountData.password)
        const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword}))
        return account
    }
}
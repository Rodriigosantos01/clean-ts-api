import { AccountModel, AddAccount, AddAccountParams, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
    constructor(private readonly hahser: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository){}

    async add(accountData: AddAccountParams): Promise<AccountModel> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
        if(!account){
            const hashedPassword = await this.hahser.hash(accountData.password)
            const newAccount = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword}))
            return newAccount
        }
        return null
    }
}
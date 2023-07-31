import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
    private readonly hahser: Hasher
    private readonly addAccountRepository: AddAccountRepository

    constructor(hahser: Hasher, addAccountRepository: AddAccountRepository){
        this.hahser = hahser
        this.addAccountRepository = addAccountRepository
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hahser.hash(accountData.password)
        const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword}))
        return account
    }
}
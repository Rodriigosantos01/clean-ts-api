import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
    constructor(private readonly hahser: Hasher, private readonly addAccountRepository: AddAccountRepository){}

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hahser.hash(accountData.password)
        const account = this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword}))
        return account
    }
}
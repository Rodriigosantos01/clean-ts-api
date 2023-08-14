import { Decrypter, LoadAccountByTokenRpository, LoadAccountByToken, AccountModel } from './db-load-account-by-token-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRpository: LoadAccountByTokenRpository
    ){}
    
    async load(accessToken: string, role?: string): Promise<AccountModel> {
        const token = await this.decrypter.decrypt(accessToken)
        if(token){
            const account = await this.loadAccountByTokenRpository.loadByToken(accessToken, role)
            if(account){
                return account
            }
        }
        return null
    }
}
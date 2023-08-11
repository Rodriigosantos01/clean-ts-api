import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { LoadAccountByTokenRpository } from '@/data/protocols/db/account/load-account-by-token-repository';
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { AccountModel } from '@/domain/models/account';

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
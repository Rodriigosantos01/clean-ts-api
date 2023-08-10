import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter';
import { LoadAccountByTokenRpository } from '../../protocols/db/account/load-account-by-token-repository';
import { AccountModel } from '../add-account/db-add-account-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRpository: LoadAccountByTokenRpository
    ){}
    
    async load(accessToken: string, role?: string): Promise<AccountModel> {
        const token = await this.decrypter.dencrypt(accessToken)
        if(token){
            await this.loadAccountByTokenRpository.loadByToken(accessToken, role)
        }
        return null
    }
}
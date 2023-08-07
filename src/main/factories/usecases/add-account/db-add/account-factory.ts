import { DbAddAccount } from "../../../../../data/usecases/add-account/db-add-account";
import { AccountMongoRepository } from "../../../../../infra/db/mongodb/account/account-mongo-repository";
import { BcryptAdapter } from "../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { AddAccount } from "../../../../../domain/usecases/add-account";


export const makeDbAddAccoount = (): AddAccount => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const accountMongoRepository = new AccountMongoRepository();
    new DbAddAccount(bcryptAdapter, accountMongoRepository);
    return new DbAddAccount(bcryptAdapter, accountMongoRepository);
};
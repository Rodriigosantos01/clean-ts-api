import { MongoHelper } from "../helpers/mongo-helpers";
import { AddAccountModel } from "@/domain/usecases/account/add-account";
import { AccountModel } from "@/domain/models/account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository";
import { LoadAccountByTokenRpository } from "@/data/protocols/db/account/load-account-by-token-repository";
import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/update-access-token-repository";

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRpository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");

    const result = await accountCollection.insertOne(accountData);
    const id = result.insertedId;

    const account = await accountCollection.findOne({
      _id: id,
    });

    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.updateOne({
      _id: id
    },
      {
        $set: { "accessToken": token }
      })
  }

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoHelper.map(account);
  }
}

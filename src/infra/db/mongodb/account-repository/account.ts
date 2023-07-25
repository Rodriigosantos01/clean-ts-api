import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helpers";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");

    const result = await accountCollection.insertOne(accountData);
    const id = result.insertedId;

    const account = await accountCollection.findOne({
      _id: id,
    });

    const { _id, name, email, password } = account;

    return {
      id: `${_id}`,
      name,
      email,
      password,
    };
  }
}

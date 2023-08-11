import { AccountModel } from "@/domain/models/account";

export type AddAccountModel = {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(aaccount: AddAccountModel): Promise<AccountModel>;
}

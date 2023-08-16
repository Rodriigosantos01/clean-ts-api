import { AccountModel } from "@/domain/models/account";

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add(aaccount: AddAccountParams): Promise<AccountModel>;
}

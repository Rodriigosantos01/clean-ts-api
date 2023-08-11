import { AccountModel } from "@/domain/models/account";

export interface LoadAccountByTokenRpository {
    loadByToken (token: string, role?: string): Promise<AccountModel>
}
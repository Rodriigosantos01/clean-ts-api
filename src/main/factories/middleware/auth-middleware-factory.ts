import { makeDbLoadAccountByToken } from "../usecases/account/load-account-by-token/db-load-account-by-token-factory";
import { AuthMiddleware } from "@/representation/middlewares/auth-middleware";
import { Middleware } from "@/representation/protocols";

export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
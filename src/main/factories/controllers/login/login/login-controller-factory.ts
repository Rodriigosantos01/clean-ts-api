import { makeLoginValidation } from "./login-validation-factory";
import { makeDbAuthentication } from "@/main/factories/usecases/account/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { Controller } from "@/representation/protocols";
import { LoginController } from "@/representation/controllers/login/login/login-controller";

export const makeLoginController = (): Controller => {
    return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
};

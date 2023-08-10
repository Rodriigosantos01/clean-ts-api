import { makeLoginValidation } from "./login-validation-factory";
import { Controller } from "../../../../../representation/protocols";
import { LoginController } from "../../../../../representation/controllers/login/login/login-controller";
import { makeDbAuthentication } from "../../../usecases/account/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";

export const makeLoginController = (): Controller => {
    return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
};

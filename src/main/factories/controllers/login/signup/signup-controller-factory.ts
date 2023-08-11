import { makeSignUpValidation } from "./signup-validation";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbAddAccoount } from "@/main/factories/usecases/account/add-account/db-add-account-factory";
import { makeDbAuthentication } from "@/main/factories/usecases/account/authentication/db-authentication-factory";
import { SignUpController } from "@/representation/controllers/login/signup/signup-controller";
import { Controller } from "@/representation/protocols";


export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(new SignUpController(makeDbAddAccoount(), makeSignUpValidation(), makeDbAuthentication()));
};

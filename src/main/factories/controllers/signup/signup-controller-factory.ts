import { SignUpController } from "../../../../representation/controllers/signup/signup-controller";
import { Controller } from "../../../../representation/protocols";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";
import { makeDbAddAccoount } from "../../usecases/add-account/db-add/account-factory";
import { makeDbAuthentication } from "../../usecases/auhtneitcation/db-authentication-factory";
import { makeSignUpValidation } from "./signup-validation";


export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(new SignUpController(makeDbAddAccoount(), makeSignUpValidation(), makeDbAuthentication()));
};

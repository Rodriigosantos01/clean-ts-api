import { EmailValidation, ValidationComposite, RequireFieldValidation } from "../../../../representation/helpers/validators";
import { makeLoginValidation } from "./login-validation-factory";
import { Validation } from "../../../../representation/protocols/validation";
import { EmailValidator } from "../../../../representation/protocols/email-validator";

jest.mock("../../../../representation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("LoginValidation Factory", () => {
  test("Should call ValidationComposite with all validatations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];

    for (const field of ["email", "password"]) {
      validations.push(new RequireFieldValidation(field));
    }

    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

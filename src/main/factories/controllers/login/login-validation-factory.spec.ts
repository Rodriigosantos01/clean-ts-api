import { makeLoginValidation } from "./login-validation-factory";
import { Validation } from "../../../../representation/protocols/validation";
import { EmailValidator } from "../../../../validation/protocols/email-validator";
import { EmailValidation, RequireFieldValidation, ValidationComposite } from "../../../../validation/validators";

jest.mock("../../../../validation/validators/validation-composite");

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

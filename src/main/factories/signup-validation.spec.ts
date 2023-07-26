import { makeSignUpValidation } from "./signup-validation";
import { ValidationComposite } from "../../representation/helpers/validators/validation-composite";
import { RequireFieldValidation } from "../../representation/helpers/validators/required-field-validation";
import { Validation } from "../../representation/helpers/validators/validation";
import { CompareFieldValidation } from "../../representation/helpers/validators/compare-field-validation";
import { EmailValidation } from "../../representation/helpers/validators/email-validation";
import { EmailValidator } from "../../representation/protocols/email-validator";

jest.mock("../../representation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validatations", () => {
    makeSignUpValidation();
    const validations: Validation[] = [];

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequireFieldValidation(field));
    }

    validations.push(new CompareFieldValidation("password", "passwordConfirmation"));
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

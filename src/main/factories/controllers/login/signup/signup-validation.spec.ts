import { makeSignUpValidation } from "./signup-validation";
import { EmailValidator } from "@/validation/protocols/email-validator";
import { CompareFieldValidation, EmailValidation, RequireFieldValidation, ValidationComposite } from "@/validation/validators";
import { Validation } from "@/representation/protocols/validation";

jest.mock("@/validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
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

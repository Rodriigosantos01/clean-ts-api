import { EmailValidation, ValidationComposite, RequireFieldValidation, CompareFieldValidation } from "../../../../../validation/validators";
import { Validation } from "../../../../../representation/protocols/validation";
import { EmailValidatorAdapter } from "../../../../../infra/validators/email-validator-adapter";


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequireFieldValidation(field));
  }
  validations.push(new CompareFieldValidation("password", "passwordConfirmation"))
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
 
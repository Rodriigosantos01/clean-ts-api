import { EmailValidation } from "../../../representation/helpers/validators/email-validation";
import { RequireFieldValidation } from "../../../representation/helpers/validators/required-field-validation";
import { Validation } from "../../../representation/helpers/validators/validation";
import { ValidationComposite } from "../../../representation/helpers/validators/validation-composite";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequireFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

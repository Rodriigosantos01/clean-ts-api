import { EmailValidation, ValidationComposite, RequireFieldValidation } from "@/validation/validators";
import { Validation } from "@/representation/protocols/validation";
import { EmailValidatorAdapter } from "@/infra/validators/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequireFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

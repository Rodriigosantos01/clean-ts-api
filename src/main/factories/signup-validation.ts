import { CompareFieldValidation } from "../../representation/helpers/validators/compare-field-validation";
import { RequireFieldValidation } from "../../representation/helpers/validators/required-field-validation";
import { Validation } from "../../representation/helpers/validators/validation";
import { ValidationComposite } from "../../representation/helpers/validators/validation-composite";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequireFieldValidation(field));
  }
  validations.push(new CompareFieldValidation("password", "passwordConfirmation"))
  
  return new ValidationComposite(validations);
};

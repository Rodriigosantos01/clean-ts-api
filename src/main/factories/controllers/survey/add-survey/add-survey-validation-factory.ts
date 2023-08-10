import { ValidationComposite, RequireFieldValidation } from "../../../../../validation/validators";
import { Validation } from "../../../../../representation/protocols/validation";

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["question", "answers"]) {
    validations.push(new RequireFieldValidation(field));
  }
  return new ValidationComposite(validations);
};

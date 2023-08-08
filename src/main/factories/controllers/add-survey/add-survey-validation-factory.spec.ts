import { RequireFieldValidation, ValidationComposite } from "../../../../validation/validators";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";
import { Validation } from "../../../../representation/protocols/validation";

jest.mock("../../../../validation/validators/validation-composite");

describe("AddSurveyValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];

    for (const field of ["question", "answers"]) {
      validations.push(new RequireFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

import { makeSignUpValidation } from "./signup-validation";
import { ValidationComposite } from "../../representation/helpers/validators/validation-composite";
import { RequireFieldValidation } from "../../representation/helpers/validators/required-field-validation";
import { Validation } from "../../representation/helpers/validators/validation";

jest.mock("../../representation/helpers/validators/validation-composite")

describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validatations', () => {
        makeSignUpValidation()
        const validations: Validation[] = []

        for(const field of ["name", "email", "password", "passwordConfirmation"]){
            validations.push(new RequireFieldValidation(field))
        }

        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
});
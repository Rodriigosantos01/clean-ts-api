import { Validation } from "@/representation/protocols";

export const mockValidationSut = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null;
        }
    }

    return new ValidationStub();
};
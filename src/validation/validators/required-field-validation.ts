import { MissingParamError } from "@/representation/errors";
import { Validation } from "@/representation/protocols/validation";

export class RequireFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}


import { ValidationComposite } from "./validation-composite";
import { MissingParamError } from "@/representation/errors";
import { Validation } from "@/representation/protocols/validation";
import { mockValidationSut } from "@/validation/test/mock-validation";

type SutTypes = {
  sut: ValidationComposite;
  validationStubs: Validation[];
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidationSut(), mockValidationSut()];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe("Validation Composite", () => {
  test("Should return an error if any validation fails", () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));

    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new MissingParamError("field"));
  });
  
  test("Should return the first error if more then one validation fails", () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(new Error());
    jest.spyOn(validationStubs[1], "validate").mockReturnValueOnce(new MissingParamError("field"));

    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new Error());
  });
  
  test("Should not return if validation succeeds", () => {
    const { sut } = makeSut();

    const error = sut.validate({ field: "any_value" });
    expect(error).toBeFalsy()
  });
});

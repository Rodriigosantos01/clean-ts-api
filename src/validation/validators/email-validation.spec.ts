import { throwError } from "@/domain/test";
import { EmailValidation } from "./email-validation";
import { InvalidParamError } from "@/representation/errors";
import { EmailValidator } from "@/validation/protocols/email-validator";
import { mockEmailValidator } from "@/validation/test";

type SutTypes = {
  sut: EmailValidation;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator();

  const sut = new EmailValidation("email", emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe("Email Validation", () => {
  test("Should return an error if EmailValidator returns false", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const error = sut.validate({ email: "any_email@email.com" });
    expect(error).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    sut.validate({ email: "any_email@email.com" });
    expect(isValidSpy).toHaveBeenCalledWith("any_email@email.com");
  });

  test("Should throw if email validator throws", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(throwError);

    expect(sut.validate).toThrow();
  });
});

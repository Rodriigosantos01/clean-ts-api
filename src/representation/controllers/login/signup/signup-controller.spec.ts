import { throwError } from "@/domain/test";
import { SignUpController } from "./signup-controller";
import { AddAccount, HttpRequest, Validation, Authentication } from "./signup-controller-protocols";
import { EmailInUseError, MissingParamError, ServerError } from "@/representation/errors";
import { badRequest, forbidden, ok, serverError } from "@/representation/helpers/http/http-helpers";
import { mockAuthentication, mockValidation } from "@/representation/test";
import { mockAddAccount } from "@/representation/test";

const mockRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

type SutTypes = {
  sut: SignUpController;
  addAccountStub: AddAccount;
  validationStub: Validation;
  authenticationStub: Authentication;
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication();
  const addAccountStub = mockAddAccount();
  const validationStub = mockValidation();

  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub);

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  };
};

describe("SignUp Controller", () => {
  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }));
  });
  
  test("Should return 403 if AddAccount returns null", async () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test("Should return 500 if addAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementation(throwError)

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, "add");

    await sut.handle(mockRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = mockRequest();

    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });

  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, "auth");
    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should return 500 ifAuthentication throws", async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, "auth").mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});

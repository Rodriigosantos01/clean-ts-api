import { LoginController } from "./login-controller";
import { MissingParamError } from "@/representation/errors";
import { badRequest, ok, serverError, unauthorized, } from "@/representation/helpers/http/http-helpers";
import { HttpRequest, Authentication, Validation } from "./login-controller-protocols";
import { throwError } from "@/domain/test";
import { mockAuthentication, mockValidation } from "@/representation/test";

const mockRequest = (): HttpRequest => ({
  body: {
    email: "any_email@mail.com",
    password: "any_password",
  },
});

type SutTypes = {
  sut: LoginController;
  authenticationStub: Authentication;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();

  return {
    sut: new LoginController(authenticationStub, validationStub),
    authenticationStub,
    validationStub,
  };
};

describe("Login Controller", () => {
  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, "auth");
    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should return 401 if invalid credentails are provided", async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  test("Should return 500 ifAuthentication throws", async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, "auth").mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 if valid credentials are provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok({ accessToken: "any_token" }));
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
});

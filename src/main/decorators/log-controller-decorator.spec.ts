import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository";
import { ok, serverError } from "@/representation/helpers/http/http-helpers";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/representation/protocols";
import { LogControllerDecorator } from "./log-controller-decorator";
import { mockAccountModel } from "@/domain/test";
import { mockLogErrorRepository } from "@/data/test";

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: "Rodrigo",
        },
      };
      return Promise.resolve(ok(mockAccountModel()))
    }
  }

  return new ControllerStub();
};

const mockRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@email.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const mockServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = "any_stack";
  return serverError(fakeError);
};

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );

  return { sut, controllerStub, logErrorRepositoryStub };
};

describe("LogController Decorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");

    await sut.handle(mockRequest());
    expect(handleSpy).toHaveBeenCalledWith(mockRequest());
  });

  test("Should return the same resulto of the controller", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockAccountModel()));
  });

  test("Should call LogErrorRepository with correct error if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();

    const logSpy = jest.spyOn(logErrorRepositoryStub, "logError");

    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(Promise.resolve(mockServerError()))

    await sut.handle(mockRequest());
    expect(logSpy).toHaveBeenCalledWith("any_stack");
  });
});

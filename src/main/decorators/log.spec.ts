import {
  Controller,
  httpRequest,
  httpResponse,
} from "../../representation/protocols";
import { LogControllerDecorator } from "./log";

describe("LogController Decorator", () => {
  test("Should call controller handle", async () => {
    class ControllerStub implements Controller {
      handle(httpRequest: httpRequest): Promise<httpResponse> {
        const httpResponse: httpResponse = {
          statusCode: 200,
          body: {
            name: "Rodrigo",
          },
        };
        return new Promise((resolve) => resolve(httpResponse));
      }
    }

    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LogControllerDecorator(controllerStub);
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        name: "any_name",
        password: "any_passowrd",
        passwordConfirmation: "any_passowrd",
      },
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  });
});

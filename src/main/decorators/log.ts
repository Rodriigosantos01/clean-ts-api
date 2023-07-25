import {
  Controller,
  httpRequest,
  httpResponse,
} from "../../representation/protocols";

export class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    return httpResponse;
  }
}

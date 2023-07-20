import { MissingParamError } from "../errors/missing-param-error";
import { BadRequest } from "../helpers/http-helpers";
import { httpRequest, httpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return BadRequest(new MissingParamError("name"))
    }

    if (!httpRequest.body.email) {
      return BadRequest(new MissingParamError("email"))
      }
  }
}

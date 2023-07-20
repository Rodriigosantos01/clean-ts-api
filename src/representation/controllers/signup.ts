import { MissingParamError } from "../errors/missing-param-error";
import { BadRequest } from "../helpers/http-helpers";
import { httpRequest, httpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    for(const field of requiredFields){
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field));
      }
    }
  }
}

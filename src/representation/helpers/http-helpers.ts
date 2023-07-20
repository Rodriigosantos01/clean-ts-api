import { httpResponse } from "../protocols/http";

export const BadRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});

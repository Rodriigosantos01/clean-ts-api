import { httpResponse } from "../protocols/http";
import { ServerError } from "../errors";

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): httpResponse => ({
  statusCode: 500,
  body: new ServerError()
});

export const ok = (data: any): httpResponse => ({
  statusCode: 200,
  body: data
});

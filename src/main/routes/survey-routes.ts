import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controller-factory";
import { makeAuthMiddleware } from "../factories/middleware/auth-middleware-factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
};

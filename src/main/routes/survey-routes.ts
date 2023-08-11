import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controller-factory";
import { makeAuthMiddleware } from "../factories/middleware/auth-middleware-factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { makeLoadSurveysController } from "../factories/controllers/survey/load-surveys/load-surveys-controller-factory";
import { adminAuth } from "../middlewares/admin-auth";
import { auth } from "../middlewares/auth";

export default (router: Router): void => {
  
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
};

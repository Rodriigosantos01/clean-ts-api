import { makeSaveSurveyResultController } from "@/main/factories/controllers/survey-result/save-survey-result/save-survey-result.factory";
import { makeLoadSurveyResultController } from "@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory";
import { adaptRoute } from "@/main/adapters/express-router-adapter";
import { auth } from "@/main/middlewares/auth";
import { Router } from "express";

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
};

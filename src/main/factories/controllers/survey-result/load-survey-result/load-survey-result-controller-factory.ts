import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { Controller } from "@/representation/protocols";
import { makeDbLoadSurveyById } from "../../survey/load-survey-by-id/db-load-survey-by-id-factory";
import { LoadSurveyResultController } from "@/representation/controllers/survey-result/load-survey-result/load-survey-result-controller";
import { makeDbLoadSurveysResult } from "@/main/factories/usecases/survey-result/load-survey-result/db-load-surveys-result-factory";

export const makeLoadSurveyResultController = (): Controller => {

    const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveysResult())
    return makeLogControllerDecorator(controller)
};

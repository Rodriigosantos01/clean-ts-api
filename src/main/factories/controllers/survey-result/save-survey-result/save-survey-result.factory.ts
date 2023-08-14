import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { Controller } from "@/representation/protocols";
import { SaveSurveyResultController } from "@/representation/controllers/survey-result/save-survey-result/save-survey-result-controller";
import { makeDbLoadSurveyById } from "../../survey/load-survey-by-id/db-load-survey-by-id-factory";
import { makeDbSaveSurveysResult } from "@/main/factories/usecases/survey-result/save-survey-result/db-save-surveys-result.factory";

export const makeSaveSurveyResultController = (): Controller => {

    const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveysResult())
    return makeLogControllerDecorator(controller)
};

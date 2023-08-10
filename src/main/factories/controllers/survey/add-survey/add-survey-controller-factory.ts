import { Controller } from "../../../../../representation/protocols";
import { AddSurveyController } from "../../../../../representation/controllers/survey/add-survey/add-survey-controller";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";
import { makeDbAddSurvey } from "../../../usecases/survey/add-survey/db-add-survey-factory";

export const makeAddSurveyController = (): Controller => {
    const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
    return makeLogControllerDecorator(controller)
};

import { Controller } from "../../../../../representation/protocols";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { LoadSurveysController } from "../../../../../representation/controllers/survey/load-surveys/load-surveys-controller";
import { makeDbLoadurveys } from "../../../usecases/survey/load-surveys/db-load-surveys";

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadurveys())
    return makeLogControllerDecorator(controller)
};

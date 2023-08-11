import { makeDbLoadurveys } from "@/main/factories/usecases/survey/load-surveys/db-load-surveys";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { Controller } from "@/representation/protocols";
import { LoadSurveysController } from "@/representation/controllers/survey/load-surveys/load-surveys-controller";

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadurveys())
    return makeLogControllerDecorator(controller)
};

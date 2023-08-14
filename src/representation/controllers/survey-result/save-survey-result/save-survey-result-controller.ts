import { forbidden } from "@/representation/helpers/http/http-helpers";
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from "./save-survey-result-controller-protocols";
import { InvalidParamError } from "@/representation/errors";

export class SaveSurveyResultController implements Controller {
    constructor(private readonly loadSurveyById: LoadSurveyById){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)

        if(!survey) {
            return forbidden(new InvalidParamError('surveyId'))
        }
        return null
    }

}
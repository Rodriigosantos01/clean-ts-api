import { forbidden, ok, serverError } from "@/representation/helpers/http/http-helpers";
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from "./save-survey-result-controller-protocols";
import { InvalidParamError } from "@/representation/errors";

export class SaveSurveyResultController implements Controller {
    constructor(
        private readonly loadSurveyById: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const { answer } = httpRequest.body
            const { accountId } = httpRequest
            const survey = await this.loadSurveyById.loadById(surveyId)

            if (survey) {
                const anewars = survey.answers.map(a => a.answer)
                if (!anewars.includes(answer)) {
                    console.log("forbidden1");
                    return forbidden(new InvalidParamError('answer'))
                    
                }
            } else {
                console.log("forbidden2");
                return forbidden(new InvalidParamError('surveyId'))
            }

            const surveyResult = await this.saveSurveyResult.save({
                accountId,
                surveyId,
                answer,
                date: new Date()
            })

            return ok(surveyResult)
        } catch (error) {
            return serverError(error)
        }
    }

}
import { forbidden, serverError } from "@/representation/helpers/http/http-helpers";
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from "./save-survey-result-controller-protocols";
import { InvalidParamError } from "@/representation/errors";

export class SaveSurveyResultController implements Controller {
    constructor(private readonly loadSurveyById: LoadSurveyById){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const { answer } = httpRequest.body
            const survey = await this.loadSurveyById.loadById(surveyId)
    
            if(survey) {
                const anewars = survey.answers.map(a => a.answer)
                if(!anewars.includes(answer)){
                    return forbidden(new InvalidParamError('answer'))   
                }
            } else {
                return forbidden(new InvalidParamError('surveyId'))                
            }
            return null
        } catch (error) {
            return serverError(error)
        }
    }

}
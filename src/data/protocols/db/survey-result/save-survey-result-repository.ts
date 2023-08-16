import { SurveyResultModel } from "@/domain/models/survey-result";
import { SaveSurveyResultParams } from "@/domain/usecases/survey-results/save-survey-result";

export interface SaveSurveyResultRepository {
    save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}
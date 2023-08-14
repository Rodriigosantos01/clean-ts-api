import { SurveyResultModel } from "@/domain/models/survey-result";
import { SaveSurveyResultModel } from "@/domain/usecases/survey-results/save-survey-result";

export interface SaveSurveyResultRepository {
    save (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}
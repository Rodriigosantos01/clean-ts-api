import { SaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel } from "./db-save-survey-result-protocols";

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor(
        private readonly saveSurveyResultoRepository: SaveSurveyResultRepository
    ) { }

    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        await this.saveSurveyResultoRepository.save(data)
        return null
    }

}
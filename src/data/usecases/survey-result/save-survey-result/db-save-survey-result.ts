import { SaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel, LoadSurveyResultRepository } from "./db-save-survey-result-protocols";

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor(
        private readonly saveSurveyResultoRepository: SaveSurveyResultRepository,
        private readonly loadSurveyResultoRepository: LoadSurveyResultRepository
    ) { }

    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        await this.saveSurveyResultoRepository.save(data)
        const resultSurvey = await this.loadSurveyResultoRepository.loadBySurveyId(data.surveyId)
        return resultSurvey
    }

}
import { LoadSurveysRepository, SurveyModel, LoadSurveys } from "./db-load-surveys-protocols"
export class DbLoadSurveys implements LoadSurveys {
    constructor(
        private readonly loadSurveyRepository: LoadSurveysRepository
    ) { }

    async load(): Promise<SurveyModel[]> {
        const surveys = await this.loadSurveyRepository.loadAll()
        return surveys
    }

}
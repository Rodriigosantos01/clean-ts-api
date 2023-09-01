import { SaveSurveyResult, SaveSurveyResultParams } from "@/domain/usecases/survey-results/save-survey-result"
import { SurveyResultModel } from "@/domain/models/survey-result"
import { mockSurveyResultModel } from "@/domain/test"
import { LoadSurveyResult } from "@/domain/usecases/survey-results/load-survey-result"

export const mockSaveSruveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResultModel())
        }


    }

    return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
    class LoadSurveyResultStub implements LoadSurveyResult {
        load(surveyId: string): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResultModel())
        }

    }

    return new LoadSurveyResultStub()
}
import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository"
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-surve-by-id-repository"
import { AddSurveyParams } from "@/domain/usecases/survey/add-survey"
import { SurveyModel } from "@/domain/models/survey"
import { mockSurveyModel, mockSurveysModels } from "@/domain/test"
import { LoadSurveysRepository } from "../protocols/db/survey/load-survey-repository"

export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add(surveyData: AddSurveyParams): Promise<void> {
            return Promise.resolve()
        }

    }
    return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById(id: string): Promise<SurveyModel> {
            return Promise.resolve(mockSurveyModel())
        }

    }

    return new LoadSurveyByIdRepositoryStub()
}



export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll(): Promise<SurveyModel[]> {
            return Promise.resolve(mockSurveysModels())
        }

    }

    return new LoadSurveysRepositoryStub()
}
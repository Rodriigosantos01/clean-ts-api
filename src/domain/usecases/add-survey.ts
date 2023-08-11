import { SurveyAnswerModel } from "../models/survey";

export interface AddSurveyModel {
  question: string;
<<<<<<< HEAD
  answers: SurveyAnswer[];
  date: Date
}

export interface SurveyAnswer {
  image?: string;
  answer: string;
=======
  answers: SurveyAnswerModel[];
  date: Date
>>>>>>> feat/list-surveys
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}

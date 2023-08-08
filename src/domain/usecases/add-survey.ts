export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswer[];
}

export interface SurveyAnswer {
  image: string;
  answer: string;
}

export interface AddSurvey {
  add(aaccount: AddSurveyModel): Promise<void>;
}

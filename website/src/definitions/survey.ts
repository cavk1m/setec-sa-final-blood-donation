// ─── Survey ───────────────────────────────────────────────────────────────────

export interface SurveyQuestion {
  id: string;
  question: string;
}

// GET /api/survey/questions
export interface GetSurveyQuestionsResponse {
  questions: SurveyQuestion[];
}

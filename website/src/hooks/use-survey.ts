import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetSurveyQuestionsResponse } from "@/definitions/survey";
import { getSurveyQuestions } from "@/services/survey";
import { useAuthStore } from "./zustand/use-auth-store";

// GET /api/survey/questions
export const useGetSurveyQuestions = (): UseQueryResult<
  GetSurveyQuestionsResponse,
  Error
> => {
  const user = useAuthStore((s) => s.user);
  const token = user?.token;

  return useQuery({
    queryKey: ["survey-questions", token],
    queryFn: () => getSurveyQuestions(token),
  });
};

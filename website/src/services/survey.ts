import { surveyEndpoint } from "@/constants/endpoint";
import { GetSurveyQuestionsResponse } from "@/definitions/survey";
import { axiosInstance } from "@/lib/axios-instance";

export const getSurveyQuestions =
  async (): Promise<GetSurveyQuestionsResponse> => {
    try {
      const response = await axiosInstance.get<GetSurveyQuestionsResponse>(
        `${surveyEndpoint}questions`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching survey questions:", error);
      throw error;
    }
  };

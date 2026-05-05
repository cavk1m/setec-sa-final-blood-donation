import { surveyEndpoint } from "@/constants/endpoint";
import { GetSurveyQuestionsResponse } from "@/definitions/survey";
import { axiosInstance } from "@/lib/axios-instance";

export const getSurveyQuestions = async (
  token?: string,
): Promise<GetSurveyQuestionsResponse> => {
  try {
    const response = await axiosInstance.get<GetSurveyQuestionsResponse>(
      `${surveyEndpoint.slice(0, -1)}/questions`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );
    return response.data;
    } catch (error) {
      console.error("Error fetching survey questions:", error);
      throw error;
    }
  };

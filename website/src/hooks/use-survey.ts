// import { useQuery, UseQueryResult } from "@tanstack/react-query";

// import { GetSurveyQuestionsResponse } from "@/definitions/survey";
// import { axiosInstance } from "@/lib/axios-instance";
// import { surveyEndpoint } from "@/constants/endpoint";

// export const useGetSurveyQuestions = (): UseQueryResult<
//   GetSurveyQuestionsResponse,
//   Error
// > => {
//   return useQuery({
//     queryKey: ["survey-questions"],
//     queryFn: async () => {
//       const response = await axiosInstance.get<GetSurveyQuestionsResponse>(
//         `${surveyEndpoint}questions`,
//       );
//       return response.data;
//     },
//   });
// };

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetSurveyQuestionsResponse } from "@/definitions/survey";
import { mockSurveyData } from "@/services/mock-data";

export const useGetSurveyQuestions = (): UseQueryResult<
  GetSurveyQuestionsResponse,
  Error
> => {
  return useQuery({
    queryKey: ["survey-questions"],
    queryFn: async () => {
      // Return mock data immediately (simulates API delay with timeout)
      return new Promise<GetSurveyQuestionsResponse>((resolve) => {
        setTimeout(() => resolve(mockSurveyData), 500);
      });
    },
  });
};

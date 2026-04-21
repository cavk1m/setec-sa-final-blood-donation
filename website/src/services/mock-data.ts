import { GetSurveyQuestionsResponse } from "@/definitions/survey";
import {
  DonationRegisterResponse,
  GetMyQueueResponse,
} from "@/definitions/donation";

// Mock survey questions
export const mockSurveyData: GetSurveyQuestionsResponse = {
  questions: [
    { id: "q1-uuid", question: "Have you donated blood in the last 3 months?" },
    { id: "q2-uuid", question: "Are you currently taking any medication?" },
    { id: "q3-uuid", question: "Do you weigh at least 45kg?" },
  ],
};

// Mock donation register response
export const mockDonationRegisterResponse: DonationRegisterResponse = {
  message: "Registered successfully. A confirmation email has been sent.",
  queue: {
    id: "queue-uuid-5678",
    queue_number: 21,
    status: "waiting",
    survey_score: 3,
    location: {
      id: "loc-uuid-1234",
      name: "City Blood Center",
      address: "123 Main St, Phnom Penh",
    },
    created_at: "2026-03-13T09:30:00Z",
  },
};

// Mock get my queue response
export const mockGetMyQueueResponse: GetMyQueueResponse = {
  queue: {
    id: "queue-uuid-5678",
    queue_number: 21,
    status: "waiting",
    survey_score: 3,
    location: {
      id: "loc-uuid-1234",
      name: "City Blood Center",
      address: "123 Main St, Phnom Penh",
    },
    created_at: "2026-03-13T09:30:00Z",
  },
};

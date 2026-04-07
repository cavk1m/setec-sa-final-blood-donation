// components/donor-registration/types.ts

// ─── API shapes ───────────────────────────────────────────────────────────────

/** GET /questions response */
export interface ApiQuestion {
  id: string;
  question: string;
}

export interface QuestionsResponse {
  questions: ApiQuestion[];
}

/** POST /register request */
export interface RegisterRequest {
  location_id: string;
  answers: {
    question_id: string;
    answer: "yes" | "no";
  }[];
}

/** POST /register 201 response */
export interface RegisterResponse {
  message: string;
  queue: {
    id: string;
    queue_number: number;
    status: string;
    location: {
      id: string;
      name: string;
      address: string;
    };
    created_at: string;
  };
}

// ─── Internal form data ───────────────────────────────────────────────────────

export interface DonorFormData {
  // Step 1 — Personal
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // Step 2 — Donation details
  bloodType: string;
  dob: string;
  location_id: string;
  visitDate: string;
  // Step 2 — Dynamic health answers: keyed by question id
  answers: Record<string, "yes" | "no">;
}

import {
  ApiQuestion,
  DonorFormData,
  RegisterRequest,
  RegisterResponse,
} from "@/definitions/register";

export const INITIAL_FORM_DATA: DonorFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  bloodType: "Unknown",
  dob: "",
  location_id: "loc-uuid-1234",
  visitDate: "",
  answers: {},
};

// ─── Static constants ─────────────────────────────────────────────────────────

export const BLOOD_TYPES = [
  "Unknown",
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

export const DONATION_CENTERS: { id: string; name: string; address: string }[] =
  [
    {
      id: "loc-uuid-1234",
      name: "City Blood Center",
      address: "123 Main St, Phnom Penh",
    },
    {
      id: "loc-uuid-5678",
      name: "Riverside Aid Center",
      address: "45 River Rd, Phnom Penh",
    },
    {
      id: "loc-uuid-9012",
      name: "HopeFlow Mobile Unit 1",
      address: "78 Park Ave, Phnom Penh",
    },
    {
      id: "loc-uuid-3456",
      name: "Eastside Community Clinic",
      address: "22 East Blvd, Phnom Penh",
    },
  ];

export const REGISTRATION_STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Donation & Health" },
  { id: 3, label: "Confirmation" },
] as const;

// Shared Tailwind input class
export const INPUT_CLS =
  "w-full px-4 py-3 bg-[#f7f2f8] border border-transparent rounded-xl text-sm text-[#1c1b1f] placeholder:text-[#8c7070]/70 focus-visible:ring-2 focus-visible:ring-[#670017] focus-visible:border-[#670017] transition-all font-sans h-auto";

// ─── Mock API helpers ─────────────────────────────────────────────────────────

/** Simulates GET /questions */
export async function fetchQuestions(): Promise<ApiQuestion[]> {
  await new Promise((r) => setTimeout(r, 600)); // fake network delay
  return [
    { id: "q1-uuid", question: "Have you donated blood in the last 3 months?" },
    { id: "q2-uuid", question: "Are you currently taking any medication?" },
    { id: "q3-uuid", question: "Do you weigh at least 45kg?" },
  ];
}

/** Simulates POST /register → 201 */
export async function submitRegistration(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  await new Promise((r) => setTimeout(r, 1000)); // fake network delay

  const center =
    DONATION_CENTERS.find((c) => c.id === payload.location_id) ??
    DONATION_CENTERS[0];

  return {
    message: "Registered successfully. A confirmation email has been sent.",
    queue: {
      id: "queue-uuid-5678",
      queue_number: 21,
      status: "waiting",
      location: {
        id: center.id,
        name: center.name,
        address: center.address,
      },
      created_at: new Date().toISOString(),
    },
  };
}

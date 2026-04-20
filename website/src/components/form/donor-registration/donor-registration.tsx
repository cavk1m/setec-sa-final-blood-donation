// // components/donor-registration/DonorRegistrationPage.tsx
// "use client";

// import {
//   DonorFormData,
//   INITIAL_FORM_DATA,
//   convertBloodTypeToApi,
// } from "@/definitions/register";
// import { useState } from "react";
// import { StepIndicator } from "../stepIndicator";
// import { Step1PersonalInfo } from "../steps/step-one-personalInfo";
// import { Step2DonationHealth } from "../steps/step-two-donation-health";
// import { Step3Confirmation } from "../steps/step-three-confirmation";
// import { StepOtpVerification } from "../steps/step-otp-verification";
// import { FormNav } from "../form-nav";
// import { InfoBento } from "../Info-bento";
// import { useRegister } from "@/hooks/use-auth";
// import { RegisterRequest } from "@/definitions/auth";

// // Mock registration response (temporary - will be replaced with real donation API)
// interface MockRegistrationResponse {
//   message: string;
//   queue: {
//     id: string;
//     queue_number: number;
//     status: string;
//     location: {
//       id: string;
//       name: string;
//       address: string;
//     };
//     created_at: string;
//   };
// }

// export function DonorRegistrationPage() {
//   const [step, setStep] = useState(1);
//   const [data, setData] = useState<DonorFormData>(INITIAL_FORM_DATA);
//   const [result, setResult] = useState<MockRegistrationResponse | null>(null);
//   const [otpError, setOtpError] = useState<string | null>(null);

//   // Use auth register hook for user registration
//   const {
//     mutate: registerUser,
//     isPending: submitting,
//     error: registerError,
//   } = useRegister();

//   const onChange = (key: keyof DonorFormData, value: any) =>
//     setData((prev) => ({ ...prev, [key]: value }));

//   const goBack = () => setStep((s) => Math.max(s - 1, 1));
//   const onReset = () => {
//     setData(INITIAL_FORM_DATA);
//     setResult(null);
//     setStep(1);
//     setOtpError(null);
//   };

//   /** Step 1 → 2: register user via auth API (include all personal info) */
//   const handleStep1Submit = async () => {
//     try {
//       // Prepare registration data for auth API
//       const registerPayload: RegisterRequest = {
//         full_name: `${data.firstName} ${data.lastName}`,
//         email: data.email,
//         phone: data.phone,
//         address: data.address || "Phnom Penh",
//         date_of_birth: data.dob,
//         password: data.password || "",
//         blood_type: convertBloodTypeToApi(data.bloodType) as
//           | "A_POSITIVE"
//           | "A_NEGATIVE"
//           | "B_POSITIVE"
//           | "B_NEGATIVE"
//           | "AB_POSITIVE"
//           | "AB_NEGATIVE"
//           | "O_POSITIVE"
//           | "O_NEGATIVE",
//       };

//       // Call the auth register API
//       registerUser(registerPayload, {
//         onSuccess: (response) => {
//           // Go to OTP verification step
//           setStep(2);
//         },
//       });
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };

//   /** Step 2 → 3: OTP verified, move to health questions */
//   const handleOtpVerified = () => {
//     setStep(3);
//   };

//   /** Step 3 → 4: Health answers collected, show confirmation */
//   const handleStep3Submit = () => {
//     // Mock the donation queue response (will be replaced with real donation API later)
//     const mockResponse: MockRegistrationResponse = {
//       message: "Registration successful! Added to queue.",
//       queue: {
//         id: "queue-" + Date.now(),
//         queue_number: Math.floor(Math.random() * 100) + 1,
//         status: "waiting",
//         location: {
//           id: data.location_id,
//           name: "Blood Donation Center", // Static for now
//           address: "123 Main Street",
//         },
//         created_at: new Date().toISOString(),
//       },
//     };
//     setResult(mockResponse);
//     setStep(4);
//   };

//   const handleNext =
//     step === 1 ? handleStep1Submit : step === 3 ? handleStep3Submit : () => {};

//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
//       {/* Page heading — hidden on step 4 */}
//       {step < 4 && (
//         <div className="text-center mb-10 max-w-2xl mx-auto">
//           <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#670017] mb-3 tracking-tight">
//             Register as a Blood Donor
//           </h1>
//           <p className="text-[#584141] text-base leading-relaxed font-sans">
//             Your contribution is a lifeline. Complete the steps below to join
//             our community of life-savers.
//           </p>
//         </div>
//       )}

//       <div className="max-w-2xl mx-auto">
//         {/* ── Main card ── */}
//         <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(88,65,65,0.10)] border border-[#e0bfbf]/20 overflow-hidden">
//           <div className="p-7 sm:p-10">
//             {/* Stepper */}
//             <StepIndicator current={step} />

//             {/* Step content */}
//             {step === 1 && (
//               <Step1PersonalInfo data={data} onChange={onChange} />
//             )}
//             {step === 2 && (
//               <StepOtpVerification
//                 email={data.email}
//                 onOtpVerified={handleOtpVerified}
//                 onError={setOtpError}
//               />
//             )}
//             {step === 3 && (
//               <Step2DonationHealth data={data} onChange={onChange} />
//             )}
//             {step === 4 && result && (
//               <Step3Confirmation result={result} onReset={onReset} />
//             )}

//             {/* API submit error */}
//             {registerError && (
//               <p className="mt-4 text-sm text-red-600 text-center font-sans">
//                 {registerError.message ||
//                   "Registration failed. Please try again."}
//               </p>
//             )}

//             {otpError && (
//               <p className="mt-4 text-sm text-red-600 text-center font-sans">
//                 {otpError}
//               </p>
//             )}

//             {/* Nav — steps 1 & 3 only */}
//             {(step === 1 || step === 3) && (
//               <FormNav
//                 step={step}
//                 submitting={submitting}
//                 onNext={handleNext}
//                 onBack={goBack}
//               />
//             )}
//           </div>
//         </div>

//         {/* Info bento — steps 1, 2 & 3 only */}
//         {step < 4 && <InfoBento />}
//       </div>
//     </div>
//   );
// }

// export default DonorRegistrationPage;

// components/donor-registration/DonorRegistrationPage.tsx
"use client";

import {
  DonorFormData,
  INITIAL_FORM_DATA,
  convertBloodTypeToApi,
} from "@/definitions/register";
import { useState } from "react";
import { StepIndicator } from "../stepIndicator";
import { Step1PersonalInfo } from "../steps/step-one-personalInfo";
import { Step2DonationHealth } from "../steps/step-two-donation-health";
import { Step3Confirmation } from "../steps/step-three-confirmation";
import { StepOtpVerification } from "../steps/step-otp-verification";
import { StepLogin } from "../steps/step-login";
import { FormNav } from "../form-nav";
import { InfoBento } from "../Info-bento";
import { useRegister } from "@/hooks/use-auth";
import { RegisterRequest } from "@/definitions/auth";
import { getUserInfo } from "@/hooks/zustand/use-auth-store";

// Temporary mock shape — replace with real donation queue API response
interface MockQueueResponse {
  message: string;
  queue: {
    id: string;
    queue_number: number;
    status: string;
    location: { id: string; name: string; address: string };
    created_at: string;
  };
}

/**
 * mode = "register" → full 4-step flow
 *   1 Personal Info → 2 OTP → 3 Donation/Health → 4 Confirmation
 *
 * mode = "login" → login form, then skips to step 3
 *   Login → 3 Donation/Health → 4 Confirmation
 *
 * NOTE: RegisterResponse has NO token ({ userId, email, message }).
 *       Token is only available after login (LoginResponse).
 *       Step 3's API call therefore only has a token when the
 *       user came via the login flow, not registration.
 *       Swap the mock in handleStep3Submit once the real API is ready.
 */
export function DonorRegistrationPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<DonorFormData>(INITIAL_FORM_DATA);
  const [result, setResult] = useState<MockQueueResponse | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const {
    mutate: registerUser,
    isPending: submitting,
    error: registerError,
  } = useRegister();

  const onChange = (key: keyof DonorFormData, value: any) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onReset = () => {
    setData(INITIAL_FORM_DATA);
    setResult(null);
    setStep(1);
    setOtpError(null);
    setMode("register");
  };

  // ─── Register flow ──────────────────────────────────────────────────────────

  const handleStep1Submit = () => {
    const payload: RegisterRequest = {
      full_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      address: data.address || "Phnom Penh",
      date_of_birth: data.dob,
      password: data.password || "",
      blood_type: convertBloodTypeToApi(
        data.bloodType,
      ) as RegisterRequest["blood_type"],
    };

    registerUser(payload, {
      // RegisterResponse: { userId, email, message } — no token
      // Token will only exist after the user logs in separately
      onSuccess: () => setStep(2),
    });
  };

  /** OTP verified → proceed to health/donation step */
  const handleOtpVerified = () => setStep(3);

  // ─── Login flow ─────────────────────────────────────────────────────────────

  /** Login success (token saved in store by StepLogin) → skip to step 3 */
  const handleLoginSuccess = () => {
    setMode("register"); // restore register mode so stepper renders
    setStep(3);
  };

  // ─── Step 3 → 4 (shared) ────────────────────────────────────────────────────

  const handleStep3Submit = () => {
    // Always fetch the user token before protected API calls
    const user = getUserInfo();
    // Then pass user.token in headers to the API function
    // e.g. await joinQueue({ location_id: data.location_id }, `Bearer ${user?.token}`)
    //
    // user is null when coming from the register flow (no token yet).
    // Replace the mock below with the real donation queue API call.

    const mockResponse: MockQueueResponse = {
      message: "Registration successful! Added to queue.",
      queue: {
        id: "queue-" + Date.now(),
        queue_number: Math.floor(Math.random() * 100) + 1,
        status: "waiting",
        location: {
          id: data.location_id,
          name: "Blood Donation Center",
          address: "123 Main Street",
        },
        created_at: new Date().toISOString(),
      },
    };

    setResult(mockResponse);
    setStep(4);
  };

  const handleNext =
    step === 1 ? handleStep1Submit : step === 3 ? handleStep3Submit : () => {};

  const isLoginMode = mode === "login";
  const showHeading = !isLoginMode && step < 4;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
      {showHeading && (
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#670017] mb-3 tracking-tight">
            Register as a Blood Donor
          </h1>
          <p className="text-[#584141] text-base leading-relaxed font-sans">
            Your contribution is a lifeline. Complete the steps below to join
            our community of life-savers.
          </p>
        </div>
      )}

      {isLoginMode && (
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#670017] mb-3 tracking-tight">
            Sign In to Donate
          </h1>
          <p className="text-[#584141] text-base leading-relaxed font-sans">
            Already a registered donor? Sign in to join the queue.
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(88,65,65,0.10)] border border-[#e0bfbf]/20 overflow-hidden">
          <div className="p-7 sm:p-10">
            {/* Stepper — register mode, steps 1–3 */}
            {!isLoginMode && step < 4 && <StepIndicator current={step} />}

            {isLoginMode && (
              <StepLogin
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={() => setMode("register")}
              />
            )}

            {!isLoginMode && step === 1 && (
              <>
                <Step1PersonalInfo data={data} onChange={onChange} />
                <p className="mt-5 text-sm text-center text-[#584141] font-sans">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#670017] font-bold hover:underline underline-offset-2"
                  >
                    Sign in instead
                  </button>
                </p>
              </>
            )}

            {!isLoginMode && step === 2 && (
              <StepOtpVerification
                email={data.email}
                onOtpVerified={handleOtpVerified}
                onError={setOtpError}
              />
            )}

            {!isLoginMode && step === 3 && (
              <Step2DonationHealth data={data} onChange={onChange} />
            )}

            {!isLoginMode && step === 4 && result && (
              <Step3Confirmation result={result} onReset={onReset} />
            )}

            {registerError && (
              <p className="mt-4 text-sm text-red-600 text-center font-sans">
                {registerError.message ||
                  "Registration failed. Please try again."}
              </p>
            )}

            {otpError && (
              <p className="mt-4 text-sm text-red-600 text-center font-sans">
                {otpError}
              </p>
            )}

            {!isLoginMode && (step === 1 || step === 3) && (
              <FormNav
                step={step}
                submitting={submitting}
                onNext={handleNext}
                onBack={goBack}
              />
            )}
          </div>
        </div>

        {(isLoginMode || step < 4) && <InfoBento />}
      </div>
    </div>
  );
}

export default DonorRegistrationPage;

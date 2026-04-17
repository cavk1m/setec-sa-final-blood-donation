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
import { FormNav } from "../form-nav";
import { InfoBento } from "../Info-bento";
import { useRegister } from "@/hooks/use-auth";
import { RegisterRequest } from "@/definitions/auth";

// Mock registration response (temporary - will be replaced with real donation API)
interface MockRegistrationResponse {
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

export function DonorRegistrationPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<DonorFormData>(INITIAL_FORM_DATA);
  const [result, setResult] = useState<MockRegistrationResponse | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Use auth register hook for user registration
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
  };

  /** Step 1 → 2: register user via auth API (include all personal info) */
  const handleStep1Submit = async () => {
    try {
      // Prepare registration data for auth API
      const registerPayload: RegisterRequest = {
        full_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address || "Phnom Penh",
        date_of_birth: data.dob,
        password: data.password || "",
        blood_type: convertBloodTypeToApi(data.bloodType) as
          | "A_POSITIVE"
          | "A_NEGATIVE"
          | "B_POSITIVE"
          | "B_NEGATIVE"
          | "AB_POSITIVE"
          | "AB_NEGATIVE"
          | "O_POSITIVE"
          | "O_NEGATIVE",
      };

      // Call the auth register API
      registerUser(registerPayload, {
        onSuccess: (response) => {
          // Go to OTP verification step
          setStep(2);
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  /** Step 2 → 3: OTP verified, move to health questions */
  const handleOtpVerified = () => {
    setStep(3);
  };

  /** Step 3 → 4: Health answers collected, show confirmation */
  const handleStep3Submit = () => {
    // Mock the donation queue response (will be replaced with real donation API later)
    const mockResponse: MockRegistrationResponse = {
      message: "Registration successful! Added to queue.",
      queue: {
        id: "queue-" + Date.now(),
        queue_number: Math.floor(Math.random() * 100) + 1,
        status: "waiting",
        location: {
          id: data.location_id,
          name: "Blood Donation Center", // Static for now
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

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
      {/* Page heading — hidden on step 4 */}
      {step < 4 && (
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

      <div className="max-w-2xl mx-auto">
        {/* ── Main card ── */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(88,65,65,0.10)] border border-[#e0bfbf]/20 overflow-hidden">
          <div className="p-7 sm:p-10">
            {/* Stepper */}
            <StepIndicator current={step} />

            {/* Step content */}
            {step === 1 && (
              <Step1PersonalInfo data={data} onChange={onChange} />
            )}
            {step === 2 && (
              <StepOtpVerification
                email={data.email}
                onOtpVerified={handleOtpVerified}
                onError={setOtpError}
              />
            )}
            {step === 3 && (
              <Step2DonationHealth data={data} onChange={onChange} />
            )}
            {step === 4 && result && (
              <Step3Confirmation result={result} onReset={onReset} />
            )}

            {/* API submit error */}
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

            {/* Nav — steps 1 & 3 only */}
            {(step === 1 || step === 3) && (
              <FormNav
                step={step}
                submitting={submitting}
                onNext={handleNext}
                onBack={goBack}
              />
            )}
          </div>
        </div>

        {/* Info bento — steps 1, 2 & 3 only */}
        {step < 4 && <InfoBento />}
      </div>
    </div>
  );
}

export default DonorRegistrationPage;

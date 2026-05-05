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
import { useDonationRegister } from "@/hooks/use-donation";
import { DonationRegisterRequest, DonationRegisterResponse } from "@/definitions/donation";

export function DonorRegistrationPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<DonorFormData>(INITIAL_FORM_DATA);
  const [result, setResult] = useState<DonationRegisterResponse | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const {
    mutate: registerUser,
    isPending: submittingUser,
    error: registerError,
  } = useRegister();

  const { mutate: registerDonation, isPending: submittingDonation } =
    useDonationRegister();

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
      onSuccess: () => setStep(2),
    });
  };

  /** OTP verified → proceed to health/donation step */
  const handleOtpVerified = () => setStep(3);

  // ─── Login flow ─────────────────────────────────────────────────────────────

  /** Login success → skip to step 3 */
  const handleLoginSuccess = () => {
    setMode("register");
    setStep(3);
  };

  // ─── Step 3 → 4 (shared) ────────────────────────────────────────────────────

  /** Step 3 → 4: Health answers collected, join queue via API */
  const handleStep3Submit = () => {
    // Prepare survey answers in the format the API expects
    const answers = Object.entries(data.answers).map(
      ([question_id, answer]) => ({
        question_id,
        answer,
      }),
    );

    const payload: DonationRegisterRequest = {
      location_id: data.location_id,
      answers,
    };

    registerDonation(payload, {
      onSuccess: (response) => {
        setResult(response);
        setStep(4);
      },
    });
  };

  const handleNext =
    step === 1 ? handleStep1Submit : step === 3 ? handleStep3Submit : () => {};

  const isLoginMode = mode === "login";
  const showHeading = !isLoginMode && step < 4;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 pt-32 pb-12">
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
                password={data.password || ""}
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
                submitting={submittingUser || submittingDonation}
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

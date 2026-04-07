// components/donor-registration/DonorRegistrationPage.tsx
"use client";

import {
  DonorFormData,
  INITIAL_FORM_DATA,
  RegisterResponse,
  submitRegistration,
} from "@/src/definitions/register";
import { useState } from "react";
import { StepIndicator } from "../stepIndicator";
import { Step1PersonalInfo } from "../steps/step-one-personalInfo";
import { Step2DonationHealth } from "../steps/step-two-donation-health";
import { Step3Confirmation } from "../steps/step-three-confirmation";
import { FormNav } from "../form-nav";
import { InfoBento } from "../Info-bento";

export function DonorRegistrationPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<DonorFormData>(INITIAL_FORM_DATA);
  const [result, setResult] = useState<RegisterResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = (key: keyof DonorFormData, value: any) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const goBack = () => setStep((s) => Math.max(s - 1, 1));
  const onReset = () => {
    setData(INITIAL_FORM_DATA);
    setResult(null);
    setStep(1);
  };

  /** Step 1 → 2: just advance */
  const handleStep1Next = () => setStep(2);

  /** Step 2 → 3: call API */
  const handleStep2Submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        location_id: data.location_id,
        answers: Object.entries(data.answers).map(([question_id, answer]) => ({
          question_id,
          answer,
        })),
      };
      const res = await submitRegistration(payload);
      setResult(res);
      setStep(3);
    } catch {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = step === 1 ? handleStep1Next : handleStep2Submit;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
      {/* Page heading — hidden on step 3 */}
      {step < 3 && (
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
              <Step2DonationHealth data={data} onChange={onChange} />
            )}
            {step === 3 && result && (
              <Step3Confirmation result={result} onReset={onReset} />
            )}

            {/* API submit error */}
            {submitError && (
              <p className="mt-4 text-sm text-red-600 text-center font-sans">
                {submitError}
              </p>
            )}

            {/* Nav — steps 1 & 2 only */}
            {step < 3 && (
              <FormNav
                step={step}
                submitting={submitting}
                onNext={handleNext}
                onBack={goBack}
              />
            )}
          </div>
        </div>

        {/* Info bento — steps 1 & 2 only */}
        {step < 3 && <InfoBento />}
      </div>
    </div>
  );
}

export default DonorRegistrationPage;

// components/form/steps/step-otp-verification.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyOtp } from "@/hooks/use-auth";

interface StepOtpVerificationProps {
  email: string;
  onOtpVerified: () => void;
  onError?: (error: string) => void;
}

export function StepOtpVerification({
  email,
  onOtpVerified,
  onError,
}: StepOtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState(false);

  const { mutate: verifyOtp, isPending } = useVerifyOtp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length === 0) {
      setShowError(true);
      onError?.("Please enter the OTP code");
      return;
    }

    verifyOtp(
      { email, otp_code: otp },
      {
        onSuccess: () => {
          onOtpVerified();
        },
        onError: (error) => {
          const errorMessage =
            error.message || "Invalid OTP. Please try again.";
          setShowError(true);
          onError?.(errorMessage);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#670017]">Verify Your Email</h2>
        <p className="text-[#584141] text-sm">
          We've sent a verification code to{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-[#670017] font-semibold">
            Verification Code
          </Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
              setShowError(false);
            }}
            maxLength={6}
            className={`text-center text-lg tracking-widest font-mono ${
              showError ? "border-red-500 focus:ring-red-500" : ""
            }`}
            disabled={isPending}
          />
          {showError && (
            <p className="text-sm text-red-600 text-center">
              Invalid or expired code. Please try again.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || !otp}
          className="w-full bg-[#670017] hover:bg-[#5a0014] text-white py-2 rounded-lg font-semibold"
        >
          {isPending ? "Verifying..." : "Verify Code"}
        </Button>

        <p className="text-xs text-[#584141] text-center">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="text-[#670017] font-semibold hover:underline"
            disabled={isPending}
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}

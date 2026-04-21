"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-auth";

import { INPUT_CLS } from "@/definitions/register";
import { getUserInfo, useAuthStore } from "@/hooks/zustand/use-auth-store";

interface StepLoginProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-[10px] font-bold uppercase tracking-widest text-[#584141] font-sans"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

export function StepLogin({
  onLoginSuccess,
  onSwitchToRegister,
}: StepLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, error: loginError } = useLogin();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = () => {
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: (response) => {
          // LoginResponse: { userId, email, token, role }
          // Store the user auth data
          setUser(response);

          // TODO: Fetch full profile using /api/auth/profile endpoint with the token
          // For now, basic auth is stored. Profile endpoint should be called separately
          // if additional fields like full_name, phone, profile_picture_url are needed.

          onLoginSuccess();
        },
      },
    );
  };

  const error = loginError;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-300">
      {/* Header */}
      <div className="text-center space-y-1 pb-2">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#670017]/8 flex items-center justify-center mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#670017"
            strokeWidth="1.8"
            className="w-7 h-7"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#670017]">
          Welcome back
        </h2>
        <p className="text-sm text-[#584141] font-sans">
          Sign in to join the donation queue
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        <Field label="Email Address" id="login_email">
          <Input
            id="login_email"
            type="email"
            placeholder="you@example.com"
            className={INPUT_CLS}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </Field>

        <Field label="Password" id="login_password">
          <Input
            id="login_password"
            type="password"
            placeholder="••••••••"
            className={INPUT_CLS}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </Field>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 text-center font-sans">
          {error.message || "Invalid email or password. Please try again."}
        </p>
      )}

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={isPending || !email || !password}
        className="w-full rounded-full py-5 font-bold bg-[#670017] hover:bg-[#8c1127] text-white shadow-lg shadow-[#670017]/20 active:scale-95 transition-all font-sans"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Switch */}
      <p className="text-sm text-center text-[#584141] font-sans">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#670017] font-bold hover:underline underline-offset-2"
        >
          Register here
        </button>
      </p>
    </div>
  );
}

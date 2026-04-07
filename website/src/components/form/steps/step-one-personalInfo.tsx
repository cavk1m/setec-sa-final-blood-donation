// components/donor-registration/Step1PersonalInfo.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DonorFormData, INPUT_CLS } from "@/src/definitions/register";

interface Step1PersonalInfoProps {
  data: DonorFormData;
  onChange: (key: keyof DonorFormData, value: string) => void;
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

export function Step1PersonalInfo({ data, onChange }: Step1PersonalInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-300">
      {/* Eligibility alert */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#670017]/5 border-l-4 border-[#670017]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#670017"
          strokeWidth="2"
          className="w-4 h-4 shrink-0 mt-0.5"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <p className="font-bold text-[#670017] text-sm mb-0.5 font-sans">
            Eligibility Check
          </p>
          <p className="text-[#584141] text-xs leading-relaxed font-sans">
            Please ensure you have not donated whole blood in the last 56 days.
            Your health and the recipient's health are our top priorities.
          </p>
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" id="first_name">
          <Input
            id="first_name"
            placeholder="e.g. Julian"
            className={INPUT_CLS}
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </Field>

        <Field label="Last Name" id="last_name">
          <Input
            id="last_name"
            placeholder="e.g. Sterling"
            className={INPUT_CLS}
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </Field>

        <Field label="Phone Number" id="phone">
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={INPUT_CLS}
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </Field>

        <Field label="Email Address" id="email">
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={INPUT_CLS}
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

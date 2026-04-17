// components/donor-registration/StepIndicator.tsx

import { cn } from "@/lib/utils";
import { REGISTRATION_STEPS } from "@/definitions/register";

interface StepIndicatorProps {
  current: number;
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-10 select-none">
      {REGISTRATION_STEPS.map((step, idx) => {
        const done = current > step.id;
        const active = current === step.id;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                  done
                    ? "bg-[#670017] border-[#670017] text-white shadow-md shadow-[#670017]/30"
                    : active
                      ? "bg-white border-[#670017] text-[#670017] shadow-lg shadow-[#670017]/20 scale-110"
                      : "bg-white border-[#e0bfbf] text-[#8c7070]",
                )}
              >
                {done ? (
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>

              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors font-sans",
                  active
                    ? "text-[#670017]"
                    : done
                      ? "text-[#670017]/60"
                      : "text-[#8c7070]",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < REGISTRATION_STEPS.length - 1 && (
              <div className="relative mx-3 mb-5 w-14 md:w-20 h-0.5 rounded-full bg-[#e0bfbf] overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[#670017] transition-all duration-500 ease-out"
                  style={{ width: current > step.id ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import { Button } from "@/components/ui/button";

interface FormNavProps {
  step: number;
  submitting: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function FormNav({ step, submitting, onNext, onBack }: FormNavProps) {
  return (
    <div className="mt-8 space-y-3">
      <div className="flex items-center gap-3">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={onBack}
            disabled={submitting}
            className="rounded-full border-2 border-[#e0bfbf] text-[#670017] hover:bg-[#ffdada]/40 font-bold px-7 py-5 active:scale-95 transition-all font-sans disabled:opacity-40"
          >
            ← Back
          </Button>
        )}

        <Button
          onClick={onNext}
          disabled={submitting}
          className="flex-1 rounded-full py-5 bg-[#670017] hover:bg-[#8c1127] text-white font-bold text-base shadow-lg shadow-[#670017]/20 active:scale-95 transition-all font-sans disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              {/* Spinner */}
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Submitting…
            </>
          ) : step === 1 ? (
            "Continue to Donation Details →"
          ) : (
            "Submit & Get Queue Number →"
          )}
        </Button>
      </div>

      <p className="text-center text-[#8c7070] text-xs font-sans">
        {step === 1
          ? "Your information is encrypted and secure."
          : "By submitting, you confirm all information provided is accurate."}
      </p>
    </div>
  );
}

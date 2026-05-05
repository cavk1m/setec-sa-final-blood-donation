"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetSurveyQuestions } from "@/hooks/use-survey";
import { useDonationRegister } from "@/hooks/use-donation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function SurveyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationId = searchParams.get("locationId");

  const { data, isLoading, isError } = useGetSurveyQuestions();
  const mutation = useDonationRegister();
  
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  
  const questions = data?.questions ?? [];
  const isComplete = questions.length > 0 && Object.keys(answers).length === questions.length;

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!locationId) {
      toast.error("Missing location information.");
      return;
    }

    const payload = {
      location_id: locationId,
      answers: Object.entries(answers).map(([id, val]) => ({
        question_id: id,
        answer: val ? "Yes" : "No",
      })),
    };

    try {
      await mutation.mutateAsync(payload);
      toast.success("Registration successful!");
      router.push("/my-queue");
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.error("Registration error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#f1ecf2] border-t-[#670017] animate-spin" />
        <p className="text-[#584141] font-medium font-sans">Preparing eligibility survey...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#1c1b1f] mb-2">Oops! Something went wrong</h2>
        <p className="text-[#584141] mb-6 max-w-md">We couldn't load the survey questions. Please try again later.</p>
        <Button onClick={() => window.location.reload()} className="rounded-full bg-[#670017]">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-32 pb-12">
      <div className="mb-12 text-center">
        <span className="text-[#670017] font-bold uppercase tracking-widest text-xs mb-4 block font-sans">
          Safety First
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1c1b1f] mb-4">
          Eligibility Survey
        </h1>
        <p className="text-[#584141] font-sans leading-relaxed">
          Please answer the following questions honestly to ensure the safety of both yourself and the recipient.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div 
            key={q.id} 
            className={cn(
              "p-6 rounded-2xl border transition-all duration-300",
              answers[q.id] !== undefined 
                ? "bg-white border-[#670017]/20 shadow-sm" 
                : "bg-[#f7f2f8]/50 border-transparent"
            )}
          >
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#670017] text-white flex items-center justify-center text-sm font-bold font-sans">
                {index + 1}
              </span>
              <div className="flex-grow">
                <p className="text-[#1c1b1f] font-medium font-sans mb-6 text-lg">
                  {q.question}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-bold font-sans transition-all active:scale-[0.98]",
                      answers[q.id] === true
                        ? "bg-[#670017] text-white shadow-lg shadow-[#670017]/20"
                        : "bg-white border border-[#e0bfbf] text-[#584141] hover:bg-[#670017]/5"
                    )}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-bold font-sans transition-all active:scale-[0.98]",
                      answers[q.id] === false
                        ? "bg-[#670017] text-white shadow-lg shadow-[#670017]/20"
                        : "bg-white border border-[#e0bfbf] text-[#584141] hover:bg-[#670017]/5"
                    )}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center">
        <div className="w-full h-2 bg-[#f1ecf2] rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-[#670017] transition-all duration-500"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          />
        </div>
        
        <Button
          disabled={!isComplete || mutation.isPending}
          onClick={handleSubmit}
          className={cn(
            "w-full max-w-xs h-14 rounded-full text-lg font-bold font-sans shadow-xl transition-all active:scale-95",
            isComplete 
              ? "bg-[#670017] hover:bg-[#8c1127] text-white" 
              : "bg-[#e5e1e7] text-[#8c7070] cursor-not-allowed"
          )}
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Registering...</span>
            </div>
          ) : isComplete ? (
            "Complete Registration"
          ) : (
            "Please Answer All Questions"
          )}
        </Button>
        <p className="mt-4 text-xs text-[#8c7070] font-sans text-center">
          By clicking continue, you confirm that all information provided is accurate.
        </p>
      </div>
    </div>
  );
}

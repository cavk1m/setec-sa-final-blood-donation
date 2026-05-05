"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DonorFormData,
  INPUT_CLS,
} from "@/definitions/register";
import { useGetSurveyQuestions } from "@/hooks/use-survey";
import { useGetLocations } from "@/hooks/use-location";

interface Step2DonationHealthProps {
  data: DonorFormData;
  onChange: (key: keyof DonorFormData, value: any) => void;
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
        className="text-[10px] font-bold uppercase tracking-widest text-[#8c7070] font-sans"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

export function Step2DonationHealth({
  data,
  onChange,
}: Step2DonationHealthProps) {
  // Fetch real locations
  const { data: locationsData, isLoading: loadingLocations } = useGetLocations();
  const realLocations = locationsData?.locations || [];

  // Fetch questions on mount
  const {
    data: surveyData,
    isLoading: loading,
    error,
  } = useGetSurveyQuestions();
  const questions = surveyData?.questions || [];

  // Auto-select first location if none selected
  useEffect(() => {
    if (!data.location_id && realLocations.length > 0) {
      onChange("location_id", realLocations[0].id);
    }
  }, [realLocations, data.location_id]);

  // Seed answers with "no" for any question not yet answered
  useEffect(() => {
    if (questions.length > 0) {
      const seed: Record<string, "yes" | "no"> = { ...data.answers };
      questions.forEach((q) => {
        if (!(q.id in seed)) seed[q.id] = "no";
      });
      onChange("answers", seed);
    }
  }, [questions]); 

  const setAnswer = (questionId: string, value: "yes" | "no") => {
    onChange("answers", { ...data.answers, [questionId]: value });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* ── Donation Details ── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e0bfbf]/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#670017] text-white flex items-center justify-center text-xs font-bold">1</div>
          <h3 className="font-serif font-bold text-[#1c1b1f] text-lg">Donation Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Preferred Donation Center">
            <Select
              disabled={loadingLocations}
              value={data.location_id}
              onValueChange={(v) => onChange("location_id", v)}
            >
              <SelectTrigger className={cn(INPUT_CLS, "h-14 border-[#e0bfbf]/40 bg-white shadow-sm hover:border-[#670017]/40 transition-colors")}>
                <SelectValue placeholder={loadingLocations ? "Loading..." : "Select center"} />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-[#e0bfbf] rounded-2xl shadow-2xl p-1 max-h-[300px]">
                {realLocations.map((c) => (
                  <SelectItem
                    key={c.id}
                    value={c.id}
                    className="rounded-xl p-3 cursor-pointer focus:bg-[#670017]/5 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-[#1c1b1f]">{c.name}</p>
                      <p className="text-[10px] text-[#8c7070] font-sans truncate max-w-[200px]">{c.address}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Preferred Visit Date" id="visit_date">
            <Input
              id="visit_date"
              type="date"
              className={cn(INPUT_CLS, "h-14 border-[#e0bfbf]/40 bg-white shadow-sm hover:border-[#670017]/40 transition-colors")}
              value={data.visitDate}
              onChange={(e) => onChange("visitDate", e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* ── Health Survey ── */}
      <div className="bg-[#f7f2f8]/40 rounded-[32px] p-6 border border-[#e0bfbf]/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#670017] text-white flex items-center justify-center text-xs font-bold">2</div>
          <h3 className="font-serif font-bold text-[#1c1b1f] text-lg">Health Questionnaire</h3>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-6 bg-white/50 rounded-2xl border border-transparent animate-pulse"
              >
                <div className="h-4 bg-[#e0bfbf]/40 rounded-full w-2/3" />
                <div className="h-10 bg-[#e0bfbf]/40 rounded-xl w-32" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
             <p className="text-sm text-red-600 font-sans font-medium">{error.message}</p>
             <button onClick={() => window.location.reload()} className="mt-2 text-xs font-bold text-[#670017] underline">Retry</button>
          </div>
        )}

        {/* Questions */}
        {!loading && !error && (
          <div className="space-y-4">
            {questions.map(({ id, question }, index) => (
              <div
                key={id}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300",
                  data.answers[id]
                    ? "bg-white border-[#670017]/10 shadow-sm"
                    : "bg-white/40 border-transparent"
                )}
              >
                {/* Question text row */}
                <div className="flex gap-3 items-start mb-4">
                  <span className="text-[10px] font-black text-[#670017]/40 mt-0.5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-[#1c1b1f] font-semibold leading-relaxed font-sans">
                    {question}
                  </p>
                </div>

                {/* Yes / No toggle */}
                <div className="flex justify-end">
                  <RadioGroup
                    value={data.answers[id] ?? "no"}
                    onValueChange={(v) => setAnswer(id, v as "yes" | "no")}
                    className="flex items-center p-1 bg-[#f7f2f8] rounded-xl"
                  >
                    {(["yes", "no"] as const).map((opt) => (
                      <div key={opt} className="relative flex items-center">
                        <RadioGroupItem
                          value={opt}
                          id={`${id}-${opt}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`${id}-${opt}`}
                          className={cn(
                            "px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans uppercase tracking-widest",
                            data.answers[id] === opt
                              ? "bg-[#670017] text-white shadow-lg shadow-[#670017]/20"
                              : "text-[#8c7070] hover:text-[#670017]"
                          )}
                        >
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ))}

          </div>
        )}

        <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-3">
           <svg viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" className="w-5 h-5 shrink-0 mt-0.5">
             <circle cx="12" cy="12" r="10" />
             <line x1="12" y1="8" x2="12" y2="12" />
             <line x1="12" y1="16" x2="12.01" y2="16" />
           </svg>
           <p className="text-[11px] text-[#92400e] font-sans leading-normal">
             <strong>Disclaimer:</strong> Your answers are strictly confidential and used only to determine initial eligibility. A final medical check will be performed by a nurse on site.
           </p>
        </div>
      </div>
    </div>
  );
}

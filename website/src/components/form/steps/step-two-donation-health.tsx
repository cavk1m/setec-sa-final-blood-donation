// components/donor-registration/Step2DonationHealth.tsx

"use client";

import { useEffect, useState } from "react";
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
  DONATION_CENTERS,
  ApiQuestion,
  fetchQuestions,
} from "@/definitions/register";

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
        className="text-[10px] font-bold uppercase tracking-widest text-[#584141] font-sans"
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
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchQuestions()
      .then((qs) => {
        if (cancelled) return;
        setQuestions(qs);
        // Seed answers with "no" for any question not yet answered
        const seed: Record<string, "yes" | "no"> = { ...data.answers };
        qs.forEach((q) => {
          if (!(q.id in seed)) seed[q.id] = "no";
        });
        onChange("answers", seed);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load health questions.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setAnswer = (questionId: string, value: "yes" | "no") => {
    onChange("answers", { ...data.answers, [questionId]: value });
  };

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-right-3 duration-300">
      {/* ── Donation Details ── */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c7070] mb-4 font-sans">
          Donation Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Donation Center">
            <Select
              value={data.location_id}
              onValueChange={(v) => onChange("location_id", v)}
            >
              <SelectTrigger className={cn(INPUT_CLS, "cursor-pointer")}>
                <SelectValue>
                  {DONATION_CENTERS.find((c) => c.id === data.location_id)
                    ?.name ?? "Select center"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border-[#e0bfbf] rounded-xl shadow-xl">
                {DONATION_CENTERS.map((c) => (
                  <SelectItem
                    key={c.id}
                    value={c.id}
                    className="text-sm cursor-pointer focus:bg-[#ffdada]"
                  >
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-[11px] text-[#8c7070]">{c.address}</p>
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
              className={INPUT_CLS}
              value={data.visitDate}
              onChange={(e) => onChange("visitDate", e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* ── Health Survey ── */}
      <div className="rounded-2xl bg-[#f7f2f8]/80 px-5 py-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c7070] mb-4 font-sans">
          Quick Health Survey
        </p>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3.5 border-b border-[#e0bfbf]/40"
              >
                <div className="h-4 bg-[#e0bfbf]/60 rounded-lg w-2/3 animate-pulse" />
                <div className="h-4 bg-[#e0bfbf]/60 rounded-lg w-20 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <p className="text-sm text-red-600 font-sans py-4">{error}</p>
        )}

        {/* Questions */}
        {!loading && !error && (
          <div className="divide-y divide-[#e0bfbf]/40">
            {questions.map(({ id, question }) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5"
              >
                <p className="text-sm text-[#1c1b1f] font-medium leading-snug flex-1 font-sans">
                  {question}
                </p>
                <RadioGroup
                  value={data.answers[id] ?? "no"}
                  onValueChange={(v) => setAnswer(id, v as "yes" | "no")}
                  className="flex items-center gap-5 shrink-0"
                >
                  {(["yes", "no"] as const).map((opt) => (
                    <div key={opt} className="flex items-center gap-1.5">
                      <RadioGroupItem
                        value={opt}
                        id={`${id}-${opt}`}
                        className="border-[#8c7070] text-[#670017] focus-visible:ring-[#670017]"
                      />
                      <Label
                        htmlFor={`${id}-${opt}`}
                        className="text-sm capitalize cursor-pointer font-semibold text-[#1c1b1f] font-sans"
                      >
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

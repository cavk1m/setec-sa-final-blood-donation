"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetLocations } from "@/hooks/use-location";
import { useGetSurveyQuestions } from "@/hooks/use-survey";
import { useDonationRegister } from "@/hooks/use-donation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function BloodDonationModal({ trigger }: { trigger?: React.ReactNode }) {
  const router = useRouter();
  const [step, setStep] = useState<"location" | "survey">("location");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const { data: locationsData, isLoading: locLoading } = useGetLocations();
  const { data: surveyData, isLoading: surveyLoading } = useGetSurveyQuestions();
  const mutation = useDonationRegister();

  const locations = locationsData?.locations ?? [];
  const questions = surveyData?.questions ?? [];
  const isSurveyComplete = questions.length > 0 && Object.keys(answers).length === questions.length;

  const handleRegister = async () => {
    if (!selectedLocation) return;
    
    const payload = {
      location_id: selectedLocation,
      answers: Object.entries(answers).map(([id, val]) => ({
        question_id: id,
        answer: val ? "Yes" : "No",
      })),
    };

    try {
      await mutation.mutateAsync(payload);
      toast.success("Registration successful!");
      setIsOpen(false);
      router.push("/my-queue");
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    }
  };

  const reset = () => {
    setStep("location");
    setSelectedLocation(null);
    setAnswers({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) reset(); }}>
      <DialogTrigger asChild>
        {trigger || <Button>Donate Blood</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[32px] border-none shadow-2xl p-0">
        <div className="h-2 bg-[#670017] w-full sticky top-0 z-50" />
        
        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-serif font-bold text-[#1c1b1f]">
              {step === "location" ? "Select a Center" : "Eligibility Survey"}
            </DialogTitle>
            <DialogDescription className="text-[#584141] font-sans">
              {step === "location" 
                ? "Choose the nearest blood donation center to begin your journey."
                : "Please answer honestly to ensure safety for both you and the recipient."}
            </DialogDescription>
          </DialogHeader>

          {step === "location" ? (
            <div className="space-y-4">
              {locLoading ? (
                <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-[#670017]/20 border-t-[#670017] rounded-full animate-spin" /></div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={cn(
                        "flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left",
                        selectedLocation === loc.id 
                          ? "border-[#670017] bg-[#670017]/5" 
                          : "border-[#f1ecf2] hover:border-[#670017]/30"
                      )}
                    >
                      <div>
                        <p className="font-bold text-[#1c1b1f]">{loc.name}</p>
                        <p className="text-xs text-[#8c7070]">{loc.address}</p>
                      </div>
                      {selectedLocation === loc.id && (
                        <div className="w-6 h-6 rounded-full bg-[#670017] flex items-center justify-center text-white">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <Button 
                disabled={!selectedLocation}
                onClick={() => setStep("survey")}
                className="w-full h-12 rounded-full bg-[#670017] font-bold mt-6"
              >
                Continue to Survey
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-2xl bg-[#fcfafc] border border-[#f1ecf2]">
                  <p className="text-[#1c1b1f] font-bold mb-4 flex gap-3">
                    <span className="text-[#670017]">{idx + 1}.</span> {q.question}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setAnswers(p => ({...p, [q.id]: true}))}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all",
                        answers[q.id] === true ? "bg-[#670017] text-white" : "bg-white border border-[#e0bfbf] text-[#584141]"
                      )}
                    >Yes</button>
                    <button
                      onClick={() => setAnswers(p => ({...p, [q.id]: false}))}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all",
                        answers[q.id] === false ? "bg-[#670017] text-white" : "bg-white border border-[#e0bfbf] text-[#584141]"
                      )}
                    >No</button>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep("location")} className="flex-1 rounded-full h-12">Back</Button>
                <Button 
                  disabled={!isSurveyComplete || mutation.isPending}
                  onClick={handleRegister}
                  className="flex-[2] rounded-full h-12 bg-[#670017] font-bold"
                >
                  {mutation.isPending ? "Registering..." : "Complete Registration"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

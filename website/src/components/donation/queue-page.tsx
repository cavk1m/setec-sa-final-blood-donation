"use client";

import { useGetMyQueue } from "@/hooks/use-donation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function QueuePage() {
  const { data, isLoading, isError, refetch } = useGetMyQueue();
  const queue = data?.queue;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#f1ecf2] border-t-[#670017] animate-spin" />
        <p className="text-[#584141] font-medium font-sans">Fetching your queue status...</p>
      </div>
    );
  }

  if (isError || !queue) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-[#f7f2f8] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="#670017" strokeWidth="1.5" className="w-10 h-10 opacity-40">
            <path d="M12 2C8.5 7 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-4.5-8-8-13z" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#1c1b1f] mb-3">No Active Registration</h2>
        <p className="text-[#584141] font-sans mb-8 leading-relaxed">
          You don&apos;t have any active blood donation registrations at the moment. 
          Ready to save a life?
        </p>
        <Link href="/locations">
          <Button className="rounded-full bg-[#670017] px-8 h-12 font-bold font-sans">
            Find a Donation Center
          </Button>
        </Link>
      </div>
    );
  }

  const statusColors = {
    waiting: "bg-amber-500",
    completed: "bg-green-500",
    skip: "bg-red-500",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <span className="text-[#670017] font-bold uppercase tracking-widest text-xs mb-4 block font-sans">
          Registration Confirmed
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1c1b1f] mb-4">
          Your Queue Status
        </h1>
        <p className="text-[#584141] font-sans leading-relaxed">
          Please arrive at the center on time and present this screen to the staff.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(88,65,65,0.12)] border border-[#e0bfbf]/30 overflow-hidden">
        {/* Queue Number Header */}
        <div className="bg-[#670017] p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <p className="text-white/70 uppercase tracking-[0.3em] text-xs font-bold mb-2 font-sans">Your Position</p>
          <div className="text-8xl font-serif font-black mb-4 tabular-nums">
            {queue.queue_number}
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest font-sans">
            <span className={cn("w-2 h-2 rounded-full animate-pulse", statusColors[queue.status])} />
            {queue.status}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f7f2f8] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#670017" strokeWidth="2" className="w-6 h-6">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#8c7070] uppercase tracking-widest mb-1 font-sans">Location</p>
              <h3 className="text-xl font-bold text-[#1c1b1f] font-sans">{queue.location?.name || "Donation Center"}</h3>
              <p className="text-[#584141] text-sm font-sans mt-1">{queue.location?.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f7f2f8] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#670017" strokeWidth="2" className="w-6 h-6">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#8c7070] uppercase tracking-widest mb-1 font-sans">Date Registered</p>
              <h3 className="text-xl font-bold text-[#1c1b1f] font-sans">
                {new Date(queue.created_at).toLocaleDateString("en-US", { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>
          </div>

          <div className="pt-4 border-t border-[#f1ecf2]">
            {(queue.survey_score ?? 0) < 5 ? (
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center gap-4 animate-in zoom-in-95 duration-500">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-red-900 font-sans mb-1">
                    Wait! You might not be eligible this time.
                  </p>
                  <p className="text-xs text-red-700 font-sans leading-relaxed">
                    Your survey score is <strong>{queue.survey_score}/5</strong>. 
                    Based on your health answers, we recommend staying home and resting. 
                    You can try again in a few months!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#fff9fa] p-6 rounded-2xl border border-[#ffebeb] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" className="w-6 h-6">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-900 font-sans mb-1">
                    Perfect Score! You are eligible to donate.
                  </p>
                  <p className="text-xs text-green-700 font-sans leading-relaxed">
                    Your survey score was <strong>{queue.survey_score}/5</strong>. 
                    Please proceed to the center as planned.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-[#fdf8fd] border-t border-[#f1ecf2] flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            className="flex-1 rounded-full border-[#e0bfbf] text-[#670017] font-bold font-sans h-12"
          >
            Refresh Status
          </Button>
          {(queue.survey_score ?? 0) >= 5 && (
            <Button className="flex-1 rounded-full bg-[#670017] font-bold font-sans h-12 text-white shadow-lg shadow-[#670017]/20">
              Download Ticket
            </Button>
          )}
        </div>
      </div>

      <p className="mt-8 text-center text-[#8c7070] text-sm font-sans">
        Need to cancel? Please contact the center directly or update your status in profile.
      </p>
    </div>
  );
}

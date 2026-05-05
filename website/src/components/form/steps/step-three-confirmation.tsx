import { Button } from "@/components/ui/button";
import { DonationRegisterResponse } from "@/definitions/donation";

interface Step3ConfirmationProps {
  result: DonationRegisterResponse;
  onReset: () => void;
}

const WAVE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' d='M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`;

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function Step3Confirmation({ result, onReset }: Step3ConfirmationProps) {
  const { queue } = result;
  const queueLabel = queue.queue_number;
  const locationName = queue.location?.name ?? "—";
  const locationAddress = queue.location?.address ?? "—";

  const details = [
    { label: "Location", value: locationName },
    { label: "Address", value: locationAddress },
    { label: "Date", value: formatDate(queue.created_at) },
    {
      label: "Status",
      value: queue.status.charAt(0).toUpperCase() + queue.status.slice(1),
      isStatus: true,
    },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-400 space-y-5">
      {/* ── Success header ── */}
      <div className="flex flex-col items-center text-center pb-1">
        <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mb-4 shadow-md">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path
              d="M5 12l4.5 4.5L19 7"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#670017] mb-1">
          Registration Confirmed!
        </h2>
        <p className="text-sm text-[#584141] max-w-xs leading-relaxed font-sans">
          {result.message}
        </p>
      </div>

      {/* ── Queue card ── */}
      <div
        className="rounded-2xl p-8 text-white text-center shadow-xl relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: WAVE_SVG,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        />
        <p className="text-[10px] uppercase tracking-[0.25em] opacity-60 mb-1.5 font-sans font-bold">
          Your Queue Number
        </p>
        <div className="text-7xl font-serif font-black tracking-tighter mb-3">
          {queueLabel}
        </div>
        <div className="flex items-center justify-center gap-1.5 opacity-75 text-xs font-sans font-medium">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-3 h-3"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {locationName} · {formatDate(queue.created_at)}
        </div>
      </div>

      {/* ── Details table ── */}
      <div className="bg-[#f7f2f8] rounded-2xl px-5 py-2 divide-y divide-[#e0bfbf]/40">
        {details.map(({ label, value, isStatus }) => (
          <div
            key={label}
            className="flex items-center justify-between py-3 gap-3"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c7070] shrink-0 font-sans">
              {label}
            </span>
            {isStatus ? (
              <div className="flex items-center gap-1.5 font-sans">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-sm font-bold text-green-700">
                  {value}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-[#1c1b1f] text-right font-sans">
                {value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Reminder note ── */}
      <div className="flex gap-3 items-start bg-[#670017]/5 p-4 rounded-xl border-l-4 border-[#670017]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#670017"
          strokeWidth="2"
          className="w-4 h-4 shrink-0 mt-0.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <p className="text-xs text-[#584141] leading-relaxed font-sans">
          A confirmation email with your queue number and center details has
          been sent. Please arrive within 15 minutes of your scheduled time
          slot.
        </p>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button
          className="flex-1 rounded-full py-5 font-bold bg-[#670017] hover:bg-[#8c1127] text-white shadow-lg shadow-[#670017]/20 active:scale-95 transition-all font-sans"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-full py-5 font-bold border-2 border-[#e0bfbf] text-[#670017] hover:bg-[#ffdada]/40 active:scale-95 transition-all font-sans"
          onClick={onReset}
        >
          Find Another Center
        </Button>
      </div>
    </div>
  );
}

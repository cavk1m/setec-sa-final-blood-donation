// components/donation-page/QRPaymentPanel.tsx

import { Button } from "@/components/ui/button";

interface QRPaymentPanelProps {
  reference: string;
  onConfirm: () => void;
  submitting: boolean;
}

const STEPS = [
  "Open your banking or payment app (Venmo, PayPal, ABA, etc.)",
  "Scan the QR code above and enter your chosen amount.",
  "Include the reference code above in the notes for tracking.",
];

export function QRPaymentPanel({
  reference,
  onConfirm,
  submitting,
}: QRPaymentPanelProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="font-serif text-3xl font-bold text-[#670017]">
          Scan to Pay
        </h2>
        <p className="text-[#584141] font-sans text-sm">
          Use your preferred mobile banking app
        </p>
      </div>

      {/* QR code */}
      <div className="flex justify-center">
        <div className="p-5 bg-white border border-[#e0bfbf]/40 rounded-2xl shadow-sm relative">
          {/* SVG mock QR — clean geometric pattern */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-lg"
          >
            <rect width="200" height="200" fill="white" />
            {/* Top-left finder */}
            <rect x="10" y="10" width="56" height="56" rx="4" fill="#670017" />
            <rect x="18" y="18" width="40" height="40" rx="2" fill="white" />
            <rect x="26" y="26" width="24" height="24" rx="1" fill="#670017" />
            {/* Top-right finder */}
            <rect x="134" y="10" width="56" height="56" rx="4" fill="#670017" />
            <rect x="142" y="18" width="40" height="40" rx="2" fill="white" />
            <rect x="150" y="26" width="24" height="24" rx="1" fill="#670017" />
            {/* Bottom-left finder */}
            <rect x="10" y="134" width="56" height="56" rx="4" fill="#670017" />
            <rect x="18" y="142" width="40" height="40" rx="2" fill="white" />
            <rect x="26" y="150" width="24" height="24" rx="1" fill="#670017" />
            {/* Data modules — simple grid pattern */}
            {[
              80, 88, 96, 104, 112, 120, 80, 96, 112, 88, 104, 120, 80, 88, 96,
              104, 112, 120,
            ].map((x, i) => (
              <rect
                key={`r${i}`}
                x={x}
                y={10 + (i % 6) * 12}
                width="6"
                height="6"
                rx="1"
                fill="#670017"
                opacity="0.8"
              />
            ))}
            {[
              10, 22, 34, 46, 58, 80, 92, 104, 116, 128, 140, 152, 164, 176,
            ].map((y, i) => (
              <rect
                key={`c${i}`}
                x={80 + (i % 7) * 12}
                y={y}
                width="6"
                height="6"
                rx="1"
                fill="#670017"
                opacity="0.6"
              />
            ))}
            {/* Center logo badge */}
            <rect x="84" y="84" width="32" height="32" rx="6" fill="white" />
            <rect x="86" y="86" width="28" height="28" rx="5" fill="#670017" />
            <text
              x="100"
              y="105"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontStyle="italic"
              fontWeight="900"
              fontFamily="serif"
            >
              HF
            </text>
          </svg>
        </div>
      </div>

      {/* Reference row */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#f1ecf2] rounded-lg border border-[#e0bfbf]/20">
        <span className="text-xs font-bold uppercase tracking-widest text-[#584141] font-sans">
          Reference
        </span>
        <span className="font-mono text-[#670017] font-bold text-sm">
          {reference}
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-4 pt-2 border-t border-[#e0bfbf]/20">
        {STEPS.map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-[#8c1127] text-white flex items-center justify-center text-xs font-bold font-sans">
              {i + 1}
            </span>
            <p className="text-sm text-[#584141] leading-relaxed font-sans font-medium">
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        onClick={onConfirm}
        disabled={submitting}
        className="w-full rounded-full py-5 text-white font-bold text-base shadow-lg active:scale-[0.98] transition-all font-sans disabled:opacity-70"
        style={{
          background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
        }}
      >
        {submitting ? (
          <span className="flex items-center gap-2">
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
            Processing…
          </span>
        ) : (
          "I have completed the payment"
        )}
      </Button>

      <p className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-[#584141]/40 font-sans">
        Secure SSL Encrypted Transaction
      </p>
    </div>
  );
}

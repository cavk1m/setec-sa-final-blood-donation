// components/donation-page/PaymentMethodToggle.tsx

import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/src/definitions/donation";

interface PaymentMethodToggleProps {
  selected: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  {
    id: "qr",
    label: "Scan QR Code",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="3" height="3" />
        <rect x="18" y="14" width="3" height="3" />
        <rect x="14" y="18" width="3" height="3" />
        <rect x="18" y="18" width="3" height="3" />
      </svg>
    ),
  },
  {
    id: "visa",
    label: "Credit / Debit Card",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export function PaymentMethodToggle({
  selected,
  onChange,
}: PaymentMethodToggleProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-[#584141] font-sans">
        Payment Method
      </p>
      <div className="grid grid-cols-2 gap-3 p-1 bg-[#f1ecf2] rounded-xl">
        {METHODS.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 font-sans cursor-pointer",
              selected === id
                ? "bg-white text-[#670017] shadow-md shadow-[#670017]/10"
                : "text-[#584141] hover:text-[#670017]",
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

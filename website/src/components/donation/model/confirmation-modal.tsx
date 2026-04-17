// components/donation-page/ConfirmationModal.tsx

import { Button } from "@/components/ui/button";
import { DonationReceipt } from "@/definitions/donation";

interface ConfirmationModalProps {
  receipt: DonationReceipt;
  onDone: () => void;
}

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

export function ConfirmationModal({ receipt, onDone }: ConfirmationModalProps) {
  return (
    /* Backdrop */
    <div className="fixed inset-0 bg-[#1c1b1f]/50 backdrop-blur-md z-60 flex items-center justify-center px-4">
      {/* Modal card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0_24px_80px_rgba(88,65,65,0.18)] overflow-hidden border border-[#e0bfbf]/20 animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          {/* Heart icon */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-2xl opacity-60" />
            <div className="relative bg-green-50 w-20 h-20 rounded-full flex items-center justify-center border-4 border-green-100 shadow-md">
              <svg viewBox="0 0 24 24" fill="#16a34a" className="w-10 h-10">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-[#670017] tracking-tighter mb-3 italic">
            Thank You!
          </h1>
          <p className="text-[#584141] text-base mb-8 max-w-xs font-sans leading-relaxed">
            Your contribution brings hope to those who need it most.
          </p>

          {/* Receipt box */}
          <div className="w-full bg-[#f7f2f8] rounded-xl p-6 mb-8 text-left border border-[#e0bfbf]/20">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#584141] font-sans">
                Transaction Receipt
              </span>
              <span className="bg-[#e5e1e7] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#584141] font-sans">
                {receipt.method === "qr" ? "Pending Verification" : "Approved"}
              </span>
            </div>

            <div className="space-y-3 divide-y divide-[#e0bfbf]/30">
              {[
                { label: "Campaign", value: receipt.campaign, bold: false },
                {
                  label: "Amount",
                  value: formatUSD(receipt.amount),
                  bold: true,
                  primary: true,
                },
                { label: "Reference", value: receipt.reference, mono: true },
                {
                  label: "Method",
                  value:
                    receipt.method === "qr"
                      ? "QR / Mobile Banking"
                      : "Credit / Debit Card",
                  bold: false,
                },
                { label: "Date", value: receipt.date, bold: false },
              ].map(({ label, value, bold, primary, mono }) => (
                <div
                  key={label}
                  className="flex justify-between items-end pt-3 gap-4"
                >
                  <span className="text-sm text-[#584141] font-sans shrink-0">
                    {label}
                  </span>
                  <span
                    className={[
                      "text-right font-sans",
                      primary
                        ? "font-serif text-xl font-bold text-[#670017]"
                        : bold
                          ? "font-bold text-[#1c1b1f] text-sm"
                          : mono
                            ? "font-mono text-xs text-[#1c1b1f]"
                            : "text-sm text-[#1c1b1f]",
                    ].join(" ")}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <Button
            className="w-full rounded-full py-4 text-white font-bold text-base shadow-lg active:scale-95 transition-all font-sans"
            style={{
              background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
            }}
            onClick={onDone}
          >
            Done
          </Button>

          <button
            className="mt-5 text-[#670017] font-bold text-sm hover:underline transition-all font-sans cursor-pointer"
            onClick={() => alert("PDF download coming soon")}
          >
            Download PDF Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

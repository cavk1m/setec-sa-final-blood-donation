import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ApiLocation } from "./types";

interface LocationCardProps {
  center: ApiLocation;
  onRegister: (id: string) => void;
}

// Map donation_type → display tag label
const TYPE_TAG: Record<string, string> = {
  BLOOD: "BLOOD DONATION",
  FOOD: "FOOD SUPPORT",
  CLOTHING: "CLOTHING AID",
  MEDICAL: "MEDICAL SUPPLIES",
};

export function LocationCard({ center, onRegister }: LocationCardProps) {
  const tag = center.donation_type
    ? (TYPE_TAG[center.donation_type] ?? center.donation_type)
    : null;

  return (
    <div className="bg-[#f7f2f8] p-1 rounded-3xl shadow-[0_12px_40px_rgba(88,65,65,0.06)] hover:shadow-[0_20px_50px_rgba(88,65,65,0.12)] transition-all duration-300 group">
      <div className="bg-white rounded-[22px] flex flex-col h-full overflow-hidden">

        {/* QR / payment image banner – shown only when payment_qr_url exists */}
        {center.payment_qr_url && (
          <div className="relative w-full h-52 overflow-hidden bg-[#f3eeee]">
            <Image
              src={center.payment_qr_url}
              alt={`Payment QR code for ${center.name}`}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Gradient overlay at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Scan to Pay badge */}
            <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-sans text-white backdrop-blur-sm bg-[#670017]/80 shadow-lg">
              Scan to Pay
            </span>
          </div>
        )}

        <div className="p-8 flex flex-col flex-grow">
          {/* Top row – type badge + map link */}
          <div className="flex justify-between items-start mb-6">
            {tag && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans bg-[#670017]/10 text-[#670017]">
                {tag}
              </span>
            )}
            {center.latitude && center.longitude && (
              <a
                href={`https://www.google.com/maps?q=${center.latitude},${center.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#584141] font-sans font-medium text-sm flex items-center gap-1 hover:text-[#670017] transition-colors"
              >
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
                View Map
              </a>
            )}
          </div>

          {/* Name + address */}
          <h3 className="font-serif text-3xl font-bold text-[#1c1b1f] mb-2 group-hover:text-[#670017] transition-colors">
            {center.name}
          </h3>
          <p className="text-[#584141] text-sm mb-6 font-sans">{center.address}</p>

          {/* Payment method indicator */}
          <div className="space-y-4 mb-8 flex-grow">
            {center.payment_qr_url ? (
              <div className="flex items-center gap-3 text-sm font-sans">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#670017"
                  strokeWidth="2"
                  className="w-4 h-4 shrink-0"
                >
                  <rect x="3" y="3" width="5" height="5" />
                  <rect x="16" y="3" width="5" height="5" />
                  <rect x="3" y="16" width="5" height="5" />
                  <path d="M21 16h-3v5" />
                  <path d="M15 21v-6h3" />
                  <path d="M15 16h.01" />
                </svg>
                <span className="font-medium text-[#1c1b1f]">QR Payment Available</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm font-sans text-[#584141]/60">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Cash / In-person only</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <Button
            onClick={() => onRegister(center.id)}
            className="w-full rounded-full py-4 text-white font-bold font-sans active:scale-95 transition-all"
            style={{
              background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
            }}
          >
            Register Here
          </Button>
        </div>
      </div>
    </div>
  );
}

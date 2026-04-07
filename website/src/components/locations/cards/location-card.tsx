// components/locations-page/LocationCard.tsx

import { Button } from "@/components/ui/button";
import { LocationCenter } from "./types";
// import { LocationCenter } from "./types";

interface LocationCardProps {
  center: LocationCenter;
  onRegister: (id: string) => void;
}

export function LocationCard({ center, onRegister }: LocationCardProps) {
  const badgeCls =
    center.badgeColor === "primary"
      ? "bg-[#670017]/10 text-[#670017]"
      : "bg-[#9c404b]/10 text-[#9c404b]";

  return (
    <div className="bg-[#f7f2f8] p-1 rounded-3xl shadow-[0_12px_40px_rgba(88,65,65,0.06)] hover:shadow-[0_20px_50px_rgba(88,65,65,0.12)] transition-all duration-300 group">
      <div className="bg-white p-8 rounded-[22px] flex flex-col h-full">
        {/* Top row */}
        <div className="flex justify-between items-start mb-6">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans ${badgeCls}`}
          >
            {center.badge}
          </span>
          <span className="text-[#584141] font-sans font-medium text-sm flex items-center gap-1">
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
            {center.distance}
          </span>
        </div>

        {/* Name + address */}
        <h3 className="font-serif text-3xl font-bold text-[#1c1b1f] mb-2 group-hover:text-[#670017] transition-colors">
          {center.name}
        </h3>
        <p className="text-[#584141] text-sm mb-6 font-sans">
          {center.address}
        </p>

        {/* Hours + tags */}
        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-center gap-3 text-sm font-sans">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#670017"
              strokeWidth="2"
              className="w-4 h-4 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-medium text-[#1c1b1f]">{center.hours}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {center.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#f1ecf2] rounded-full text-[11px] font-bold text-[#584141] font-sans tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
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
  );
}

// components/campaigns-page/EmergencyBanner.tsx
"use client";

import { useState } from "react";

export function EmergencyBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="w-full py-3 px-8 flex items-center justify-between text-white"
      style={{
        background: "rgba(103, 0, 23, 0.92)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="bg-white text-[#670017] px-3 py-1 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase">
          URGENT
        </span>
        <p className="font-sans text-sm font-medium">
          Critical shortage in Eastern Province. Blood Drive active now.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-white/70 hover:text-white transition-colors ml-4 cursor-pointer"
        aria-label="Dismiss"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-5 h-5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

// components/locations-page/LocationsGrid.tsx
"use client";

import { LocationCard } from "./location-card";
import { LocationCenter } from "./types";

interface LocationsGridProps {
  centers: LocationCenter[];
  onRegister: (id: string) => void;
}

export function LocationsGrid({ centers, onRegister }: LocationsGridProps) {
  return (
    <div className="lg:col-span-9">
      {/* Results header */}
      <div className="flex justify-between items-center mb-10">
        <p className="font-sans text-[#584141]">
          <span className="font-bold text-[#670017]">{centers.length}</span>{" "}
          Locations found near you
        </p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-[#ebe7ec] text-[#670017] cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button className="p-2 rounded-lg text-[#584141] hover:bg-[#f1ecf2] transition-colors cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {centers.map((center) => (
          <LocationCard
            key={center.id}
            center={center}
            onRegister={onRegister}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocationsHero } from "./location-hero";
import { CategorySidebar } from "./location-category-sidebar";
import { LocationsGrid } from "./cards/location-grid";
import { CategoryFilter } from "@/definitions/locations";
import { useGetLocations } from "@/hooks/use-location";

// Map CategoryFilter → donation_type values from the API
const FILTER_TYPE_MAP: Record<CategoryFilter, string[]> = {
  all: [],
  blood: ["BLOOD"],
  food: ["FOOD"],
  clothing: ["CLOTHING"],
  medical: ["MEDICAL"],
};

export function LocationsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const { data, isLoading, isError } = useGetLocations();

  const locations = data?.locations ?? [];

  const filtered =
    activeFilter === "all"
      ? locations
      : locations.filter((loc) =>
          loc.donation_type
            ? FILTER_TYPE_MAP[activeFilter].includes(loc.donation_type)
            : false,
        );

  const handleRegister = (id: string) => {
    router.push(`/donate/survey?locationId=${id}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 pt-28 md:pt-32 pb-24 md:pb-32">
      <LocationsHero />

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-4 border-[#f1ecf2] border-t-[#670017] animate-spin"
              role="status"
              aria-label="Loading locations"
            />
            <p className="font-sans text-[#584141] text-sm">
              Loading locations…
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#670017"
            strokeWidth="1.5"
            className="w-14 h-14 mb-4 opacity-40"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="font-sans text-[#584141] text-lg font-semibold">
            Could not load locations
          </p>
          <p className="font-sans text-[#584141]/60 text-sm mt-1">
            Please check your connection and try again.
          </p>
        </div>
      )}

      {/* Main content */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <CategorySidebar active={activeFilter} onChange={setActiveFilter} />
          <LocationsGrid centers={filtered} onRegister={handleRegister} />
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-24 right-8 md:bottom-12 md:right-12 z-40">
        <button
          className="w-16 h-16 rounded-full text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-90 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
          }}
          title="Suggest New Location"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-7 h-7"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <line x1="12" y1="7" x2="12" y2="13" />
            <line x1="9" y1="10" x2="15" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default LocationsPage;

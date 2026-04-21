"use client";

import { useState } from "react";
import { LocationsHero } from "./location-hero";
import { CategorySidebar } from "./location-category-sidebar";
import { LocationsGrid } from "./cards/location-grid";
import { CategoryFilter, LOCATION_CENTERS } from "@/definitions/locations";

export function LocationsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filtered = LOCATION_CENTERS.filter((c) => {
    if (activeFilter === "all") return true;
    const tagMap: Record<CategoryFilter, string[]> = {
      all: [],
      blood: ["BLOOD", "PLATELETS", "PLASMA"],
      food: ["FOOD"],
      clothing: ["CLOTHING"],
      medical: ["MEDICAL SUPPLIES"],
    };
    return c.tags.some((t) => tagMap[activeFilter].includes(t));
  });

  const handleRegister = (id: string) => {
    // Navigate to registration page or open modal
    console.log("Register at:", id);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 pt-28 md:pt-32 pb-24 md:pb-32">
      <LocationsHero />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <CategorySidebar active={activeFilter} onChange={setActiveFilter} />
        <LocationsGrid centers={filtered} onRegister={handleRegister} />
      </div>

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

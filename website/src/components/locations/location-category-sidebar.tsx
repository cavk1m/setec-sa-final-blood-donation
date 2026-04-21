"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CategoryFilter, CATEGORIES } from "@/definitions/locations";

interface CategorySidebarProps {
  active: CategoryFilter;
  onChange: (c: CategoryFilter) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  apps: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  bloodtype: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C8.5 7 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-4.5-8-8-13z" />
    </svg>
  ),
  restaurant: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  checkroom: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <polyline points="9 3 12 6 15 3" />
      <path d="M12 6v15" />
      <path d="M6 8.4a5 5 0 0 0-3 4.6v1h18v-1a5 5 0 0 0-3-4.6" />
    </svg>
  ),
  medical_services: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
};

export function CategorySidebar({ active, onChange }: CategorySidebarProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  return (
    <aside className="lg:col-span-3 space-y-10">
      {/* Categories */}
      <div>
        <button
          type="button"
          onClick={() => setCategoriesOpen((prev) => !prev)}
          className="w-full flex items-center justify-between rounded-xl border border-[#e0bfbf]/50 bg-white px-5 py-4 text-left"
          aria-expanded={categoriesOpen}
          aria-controls="location-categories-panel"
        >
          <h3 className="font-serif text-2xl font-bold text-[#670017]">
            Categories
          </h3>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "w-5 h-5 text-[#670017] transition-transform duration-200",
              categoriesOpen ? "rotate-180" : "",
            )}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div
          id="location-categories-panel"
          className={cn(
            "overflow-hidden transition-all duration-300",
            categoriesOpen
              ? "max-h-[520px] opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0",
          )}
        >
          <div className="flex flex-col gap-3">
            {CATEGORIES.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={cn(
                  "flex justify-between items-center px-6 py-4 rounded-xl font-sans font-medium transition-all text-left cursor-pointer",
                  active === id
                    ? "bg-[#670017] text-white font-bold shadow-lg shadow-[#670017]/20"
                    : "bg-[#f1ecf2] hover:bg-[#ebe7ec] text-[#584141]",
                )}
              >
                <span>{label}</span>
                <span
                  className={active === id ? "text-white/70" : "text-[#670017]"}
                >
                  {ICON_MAP[icon]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mini map card */}
    </aside>
  );
}

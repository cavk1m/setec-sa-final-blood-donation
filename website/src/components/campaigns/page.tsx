"use client";

import { useState, useMemo } from "react";
import { CampaignsHero } from "./campaigns-hero";
import { FilterBar } from "./filter-bar";
import { CampaignsGrid } from "./cards/campaign-grid";
import { VolunteerCTA } from "./volunteer-cta";
import { CampaignFilter } from "@/definitions/campaign";
import { useGetCampaigns } from "@/hooks/use-campaign";

export function CampaignsPage() {
  const [activeFilter, setActiveFilter] = useState<CampaignFilter>("all");

  const { data, isLoading, isError } = useGetCampaigns();

  const allCampaigns = data?.campaigns ?? [];

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? allCampaigns
        : allCampaigns.filter((c) => c.campaign_type === activeFilter),
    [allCampaigns, activeFilter],
  );

  const handleDonate = (id: string) => {
    // Navigate to the donation registration wizard
    window.location.href = "/donate";
  };
  const handleShare  = (id: string) => console.log("Share:", id);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 pt-28 md:pt-32 pb-24 md:pb-32">
      <CampaignsHero totalActive={allCampaigns.length} />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-4 border-[#f1ecf2] border-t-[#670017] animate-spin"
              role="status"
              aria-label="Loading campaigns"
            />
            <p className="font-sans text-[#584141] text-sm">Loading campaigns…</p>
          </div>
        </div>
      )}

      {/* Error */}
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
            Could not load campaigns
          </p>
          <p className="font-sans text-[#584141]/60 text-sm mt-1">
            Please check your connection and try again.
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && (
        <CampaignsGrid
          campaigns={filtered}
          onDonate={handleDonate}
          onShare={handleShare}
        />
      )}

      <VolunteerCTA />
    </div>
  );
}

export default CampaignsPage;

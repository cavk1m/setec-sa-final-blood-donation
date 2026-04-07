// components/campaigns-page/CampaignsPage.tsx
"use client";

import { useState } from "react";
import { CampaignsHero } from "./campaigns-hero";
import { FilterBar } from "./filter-bar";
import { CampaignsGrid } from "./cards/campaign-grid";
import { VolunteerCTA } from "./volunteer-cta";
import { CampaignFilter, CAMPAIGNS } from "@/src/definitions/campaign";

export function CampaignsPage() {
  const [activeFilter, setActiveFilter] = useState<CampaignFilter>("all");

  const filtered = CAMPAIGNS.filter(
    (c) => activeFilter === "all" || c.filter === activeFilter,
  );

  const handleDonate = (id: string) => console.log("Donate:", id);
  const handleVolunteer = (id: string) => console.log("Volunteer:", id);
  const handleShare = (id: string) => console.log("Share:", id);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-20 pt-28 md:pt-32 pb-24 md:pb-32">
      <CampaignsHero totalActive={24} />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <CampaignsGrid
        campaigns={filtered}
        onDonate={handleDonate}
        onVolunteer={handleVolunteer}
        onShare={handleShare}
      />
      <VolunteerCTA />
    </div>
  );
}

export default CampaignsPage;

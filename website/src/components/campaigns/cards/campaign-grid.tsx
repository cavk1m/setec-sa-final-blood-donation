// components/campaigns-page/CampaignsGrid.tsx

import { Campaign } from "@/src/definitions/campaign";
import { CampaignCard } from "./campaign-card";
// import { Campaign } from "@/definitions/campaigns";

interface CampaignsGridProps {
  campaigns: Campaign[];
  onDonate: (id: string) => void;
  onVolunteer: (id: string) => void;
  onShare: (id: string) => void;
}

export function CampaignsGrid({
  campaigns,
  onDonate,
  onVolunteer,
  onShare,
}: CampaignsGridProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-24 text-[#584141] font-sans">
        <p className="text-lg font-medium">
          No campaigns found for this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onDonate={onDonate}
          onVolunteer={onVolunteer}
          onShare={onShare}
        />
      ))}
    </div>
  );
}

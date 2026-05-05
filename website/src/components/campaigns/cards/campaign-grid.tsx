import { ApiCampaign } from "@/definitions/campaign";
import { CampaignCard } from "./campaign-card";

interface CampaignsGridProps {
  campaigns: ApiCampaign[];
  onDonate: (id: string) => void;
  onShare: (id: string) => void;
}

export function CampaignsGrid({ campaigns, onDonate, onShare }: CampaignsGridProps) {
  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e0bfbf"
          strokeWidth="1.5"
          className="w-16 h-16 mb-4"
        >
          <path d="M12 2C8.5 7 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-4.5-8-8-13z" />
        </svg>
        <p className="text-lg font-medium text-[#584141] font-sans">
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
          onShare={onShare}
        />
      ))}
    </div>
  );
}

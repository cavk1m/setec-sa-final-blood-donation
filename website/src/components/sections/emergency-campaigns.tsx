"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetCampaigns } from "@/hooks/use-campaign";
import { ApiCampaign, CampaignType } from "@/definitions/campaign";

// ─── Badge style map ──────────────────────────────────────────────────────────
const TYPE_STYLE: Record<string, { label: string; bg: string }> = {
  blood:   { label: "Urgent",     bg: "bg-[#670017]" },
  food:    { label: "Food Drive", bg: "bg-[#9c404b]" },
  medical: { label: "Medical",    bg: "bg-[#512122]" },
  shelter: { label: "Shelter",    bg: "bg-[#7a3b3b]" },
};

function getBadge(type: CampaignType) {
  return TYPE_STYLE[type] ?? { label: String(type).toUpperCase(), bg: "bg-[#670017]" };
}

const FALLBACK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvEt4cyjY8lo7JAcR6D8jTc2oInWzBTNak0cxeiArO3-Jo4ypcH1QZ7uuU0VZrnFuCtimi6rPwVF0e7pt9IUQrJt9obUyIYrba25VEkQq5gsB0vkbmVIqZ-2rggmWDy3eHpUoUYzfKnD-n-K0q7fg5YZUt7HZq_3E4_V4FDfDylkJeTt8Ddf78BkCd6PFOduxh6iOxOcu5KbBYOkX97Noc0dQaAJdxHIrXua3MqGzhEc2v5qEUTUhZeFk9qS9zIZP3VGSr1ZOV-KEm";

// ─── Campaign Card ─────────────────────────────────────────────────────────────
function CampaignCard({ campaign }: { campaign: ApiCampaign }) {
  const badge  = getBadge(campaign.campaign_type);
  const imgSrc = campaign.image_url || FALLBACK;

  return (
    <Card className="group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border-[#e0bfbf]/30 bg-white rounded-xl">
      {/* Image */}
      <div className="h-64 overflow-hidden relative">
        <Image
          src={imgSrc}
          alt={campaign.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge className={`${badge.bg} text-white text-[10px] font-bold uppercase tracking-widest border-0`}>
            {badge.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-grow p-8 pb-4">
        <h3 className="text-2xl font-serif font-semibold mb-4 text-[#1c1b1f] leading-snug">
          {campaign.title}
        </h3>
        <p className="text-[#584141] text-sm flex-grow leading-relaxed font-sans line-clamp-2">
          {campaign.description}
        </p>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-sans text-[#584141] mb-1">
            <span className="font-bold text-[#670017]">{Math.min(campaign.progress_percent, 100)}%</span>
            <span>{campaign.current_amount.toLocaleString()} / {campaign.target_amount.toLocaleString()}</span>
          </div>
          <div className="w-full h-1.5 bg-[#f1ecf2] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(campaign.progress_percent, 100)}%`,
                background: "linear-gradient(to right, #670017, #8c1127)",
              }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8 pt-4">
        <Button className="w-full rounded-full bg-[#670017] hover:bg-[#8c1127] text-white font-bold font-sans">
          Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function EmergencyCampaigns() {
  const { data, isLoading } = useGetCampaigns();
  const campaigns = (data?.campaigns ?? []).slice(0, 3);

  return (
    <section className="py-24 bg-[#fdf8fd]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#670017] font-bold uppercase tracking-[0.15em] text-xs mb-4 block font-sans">
              Current Priorities
            </span>
            <h2 className="text-4xl md:text-6xl text-[#1c1b1f] leading-tight font-serif">
              Emergency <br />
              <span className="italic">Campaigns</span>
            </h2>
          </div>
          <p className="text-[#584141] max-w-sm mb-2 font-sans text-sm leading-relaxed">
            Join our active efforts to stabilize local health crises and provide
            rapid response aid.
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
                <div className="h-64 bg-[#f1ecf2]" />
                <div className="p-8 space-y-3">
                  <div className="h-5 bg-[#f1ecf2] rounded w-3/4" />
                  <div className="h-4 bg-[#f1ecf2] rounded w-full" />
                  <div className="h-4 bg-[#f1ecf2] rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default EmergencyCampaigns;

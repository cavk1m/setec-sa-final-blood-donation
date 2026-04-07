// components/campaigns-page/CampaignCard.tsx

import { Button } from "@/components/ui/button";
import { Campaign } from "@/src/definitions/campaign";
// import { Campaign } from "@/definitions/campaign";

interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (id: string) => void;
  onVolunteer?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function CampaignCard({
  campaign,
  onDonate,
  onVolunteer,
  onShare,
}: CampaignCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(88,65,65,0.08)] flex flex-col transition-transform duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase shadow-xl text-white"
            style={{ backgroundColor: campaign.badgeBg }}
          >
            {campaign.badge}
          </span>
        </div>
        {/* Bottom gradient + location */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-90 font-sans">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="w-3 h-3"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {campaign.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col grow">
        <h3 className="font-serif text-3xl font-bold text-[#1c1b1f] mb-3 group-hover:text-[#670017] transition-colors">
          {campaign.title}
        </h3>
        <p className="font-sans text-[#584141] mb-8 line-clamp-2 text-sm leading-relaxed">
          {campaign.description}
        </p>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="font-sans text-xs font-bold text-[#670017] tracking-widest uppercase">
              {campaign.pct}% Fulfilled
            </span>
            <span className="font-sans text-xs text-[#584141]">
              {campaign.metric}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#f1ecf2] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${campaign.pct}%`,
                background: "linear-gradient(to right, #670017, #8c1127)",
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => onDonate(campaign.id)}
              className="grow rounded-full text-xs font-bold tracking-widest uppercase text-white shadow-lg shadow-[#670017]/20 active:scale-95 transition-all font-sans"
              style={{
                background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
              }}
            >
              {campaign.primaryCta}
            </Button>

            {campaign.secondaryCta && onVolunteer ? (
              <Button
                variant="outline"
                onClick={() => onVolunteer(campaign.id)}
                className="px-6 border border-[#e0bfbf] text-[#670017] rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#670017]/5 transition-colors font-sans"
              >
                {campaign.secondaryCta}
              </Button>
            ) : (
              <button
                onClick={() => onShare?.(campaign.id)}
                className="px-4 border border-[#e0bfbf] text-[#670017] rounded-full hover:bg-[#670017]/5 transition-colors cursor-pointer"
                aria-label="Share"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

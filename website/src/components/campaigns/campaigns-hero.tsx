// components/campaigns-page/CampaignsHero.tsx

interface CampaignsHeroProps {
  totalActive: number;
}

export function CampaignsHero({ totalActive }: CampaignsHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
      <div className="lg:col-span-8">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#670017] leading-[0.95] mb-5">
          Our Global <br />
          <span className="italic font-normal">Impact</span> Missions.
        </h1>
        <p className="font-sans text-base md:text-lg text-[#584141] max-w-2xl leading-relaxed">
          Every second counts. Browse our active humanitarian efforts and join a
          community dedicated to restoring hope where it's needed most.
        </p>
      </div>
      <div className="lg:col-span-4 flex lg:justify-end pb-2">
        <div className="flex items-center gap-2 text-[#670017] font-sans font-bold tracking-widest uppercase text-xs">
          <svg viewBox="0 0 24 24" fill="#670017" className="w-4 h-4">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Active Campaigns: {totalActive}
        </div>
      </div>
    </div>
  );
}

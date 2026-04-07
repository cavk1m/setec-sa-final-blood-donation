// components/donation-page/CampaignInfo.tsx

interface CampaignInfoProps {
  badge?: string;
  title: string;
  titleItalic: string;
  description: string;
  raised: number;
  goal: number;
}

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CampaignInfo({
  badge,
  title,
  titleItalic,
  description,
  raised,
  goal,
}: CampaignInfoProps) {
  const pct = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="space-y-6">
      {/* Badge */}
      {badge ? (
        <span className="inline-block px-4 py-1 rounded-full bg-[#ffdadb] text-[#40000d] text-xs font-bold tracking-widest uppercase font-sans">
          {badge}
        </span>
      ) : null}

      {/* Headline */}
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#670017] leading-[1.02] md:leading-[0.95]">
        {title}
        <span className="block md:inline md:ml-2 italic font-normal">
          {titleItalic}
        </span>
      </h1>

      {/* Description */}
      <p className="font-sans text-base md:text-lg text-[#584141] max-w-2xl leading-relaxed">
        {description}
      </p>

      {/* Progress card */}
      <div className="bg-[#f1ecf2] p-8 rounded-xl space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#584141] uppercase tracking-widest font-sans">
              Campaign Goal
            </p>
            <p className="text-3xl font-serif font-bold text-[#670017]">
              {formatUSD(raised)}{" "}
              <span className="text-lg text-[#584141]/60 font-medium font-sans">
                of {formatUSD(goal)}
              </span>
            </p>
          </div>
          <p className="text-sm font-bold text-[#670017] font-sans">
            {pct}% Funded
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-3 w-full bg-[#e5e1e7] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

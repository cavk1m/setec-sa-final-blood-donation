import { cn } from "@/lib/utils";
import { CampaignFilter, FILTER_TABS } from "@/definitions/campaign";
// import { CampaignFilter, FILTER_TABS } from "@/definitions/campaigns";

interface FilterBarProps {
  active: CampaignFilter;
  onChange: (f: CampaignFilter) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-12">
      {FILTER_TABS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            "px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all active:scale-95 cursor-pointer",
            active === id
              ? "bg-[#670017] text-white font-bold shadow-lg shadow-[#670017]/20"
              : "bg-[#e5e1e7] text-[#584141] hover:bg-[#ddd9de]",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

import { Separator } from "@/components/ui/separator";

const STATS = [
  { value: "48,210", label: "Lives Saved" },
  { value: "127", label: "Active Centers" },
  { value: "31", label: "Countries" },
  { value: "$2.4M", label: "Aid Distributed" },
];

export function StatsBanner() {
  return (
    <section className="bg-white border-y border-[#e0bfbf]/30">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#e0bfbf]/40">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-6 px-4 gap-1 group"
            >
              <span className="text-4xl md:text-5xl font-serif font-bold text-[#670017] tabular-nums group-hover:scale-105 transition-transform duration-300 origin-bottom">
                {value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#584141] font-bold font-sans">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBanner;

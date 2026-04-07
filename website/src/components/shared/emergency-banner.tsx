import { Badge } from "@/components/ui/badge";
export function EmergencyBanner() {
  return (
    <div className="fixed top-0 h-9 w-full z-70 bg-[#670017] flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 cursor-pointer hover:brightness-110 transition-all group">
      <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
      <Badge
        variant="outline"
        className="border-white/40 text-white bg-white/10 text-[10px] uppercase tracking-widest px-2 py-0 font-bold shrink-0 hidden sm:inline-flex"
      >
        Urgent
      </Badge>
      <p className="text-white text-xs sm:text-sm font-medium font-sans whitespace-nowrap overflow-hidden text-ellipsis">
        Critical Blood Shortage — Type O- Urgently Needed
      </p>
      <span className="ml-0.5 sm:ml-1 text-white/50 group-hover:text-white text-xs transition-colors shrink-0">
        →
      </span>
    </div>
  );
}

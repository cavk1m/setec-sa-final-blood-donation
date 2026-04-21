import { Button } from "@/components/ui/button";

export function VolunteerCTA() {
  return (
    <div className="mt-32 relative rounded-xl overflow-hidden p-12 lg:p-24 bg-[#f7f2f8] border border-[#e0bfbf]/20">
      {/* Right-side image (desktop) */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block pointer-events-none">
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to right, #f7f2f8, transparent)",
          }}
        />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHJI1JhnIvxte_DbVCofmh7X_gr_VIOKJEPyZv6B8zCiuldcVnvoevQyVp9XTOU7EO4vzyAEjGKdfBvFIkEJ_i8B441pp9p7chMisnsbyVjjvg7PcYTHyuwTUHWBg-k5wsdsGpSI9OmA1V642QP8bNHh-3sOYJj1eikxYxPn4wU7WDHkujl1TWGGWVWjJfEQGg0iTrpEvNkOK_JBiR6gUa2o0vfVEyJykf0FoRI98BbuAp14IHDlEZBf3KMT6RqypLPE2XqDyO90Z7"
          alt="Volunteer group working together"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-2xl">
        <span className="font-sans text-xs font-bold text-[#670017] tracking-[0.3em] uppercase mb-4 block">
          Be the Change
        </span>
        <h2 className="font-serif text-5xl lg:text-6xl font-bold text-[#1c1b1f] mb-8 leading-[1.1]">
          Join our Global Network of{" "}
          <span className="italic font-normal">Volunteers</span>.
        </h2>
        <p className="font-sans text-lg text-[#584141] mb-12 leading-relaxed">
          HopeFlow operates through the dedication of individuals just like you.
          Whether you give time, money, or blood, you are helping build a more
          resilient world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="px-10 py-4 rounded-full text-white font-sans text-xs font-bold tracking-widest uppercase shadow-xl shadow-[#670017]/30 hover:scale-105 active:scale-95 transition-all"
            style={{ background: "#670017" }}
          >
            Apply to Volunteer
          </Button>
          <Button
            variant="outline"
            className="px-10 py-4 rounded-full border border-[#670017] text-[#670017] font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#670017]/5 transition-colors"
          >
            Read Impact Stories
          </Button>
        </div>
      </div>
    </div>
  );
}

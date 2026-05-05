"use client";

import { Button } from "@/components/ui/button";
import { useGetSettings } from "@/hooks/use-settings";

export function HeroSection() {
  const { data: settings } = useGetSettings();

  // Use dynamic background from API if available, fallback to static hero.png
  const backgroundUrl = settings?.hero_background_url 
    ? (settings.hero_background_url.startsWith('http') ? settings.hero_background_url : `http://localhost:8081${settings.hero_background_url}`)
    : "/hero.png";

  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative blurred orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#670017]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/2 w-64 h-64 rounded-full bg-[#ae2d3d]/20 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto w-full px-6 lg:px-20">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-12">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shrink-0" />
            <span className="text-white text-xs font-bold tracking-wide font-sans">
              Emergency Response Active in 3 Regions
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-9xl text-white font-bold leading-[0.9] tracking-tight mb-10 font-serif">
            Give Blood.
            <br />
            <span className="italic font-normal text-white/90">Give Hope.</span>
            <br />
            Save Lives.
          </h1>

          {/* Sub */}
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-12 font-sans font-light leading-relaxed">
            HopeFlow connects blood donors, charity volunteers, and aid
            recipients during emergencies. Register online, receive your queue
            number, and skip the wait at donation centers.
          </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[#670017] hover:bg-white/90 rounded-full px-8 font-bold shadow-xl gap-2 font-sans active:scale-95 transition-transform"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#dc2626"
                className="w-5 h-5 shrink-0"
              >
                <path d="M12 2C8.5 7 4 10.5 4 15a8 8 0 0 0 16 0c0-4.5-4.5-8-8-13z" />
              </svg>
              Donate Blood
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/20 text-white backdrop-blur-md rounded-full px-8 font-bold hover:bg-white/10 gap-2 font-sans"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#f472b6"
                className="w-5 h-5 shrink-0"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Support Campaign
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/20 text-white backdrop-blur-md rounded-full px-8 font-bold hover:bg-white/10 gap-2 font-sans"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Find Centers
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

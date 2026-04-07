import EmergencyCampaigns from "@/src/components/sections/emergency-campaigns";
import HeroSection from "@/src/components/sections/hero-section";
import HowItWorks from "@/src/components/sections/howIt-works";
import NewsletterPartner from "@/src/components/sections/newsletter-partner";
import StatsBanner from "@/src/components/sections/stats-banner";

export default function HomePage() {
  return (
    <>
      {/* ── Page sections ──────────────────────────────────────── */}
      <main>
        <HeroSection />
        <StatsBanner />
        <EmergencyCampaigns />
        <HowItWorks />
        <NewsletterPartner />
      </main>
      {/* <HopeFlowFooter /> */}
    </>
  );
}

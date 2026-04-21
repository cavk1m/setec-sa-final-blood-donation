import EmergencyCampaigns from "@/components/sections/emergency-campaigns";
import HeroSection from "@/components/sections/hero-section";
import HowItWorks from "@/components/sections/howIt-works";
import NewsletterPartner from "@/components/sections/newsletter-partner";
import StatsBanner from "@/components/sections/stats-banner";

export default function HomePage() {
  return (
    <>
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

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Campaign {
  id: string;
  badge: string;
  badgeVariant: "destructive" | "secondary" | "outline";
  badgeBg: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaVariant: "default" | "outline";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CAMPAIGNS: Campaign[] = [
  {
    id: "blood-drive",
    badge: "Urgent",
    badgeVariant: "destructive",
    badgeBg: "bg-[#670017]",
    image:
      "https://www.reuters.com/resizer/v2/LMJ272HLOVIAROEVUYC5HXH4SQ.jpg?auth=12ee5d46c850558bab4f6f63385994414f2d4cda6319c0f4e0442a73214a9aac",
    imageAlt: "Cambodia–Thailand fighting photo",
    title: "Blood Drive — Eastern Province Crisis Response",
    description:
      "Rapid mobilization required to support local hospitals facing unexpected shortages due to the recent environmental crisis.",
    ctaLabel: "Donate Blood",
    ctaVariant: "default",
  },
  {
    id: "flood-relief",
    badge: "Food Drive",
    badgeVariant: "secondary",
    badgeBg: "bg-[#9c404b]",
    image:
      "https://static01.nyt.com/images/2025/08/24/multimedia/24int-thailand-cambodia-wtk-htcj/24int-thailand-cambodia-wtk-htcj-videoSixteenByNine3000.jpg",
    imageAlt: "Thailand–Cambodia border conflict photo",
    title: "Flood Relief — Emergency Food & Drive",
    description:
      "Collecting non-perishable goods and essential clothing items for over 500 families displaced by recent coastal flooding.",
    ctaLabel: "Fund Campaign",
    ctaVariant: "outline",
  },
  {
    id: "medical-supply",
    badge: "Medical",
    badgeVariant: "outline",
    badgeBg: "bg-[#512122]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDT48TfbjqlZGuqdWV_rnDe65L4VkoFlgwr3RlyNyKd4YuSlG1V7SgQ49liOhryEBsf3feYLBoidJY_ELX-imjfAYpN3ZOE7-NgGjsUxrS2P_oVK3Qy2Q7HVaNWVBVrBVH7Fa7BPQSjK0ob97YLE8fQsYseUOx3Ib4bt9-YV_oh_ShvSTpYPZaYpfvmNDclv6PyYvetZ0G616AADPuaaYOoIfT39HxBxQesMkmlWeNqmEFI02zNNGhu8GtmJH1QznYtpKPM8Yn5HDkV",
    imageAlt: "Medical clinic",
    title: "Pediatric Ward Medical Supply Campaign",
    description:
      "Securing essential surgical equipment and specialized pediatric care supplies for rural community health centers.",
    ctaLabel: "Donate Now",
    ctaVariant: "default",
  },
];

// ─── Campaign Card ─────────────────────────────────────────────────────────────
function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border-[#e0bfbf]/30 bg-white rounded-xl">
      {/* Image */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={campaign.image}
          alt={campaign.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge
            className={`${campaign.badgeBg} text-white text-[10px] font-bold uppercase tracking-widest border-0`}
          >
            {campaign.badge}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-grow p-8 pb-4">
        <h3 className="text-2xl font-serif font-semibold mb-4 text-[#1c1b1f] leading-snug">
          {campaign.title}
        </h3>
        <p className="text-[#584141] text-sm flex-grow leading-relaxed font-sans">
          {campaign.description}
        </p>
      </CardContent>

      <CardFooter className="px-8 pb-8 pt-4">
        <Button
          variant={campaign.ctaVariant}
          className={
            campaign.ctaVariant === "default"
              ? "w-full rounded-full bg-[#670017] hover:bg-[#8c1127] text-white font-bold font-sans"
              : "w-full rounded-full border-[#e0bfbf] text-[#670017] hover:bg-[#ffdada] font-bold font-sans"
          }
        >
          {campaign.ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function EmergencyCampaigns() {
  return (
    <section className="py-24 bg-[#fdf8fd]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#670017] font-bold uppercase tracking-[0.15em] text-xs mb-4 block font-sans">
              Current Priorities
            </span>
            <h2 className="text-4xl md:text-6xl text-[#1c1b1f] leading-tight font-serif">
              Emergency <br />
              <span className="italic">Campaigns</span>
            </h2>
          </div>
          <p className="text-[#584141] max-w-sm mb-2 font-sans text-sm leading-relaxed">
            Join our active efforts to stabilize local health crises and provide
            rapid response aid.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EmergencyCampaigns;

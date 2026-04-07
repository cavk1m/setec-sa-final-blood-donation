import { Separator } from "@/components/ui/separator";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const RegisterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#670017"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

const QueueIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#670017"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#670017"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ImpactIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#670017"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  {
    step: 1,
    title: "Register Online",
    description:
      "Simple digital onboarding to verify your status and health profile.",
    icon: <RegisterIcon />,
  },
  {
    step: 2,
    title: "Receive Queue Number",
    description:
      "Instant digital token that secures your priority slot at the center.",
    icon: <QueueIcon />,
  },
  {
    step: 3,
    title: "Visit the Center",
    description: "Head to your chosen location with your digital pass ready.",
    icon: <LocationIcon />,
  },
  {
    step: 4,
    title: "Make Your Impact",
    description:
      "Contribute to life-saving aid and receive updates on your impact.",
    icon: <ImpactIcon />,
  },
];

// ─── Connector arrow ──────────────────────────────────────────────────────────
const ConnectorArrow = () => (
  <div className="hidden md:flex items-center justify-center absolute top-12 w-full left-0 z-0 pointer-events-none">
    <div className="w-full h-px bg-[#e0bfbf]/50" />
  </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────
export function HowItWorks() {
  return (
    <section className="py-24 bg-[#f7f2f8]">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-[#670017] font-bold uppercase tracking-[0.15em] text-xs mb-4 block font-sans">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl mb-4 font-serif text-[#1c1b1f]">
            How <span className="italic text-[#670017]">HopeFlow</span> Works
          </h2>
          <div className="h-1 w-20 bg-[#670017] mx-auto rounded-full mt-4" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Horizontal connector line */}
          <div className="hidden md:block absolute top-[3rem] left-0 w-full h-px bg-[#e0bfbf]/40 z-0" />

          {STEPS.map(({ step, title, description, icon }) => (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center text-center gap-4"
            >
              {/* Circle icon */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#f7f2f8] relative group hover:-translate-y-1 transition-transform duration-300">
                {icon}
                {/* Step number badge */}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#670017] text-white text-[10px] font-bold flex items-center justify-center font-sans shadow-md">
                  {step}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold mb-2 text-[#1c1b1f] font-sans">
                  {title}
                </h4>
                <p className="text-sm text-[#584141] leading-relaxed font-sans max-w-[180px] mx-auto">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

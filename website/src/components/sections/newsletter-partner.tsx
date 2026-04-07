"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { toast } from "sonner"; // or your preferred toast lib

export function NewsletterPartner() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to real API
    // toast?.success?.("You're subscribed! We'll alert you first.");
    setEmail("");
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl">
          {/* ── Left: Newsletter ── */}
          <div className="bg-[#670017] p-12 md:p-16 flex flex-col justify-center">
            <span className="text-white/50 font-bold uppercase tracking-[0.15em] text-xs mb-4 block font-sans">
              Stay Informed
            </span>
            <h3 className="text-3xl md:text-4xl text-white font-serif mb-4 leading-snug">
              Stay informed.
              <br />
              Be the first to help.
            </h3>
            <p className="text-white/60 mb-10 max-w-md font-sans text-sm leading-relaxed">
              Get instant alerts about critical blood shortages and emergency
              campaigns in your area.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="grow bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full px-6 focus-visible:ring-white/50 focus-visible:border-transparent font-sans"
              />
              <Button
                type="submit"
                className="bg-white text-[#670017] hover:bg-white/90 rounded-full px-8 font-bold font-sans whitespace-nowrap active:scale-95 transition-transform"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* ── Right: Partner ── */}
          <div className="bg-[#ebe7ec] relative overflow-hidden group flex items-center p-12 md:p-16">
            {/* Background image with hover de-grayscale */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7ea4p-FeEGdoLjS3N6Myl3TEzgIkW0DbuyC5zkgGMXCuKUxeytj_ehypDOkMYFKXWICJcxN7MICdJU1kuXhU3_0HnamIfKNf4zJ_GxbPuZDkT188ifv3Xafm6TsxgbuRtuDzxrqXDPgktN017EmT89pK5-mhDVcWDKLxQsKoMc_RuW8JHzAsNqtu4X7Edi_OzH7fFazx8fk7dCEAQ0pvcar4RD5zs0KqE-Kk6l5TKlWcEv1Pz64kICyBlM6eLjnEkAe4t-xIq7b28"
              alt="Volunteers shaking hands"
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-1000"
            />

            <div className="relative z-10">
              <span className="text-[#670017] font-bold uppercase tracking-[0.15em] text-xs mb-4 block font-sans">
                Collaborate
              </span>
              <h3 className="text-3xl md:text-4xl text-[#670017] font-serif mb-4 leading-snug">
                Partner with us.
              </h3>
              <p className="text-[#584141] mb-10 max-w-md font-sans text-sm leading-relaxed">
                We work with local clinics, NGOs, and global aid organizations
                to streamline emergency logistics.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#670017] font-bold text-base hover:underline decoration-2 underline-offset-8 font-sans group/link"
              >
                View partnership opportunities
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterPartner;

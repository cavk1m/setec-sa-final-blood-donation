"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LocationsHero() {
  const [query, setQuery] = useState("");

  return (
    <section className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start lg:items-end mb-16 md:mb-20">
      {/* Headline */}
      <div className="lg:w-2/3">
        <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-[#670017] tracking-tighter leading-[0.95] mb-5">
          Find Your Near
          <br />
          <span className="italic font-light">Contribution Center.</span>
        </h1>
        <p className="font-sans text-base md:text-lg text-[#584141] max-w-2xl leading-relaxed">
          Locate the nearest point of impact. From critical blood donations to
          essential medical supplies, your journey to giving starts here.
        </p>
      </div>

      {/* Search bar */}
      <div className="lg:w-1/3 w-full">
        <div className="bg-[#f7f2f8] p-2 rounded-full flex items-center border border-[#e0bfbf]/30 focus-within:ring-2 focus-within:ring-[#670017] transition-all">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#584141"
            strokeWidth="2"
            className="w-5 h-5 mx-4 shrink-0"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <Input
            type="text"
            placeholder="Search by city or zip code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none focus-visible:ring-0 w-full font-sans text-[#1c1b1f] placeholder:text-[#8c7070]/60 py-3 shadow-none"
          />
          <Button
            className="rounded-full px-8 py-3 font-bold text-white shrink-0"
            style={{
              background: "linear-gradient(135deg, #670017 0%, #8c1127 100%)",
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}

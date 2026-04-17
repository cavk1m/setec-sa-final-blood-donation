"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { EmergencyBanner } from "./emergency-banner";
import { DesktopNavItem } from "./des-nav";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Location",
    href: "/locations",
  },
  {
    label: "Campaign",
    href: "/campaigns",
    // children: [
    //   {
    //     label: "Blood Drives",
    //     href: "#",
    //     description: "Active emergency blood campaigns",
    //   },
    //   {
    //     label: "Food & Relief",
    //     href: "#",
    //     description: "Disaster relief and food aid",
    //   },
    //   {
    //     label: "Medical Supply",
    //     href: "#",
    //     description: "Pediatric and medical supply drives",
    //   },
    // ],
  },
  { label: "Donate", href: "/donate" },
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <EmergencyBanner />

      <header
        className={cn(
          "fixed top-9 w-full z-50 transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-[#670017]/8  border-[#e0bfbf]/60"
            : "bg-black/40 backdrop-blur-xl",
        )}
      >
        <div className="max-w-screen-2xl lg:px-20 mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "text-xl sm:text-2xl font-serif italic tracking-tight shrink-0 transition-colors duration-300",
              scrolled ? "text-[#670017]" : "text-white",
            )}
          >
            HopeFlow
          </Link>

          {/* Desktop nav pill */}
          <div
            className={cn(
              "hidden md:flex items-center rounded-full px-2 py-1 transition-all duration-300",
              scrolled
                ? "bg-[#f1ecf2] border border-[#e0bfbf]"
                : "bg-white/10 border border-white/20",
            )}
          >
            {/* <Badge className="mr-2 text-[10px] font-bold uppercase tracking-widest bg-[#670017] hover:bg-[#8c1127] border-0 cursor-pointer select-none">
              Urgent
            </Badge> */}

            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {NAV_ITEMS.map((item) => (
                  <DesktopNavItem
                    key={item.label}
                    item={item}
                    scrolled={scrolled}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "hidden md:inline-flex text-xs font-bold tracking-widest font-sans transition-colors",
                scrolled
                  ? "text-[#670017] hover:bg-[#ffdada]"
                  : "text-white/80 hover:text-white hover:bg-white/10",
              )}
            >
              EN
            </Button>

            <Link href="/register" className="md:hidden">
              <Button
                size="sm"
                className={cn(
                  "h-8 rounded-full px-3 text-xs font-bold shadow-md transition-all active:scale-95 font-sans",
                  scrolled
                    ? "bg-[#670017] text-white hover:bg-[#8c1127]"
                    : "bg-white text-[#670017] hover:bg-white/90",
                )}
              >
                Register
              </Button>
            </Link>

            <Link href="/register" className="hidden md:inline-flex">
              <Button
                className={cn(
                  "rounded-full text-sm font-bold shadow-lg transition-all active:scale-95 font-sans",
                  scrolled
                    ? "bg-[#670017] text-white hover:bg-[#8c1127]"
                    : "bg-white text-[#670017] hover:bg-white/90",
                )}
              >
                Register as Donor
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden rounded-full",
                    scrolled
                      ? "text-[#670017] hover:bg-[#ffdada]"
                      : "text-white hover:bg-white/10",
                  )}
                  aria-label="Open menu"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      y="3"
                      width="20"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      y="9"
                      width="14"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      y="15"
                      width="20"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 bg-white p-0">
                <SheetHeader className="p-6 pb-4 border-b border-[#e0bfbf]">
                  <SheetTitle className="text-2xl font-serif italic text-[#670017]">
                    HopeFlow
                  </SheetTitle>
                  <Badge className="w-fit text-[10px] font-bold uppercase tracking-widest bg-[#670017] border-0">
                    Urgent — O- Needed
                  </Badge>
                </SheetHeader>

                <nav className="p-6 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        className="block py-3 px-4 rounded-xl text-sm font-bold text-[#1c1b1f] hover:bg-[#ffdada] hover:text-[#670017] transition-colors font-sans"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {/* {"children" in item && item.children && (
                        <div className="ml-4 mt-1 flex flex-col gap-0.5">
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="block py-2 px-4 rounded-lg text-xs text-[#584141] hover:text-[#670017] hover:bg-[#ffdada]/50 transition-colors font-sans"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )} */}
                    </div>
                  ))}
                </nav>

                <Separator />
                <div className="p-6">
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-full bg-[#670017] hover:bg-[#8c1127] text-white font-bold font-sans">
                      Register as Donor
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

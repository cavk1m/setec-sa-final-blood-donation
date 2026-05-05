// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   NavigationMenu,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";
// import { EmergencyBanner } from "./emergency-banner";
// import { DesktopNavItem } from "./des-nav";
// import { cn } from "@/lib/utils";

// const NAV_ITEMS = [
//   { label: "Home", href: "/" },
//   {
//     label: "Location",
//     href: "/locations",
//   },
//   {
//     label: "Campaign",
//     href: "/campaigns",
//     // children: [
//     //   {
//     //     label: "Blood Drives",
//     //     href: "#",
//     //     description: "Active emergency blood campaigns",
//     //   },
//     //   {
//     //     label: "Food & Relief",
//     //     href: "#",
//     //     description: "Disaster relief and food aid",
//     //   },
//     //   {
//     //     label: "Medical Supply",
//     //     href: "#",
//     //     description: "Pediatric and medical supply drives",
//     //   },
//     // ],
//   },
//   { label: "Donate", href: "/donate" },
// ];
// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <EmergencyBanner />

//       <header
//         className={cn(
//           "fixed top-9 w-full z-50 transition-all duration-500 ease-in-out",
//           scrolled
//             ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-[#670017]/8  border-[#e0bfbf]/60"
//             : "bg-black/40 backdrop-blur-xl",
//         )}
//       >
//         <div className="max-w-screen-2xl lg:px-20 mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
//           {/* Logo */}
//           <Link
//             href="/"
//             className={cn(
//               "text-xl sm:text-2xl font-serif italic tracking-tight shrink-0 transition-colors duration-300",
//               scrolled ? "text-[#670017]" : "text-white",
//             )}
//           >
//             HopeFlow
//           </Link>

//           {/* Desktop nav pill */}
//           <div
//             className={cn(
//               "hidden md:flex items-center rounded-full px-2 py-1 transition-all duration-300",
//               scrolled
//                 ? "bg-[#f1ecf2] border border-[#e0bfbf]"
//                 : "bg-white/10 border border-white/20",
//             )}
//           >
//             {/* <Badge className="mr-2 text-[10px] font-bold uppercase tracking-widest bg-[#670017] hover:bg-[#8c1127] border-0 cursor-pointer select-none">
//               Urgent
//             </Badge> */}

//             <NavigationMenu>
//               <NavigationMenuList className="gap-0">
//                 {NAV_ITEMS.map((item) => (
//                   <DesktopNavItem
//                     key={item.label}
//                     item={item}
//                     scrolled={scrolled}
//                   />
//                 ))}
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>

//           {/* Right actions */}
//           <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
//             <Button
//               variant="ghost"
//               size="sm"
//               className={cn(
//                 "hidden md:inline-flex text-xs font-bold tracking-widest font-sans transition-colors",
//                 scrolled
//                   ? "text-[#670017] hover:bg-[#ffdada]"
//                   : "text-white/80 hover:text-white hover:bg-white/10",
//               )}
//             >
//               EN
//             </Button>

//             <Link href="/register" className="md:hidden">
//               <Button
//                 size="sm"
//                 className={cn(
//                   "h-8 rounded-full px-3 text-xs font-bold shadow-md transition-all active:scale-95 font-sans",
//                   scrolled
//                     ? "bg-[#670017] text-white hover:bg-[#8c1127]"
//                     : "bg-white text-[#670017] hover:bg-white/90",
//                 )}
//               >
//                 Register
//               </Button>
//             </Link>

//             <Link href="/register" className="hidden md:inline-flex">
//               <Button
//                 className={cn(
//                   "rounded-full text-sm font-bold shadow-lg transition-all active:scale-95 font-sans",
//                   scrolled
//                     ? "bg-[#670017] text-white hover:bg-[#8c1127]"
//                     : "bg-white text-[#670017] hover:bg-white/90",
//                 )}
//               >
//                 Register as Donor
//               </Button>
//             </Link>

//             {/* Mobile menu */}
//             <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className={cn(
//                     "md:hidden rounded-full",
//                     scrolled
//                       ? "text-[#670017] hover:bg-[#ffdada]"
//                       : "text-white hover:bg-white/10",
//                   )}
//                   aria-label="Open menu"
//                 >
//                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                     <rect
//                       y="3"
//                       width="20"
//                       height="2"
//                       rx="1"
//                       fill="currentColor"
//                     />
//                     <rect
//                       y="9"
//                       width="14"
//                       height="2"
//                       rx="1"
//                       fill="currentColor"
//                     />
//                     <rect
//                       y="15"
//                       width="20"
//                       height="2"
//                       rx="1"
//                       fill="currentColor"
//                     />
//                   </svg>
//                 </Button>
//               </SheetTrigger>

//               <SheetContent side="right" className="w-72 bg-white p-0">
//                 <SheetHeader className="p-6 pb-4 border-b border-[#e0bfbf]">
//                   <SheetTitle className="text-2xl font-serif italic text-[#670017]">
//                     HopeFlow
//                   </SheetTitle>
//                   <Badge className="w-fit text-[10px] font-bold uppercase tracking-widest bg-[#670017] border-0">
//                     Urgent — O- Needed
//                   </Badge>
//                 </SheetHeader>

//                 <nav className="p-6 flex flex-col gap-1">
//                   {NAV_ITEMS.map((item) => (
//                     <div key={item.label}>
//                       <Link
//                         href={item.href}
//                         className="block py-3 px-4 rounded-xl text-sm font-bold text-[#1c1b1f] hover:bg-[#ffdada] hover:text-[#670017] transition-colors font-sans"
//                         onClick={() => setMobileOpen(false)}
//                       >
//                         {item.label}
//                       </Link>
//                       {/* {"children" in item && item.children && (
//                         <div className="ml-4 mt-1 flex flex-col gap-0.5">
//                           {item.children.map((child) => (
//                             <a
//                               key={child.label}
//                               href={child.href}
//                               className="block py-2 px-4 rounded-lg text-xs text-[#584141] hover:text-[#670017] hover:bg-[#ffdada]/50 transition-colors font-sans"
//                               onClick={() => setMobileOpen(false)}
//                             >
//                               {child.label}
//                             </a>
//                           ))}
//                         </div>
//                       )} */}
//                     </div>
//                   ))}
//                 </nav>

//                 <Separator />
//                 <div className="p-6">
//                   <Link href="/register" onClick={() => setMobileOpen(false)}>
//                     <Button className="w-full rounded-full bg-[#670017] hover:bg-[#8c1127] text-white font-bold font-sans">
//                       Register as Donor
//                     </Button>
//                   </Link>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

// components/Header.tsx
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
import { getUserInfo, useAuthStore } from "@/hooks/zustand/use-auth-store";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Location", href: "/locations" },
  { label: "Campaign", href: "/campaigns" },
  { label: "Donate", href: "/donate" },
];

// ─── Profile Avatar ───────────────────────────────────────────────────────────

function UserAvatar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const profile = useAuthStore((s) => s.profile);
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  // Display name: prefer profile.full_name, fallback to user.email
  const displayName = profile?.full_name ?? user?.email ?? "User";

  // Extract initials from full_name if available, otherwise use email
  const initials = profile?.full_name
    ? profile.full_name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : (user?.email?.[0]?.toUpperCase() ?? "U");

  const handleLogout = () => {
    // Always fetch the user token before protected API calls
    const currentUser = getUserInfo();
    // Then pass user.token in headers to the API function if needed
    // e.g. await logoutApi({ Authorization: `Bearer ${currentUser?.token}` })

    clearAuth();
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-all font-sans text-sm font-bold",
          scrolled
            ? "bg-[#670017]/8 hover:bg-[#670017]/12 text-[#670017]"
            : "bg-white/15 hover:bg-white/20 text-white",
        )}
        aria-label="User menu"
      >
        {/* Avatar — photo or initials */}
        {profile?.profile_picture_url ? (
          <img
            src={profile.profile_picture_url}
            alt={displayName}
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black",
              scrolled ? "bg-[#670017] text-white" : "bg-white text-[#670017]",
            )}
          >
            {initials}
          </span>
        )}

        <span className="hidden sm:inline">{displayName.split(" ")[0]}</span>

        <svg
          viewBox="0 0 12 12"
          fill="currentColor"
          className={cn("w-3 h-3 transition-transform", open && "rotate-180")}
        >
          <path d="M6 8L1 3h10L6 8z" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-56 bg-white rounded-2xl shadow-xl border border-[#e0bfbf]/40 overflow-hidden">
            {/* User info */}
            <div className="px-4 py-3 bg-[#670017]/4 border-b border-[#e0bfbf]/40">
              <p className="text-xs font-bold text-[#1c1b1f] font-sans truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-[#8c7070] font-sans truncate">
                {profile?.email ?? user?.email}
              </p>
              {/* {user?.role && (
                <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider bg-[#670017]/10 text-[#670017] px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              )} */}
            </div>

            <div className="py-1">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#1c1b1f] hover:bg-[#ffdada]/50 hover:text-[#670017] transition-colors font-sans"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M2 18a8 8 0 0 1 16 0" />
                </svg>
                My Profile
              </Link>

              <Link
                href="/my-queue"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#1c1b1f] hover:bg-[#ffdada]/50 hover:text-[#670017] transition-colors font-sans"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <rect x="3" y="3" width="14" height="14" rx="2" />
                  <path d="M7 7h6M7 10h6M7 13h4" />
                </svg>
                My Queue
              </Link>

              <Link
                href="/my-certificates"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#1c1b1f] hover:bg-[#ffdada]/50 hover:text-[#670017] transition-colors font-sans"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <path d="M5 3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z" />
                  <path d="M7 7h6M7 11h6M7 15h4" />
                </svg>
                My Certificates
              </Link>

              <Separator className="my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors font-sans"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <path d="M13 10H3m0 0 3-3m-3 3 3 3M10 3h5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Zustand re-renders this automatically on login/logout — no custom events
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isLoggedIn = !!user;

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
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-[#670017]/8 border-[#e0bfbf]/60"
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

          {/* Desktop nav */}
          <div
            className={cn(
              "hidden md:flex items-center rounded-full px-2 py-1 transition-all duration-300",
              scrolled
                ? "bg-[#f1ecf2] border border-[#e0bfbf]"
                : "bg-white/10 border border-white/20",
            )}
          >
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

            {/* Logged in → avatar | Logged out → register */}
            {isLoggedIn ? (
              <UserAvatar scrolled={scrolled} />
            ) : (
              <>
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
              </>
            )}

            {/* Mobile hamburger */}
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
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3 px-4 rounded-xl text-sm font-bold text-[#1c1b1f] hover:bg-[#ffdada] hover:text-[#670017] transition-colors font-sans"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {isLoggedIn && (
                    <>
                      <Separator className="my-2" />
                      <Link
                        href="/profile"
                        className="block py-3 px-4 rounded-xl text-sm font-bold text-[#670017] bg-[#ffdada]/40 hover:bg-[#ffdada] transition-colors font-sans"
                        onClick={() => setMobileOpen(false)}
                      >
                        👤{" "}
                        {
                          (profile?.full_name ?? user?.email ?? "").split(
                            " ",
                          )[0]
                        }
                        &apos;s Profile
                      </Link>
                      <button
                        onClick={() => {
                          clearAuth();
                          setMobileOpen(false);
                          window.location.href = "/";
                        }}
                        className="block w-full text-left py-3 px-4 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors font-sans"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </nav>

                <Separator />

                {!isLoggedIn && (
                  <div className="p-6">
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full rounded-full bg-[#670017] hover:bg-[#8c1127] text-white font-bold font-sans">
                        Register as Donor
                      </Button>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

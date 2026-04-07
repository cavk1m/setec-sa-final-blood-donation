// 'use client'

// import React, { useMemo, useState } from 'react';
// import Link from 'next/link';
// import { useTranslation } from 'react-i18next';
// import { HeartPulse, Languages, Menu, User, LogOut } from 'lucide-react';
// import { Button } from '../ui/button';
// import { LOCALE_STORAGE_KEY } from '@/src/i18n/client';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
//   DropdownMenuArrow,
// } from '../ui/dropdown-menu';
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
//   DrawerClose,
// } from '../ui/drawer';

// export default function Header() {
//   const { t, i18n } = useTranslation();
//   const currentLang = i18n.language;
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const translate = useMemo(
//     () => ({
//       home: t('header.home'),
//       badge: t('hero.badge'),
//       locations: t('header.locations'),
//       campaigns: t('header.campaigns'),
//       donate: t('header.donate'),
//       register: t('header.register'),
//       profile: t('header.profile'),
//       logout: t('header.logout'),
//     }),
//     [t, currentLang]
//   );

//   const setLanguage = (lng: 'en' | 'kh') => {
//     i18n.changeLanguage(lng);
//     if (typeof window !== 'undefined') {
//       localStorage.setItem(LOCALE_STORAGE_KEY, lng);
//     }
//   };

//   const handleLogout = () => {
//     setDrawerOpen(false);
//     // Add your logout logic (e.g. clear auth, redirect)
//   };

//   const navLinks = [
//     { href: '/', label: translate.home },
//     { href: '/locations', label: translate.locations },
//     { href: '/campaigns', label: translate.campaigns },
//     { href: '/donate', label: translate.donate },
//   ];

//   return (
//     <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
//               <HeartPulse className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-xl font-bold text-gray-900">
//               Hope<span className="text-red-600">Flow</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation - hidden on mobile and md */}
//           <nav className="hidden lg:flex space-x-8">
//             {navLinks.map(({ href, label }) => (
//               <Link
//                 key={href}
//                 href={href}
//                 className="text-gray-700 hover:text-red-600 transition-colors font-medium"
//               >
//                 {label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right side: Hamburger (mobile/md) + Language + Register */}
//           <div className="flex items-center gap-2 sm:gap-4" suppressHydrationWarning>
//             {/* Hamburger - visible only on mobile and md */}
//             <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
//               <DrawerTrigger asChild>
//                 <Button
//                   type="button"
//                   className="lg:hidden p-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
//                   aria-label="Open menu"
//                 >
//                   <Menu className="w-5 h-5" />
//                 </Button>
//               </DrawerTrigger>
//               <DrawerContent className="h-full max-w-[280px] data-[vaul-drawer-direction=right]:max-w-[280px]">
//                 <DrawerHeader className="text-left border-b border-gray-100 pb-4">
//                   <DrawerTitle className="text-lg font-semibold text-gray-900">
//                     Menu
//                   </DrawerTitle>
//                 </DrawerHeader>
//                 <div className="flex flex-col flex-1 overflow-y-auto px-4 py-2">
//                   {/* Profile */}
//                   <DrawerClose asChild>
//                     <Link
//                       href="/profile"
//                       className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
//                       onClick={() => setDrawerOpen(false)}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
//                         <User className="w-5 h-5 text-red-600" />
//                       </div>
//                       <span className="font-medium">{translate.profile}</span>
//                     </Link>
//                   </DrawerClose>
//                   {/* Navigation */}
//                   <nav className="flex flex-col gap-0.5 mt-2">
//                     {navLinks.map(({ href, label }) => (
//                       <DrawerClose key={href} asChild>
//                         <Link
//                           href={href}
//                           className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
//                           onClick={() => setDrawerOpen(false)}
//                         >
//                           {label}
//                         </Link>
//                       </DrawerClose>
//                     ))}
//                     <DrawerClose asChild>
//                       <Link
//                         href="/register"
//                         className="rounded-lg px-3 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
//                         onClick={() => setDrawerOpen(false)}
//                       >
//                         {translate.register}
//                       </Link>
//                     </DrawerClose>
//                   </nav>
//                   {/* Logout */}
//                   <div className="mt-auto pt-4 border-t border-gray-100">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         handleLogout();
//                         setDrawerOpen(false);
//                       }}
//                       className="flex items-center gap-3 w-full rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
//                     >
//                       <LogOut className="w-5 h-5 text-gray-500" />
//                       {translate.logout}
//                     </button>
//                   </div>
//                 </div>
//               </DrawerContent>
//             </Drawer>

//             {/* Language Switch and Register - visible all breakpoints */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   type="button"
//                   className="gap-2 min-w-[4rem] sm:min-w-[4.5rem] border-2 border-blue-500 bg-gray-900 text-blue-400 hover:bg-gray-800 hover:border-blue-400 hover:text-blue-300 data-[state=open]:border-blue-400 data-[state=open]:bg-gray-800 data-[state=open]:text-blue-300"
//                 >
//                   <Languages className="w-4 h-4 shrink-0" />
//                   <span>{currentLang === 'kh' ? 'KH' : 'EN'}</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-40">
//                 <DropdownMenuArrow className="fill-gray-900" />
//                 <DropdownMenuGroup>
//                   <DropdownMenuLabel>Language</DropdownMenuLabel>
//                   <DropdownMenuItem onSelect={() => setLanguage('en')}>
//                     English
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onSelect={() => setLanguage('kh')}>
//                     Khmer
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <Button type="button" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 sm:px-6 hidden sm:inline-flex">
//               {translate.register}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
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
import { cn } from "@/lib/utils";
import { EmergencyBanner } from "./emergency-banner";
import { DesktopNavItem } from "./des-nav";

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

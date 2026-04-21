"use client";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    children: [
      {
        label: "Blood Drives",
        href: "/campaigns",
        description: "Active emergency blood campaigns",
      },
      {
        label: "Food & Relief",
        href: "/campaigns",
        description: "Disaster relief and food aid",
      },
      {
        label: "Medical Supply",
        href: "/campaigns",
        description: "Pediatric and medical supply drives",
      },
    ],
  },
  { label: "Donate", href: "/donate" },
];

export function DesktopNavItem({
  item,
  scrolled,
}: {
  item: (typeof NAV_ITEMS)[number];
  scrolled: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const textCls = scrolled
    ? "text-[#1c1b1f] hover:bg-[#ffdada]/60"
    : "text-white hover:bg-white/10";
  const activeCls = scrolled ? "text-[#670017]" : "text-[#ffdada]";

  if ("children" in item && item.children) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={cn(
            "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=closed]:bg-transparent text-sm font-semibold font-sans transition-colors",
            isActive ? activeCls : textCls,
          )}
        >
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-1 p-3 w-52 bg-white/95 backdrop-blur-xl shadow-xl rounded-xl border border-[#e0bfbf]">
            {item.children.map((child) => (
              <li key={child.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={child.href}
                    className="block select-none rounded-lg p-3 no-underline outline-none hover:bg-[#ffdada] transition-colors group"
                  >
                    <div className="text-sm font-bold text-[#670017]">
                      {child.label}
                    </div>
                    <p className="text-xs text-[#584141] mt-0.5 leading-snug">
                      {child.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-semibold font-sans transition-colors",
          "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
          "outline-none focus:outline-none ",
          isActive ? activeCls : textCls,
        )}
      >
        <Link href={item.href}>{item.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

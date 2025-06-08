"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "/features", scrollId: "features" },
  { label: "Pricing", href: "/pricing", scrollId: "pricing" },
  { label: "FAQ", href: "/faq", scrollId: "faq" },
];

interface NavItemsProps {
  isMobile?: boolean;
}

const NavItems = ({ isMobile = false }: NavItemsProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={cn("flex gap-6", isMobile && "flex-col")}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        if (isHomePage) {
          return (
            <a
              key={item.label}
              href={`#${item.scrollId}`}
              className={cn(
                "text-lg font-stretch-semi-condensed transition-colors",
                isMobile ? "text-black" : "text-white",
                isActive && "text-zinc-900"
              )}
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors",
              isMobile ? "text-black" : "text-white",
              isActive && "text-zinc-900"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavItems;

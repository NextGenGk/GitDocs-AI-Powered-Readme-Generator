"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label : "Dashboard", href: "/dashboard" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ's", href: "/faqs" },
];

interface NavItemsProps {
  isMobile?: boolean;
}

const NavItems = ({ isMobile = false }: NavItemsProps) => {
  const pathname = usePathname();

  return (
      <nav className={cn(
          isMobile
              ? "flex flex-col gap-4"
              : "flex items-center gap-4"
      )}>
        {navItems.map(({ label, href }) => (
            <Link
                href={href}
                key={label}
                className={cn(
                    "text-primary hover:text-gray-900 transition-colors",
                    isMobile
                        ? "text-lg py-2"
                        : "text-[15px] sm:text-[17px] px-1",
                    pathname === href && "font-semibold"
                )}
                onClick={isMobile ? () => document.body.click() : undefined}
            >
              {label}
            </Link>
        ))}
      </nav>
  );
};

export default NavItems;

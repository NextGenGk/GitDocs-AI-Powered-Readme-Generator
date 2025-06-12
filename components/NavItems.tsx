"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ's", href: "/faqs" },
];

interface NavItemsProps {
    isMobile?: boolean;
    onItemClick?: () => void; // Better prop for handling clicks
}

const NavItems = ({ isMobile = false, onItemClick }: NavItemsProps) => {
    const pathname = usePathname();

    const handleItemClick = () => {
        if (isMobile && onItemClick) {
            onItemClick();
        }
    };

    return (
        <nav
            className={cn(
                "transition-all duration-300 ease-in-out",
                isMobile
                    ? "flex flex-col gap-2 py-4 px-6 w-full"
                    : "hidden md:flex items-center gap-6 lg:gap-8"
            )}
            role="navigation"
            aria-label="Main navigation"
        >
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        "relative transition-all duration-200 ease-in-out",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md",
                        isMobile
                            ? [
                                "text-lg py-3 px-4 rounded-lg",
                                "hover:bg-gray-50 active:bg-gray-100",
                                "border-l-4 border-transparent hover:border-blue-500",
                                pathname === href && "bg-blue-50 border-blue-500 font-semibold text-blue-700"
                            ]
                            : [
                                "text-sm md:text-base lg:text-lg px-3 py-2 rounded-md",
                                "hover:text-blue-600 hover:bg-blue-50",
                                pathname === href && "font-semibold text-blue-700 bg-blue-50"
                            ],
                        !pathname.startsWith(href) && !isMobile && "text-gray-700"
                    )}
                    onClick={handleItemClick}
                    aria-current={pathname === href ? "page" : undefined}
                >
                    {label}
                    {/* Active indicator for desktop */}
                    {!isMobile && pathname === href && (
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                    )}
                </Link>
            ))}
        </nav>
    );
};

// Enhanced Mobile Navigation with Hamburger Menu
interface MobileNavProps {
    className?: string;
}

export const MobileNav = ({ className }: MobileNavProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className={cn("md:hidden", className)}>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className={cn(
                    "relative z-50 p-2 rounded-md transition-colors duration-200",
                    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    isOpen && "bg-gray-100"
                )}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
            >
                <div className="w-6 h-5 relative flex flex-col justify-between">
          <span
              className={cn(
                  "block h-0.5 w-full bg-gray-800 transition-all duration-300 origin-center",
                  isOpen && "rotate-45 translate-y-2"
              )}
          />
                    <span
                        className={cn(
                            "block h-0.5 w-full bg-gray-800 transition-all duration-300",
                            isOpen && "opacity-0"
                        )}
                    />
                    <span
                        className={cn(
                            "block h-0.5 w-full bg-gray-800 transition-all duration-300 origin-center",
                            isOpen && "-rotate-45 -translate-y-2"
                        )}
                    />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={cn(
                    "fixed top-0 right-0 z-40 h-full w-80 max-w-[80vw] bg-white shadow-2xl",
                    "transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                        <button
                            onClick={closeMenu}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-y-auto">
                        <NavItems isMobile onItemClick={closeMenu} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Combined Navigation Component
interface NavigationProps {
    className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            {/* Desktop Navigation */}
            <NavItems />

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    );
};

export default NavItems;
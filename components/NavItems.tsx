"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Features", href: "/features" },
    { label: "FAQ's", href: "/faqs" },
];

interface NavItemsProps {
    isMobile?: boolean;
    onItemClick?: () => void;
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
                    ? "flex flex-col gap-2 py-6 px-6 w-full"
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
                        "relative transition-all duration-200 ease-in-out group",
                        "focus:outline-none",
                        isMobile
                            ? [
                                "text-lg py-3 px-4 flex items-center",
                                "hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700",
                                "border-l-4 border-transparent hover:border-primary",
                                pathname === href && "bg-gray-50 dark:bg-gray-800 border-primary font-semibold text-primary"
                            ]
                            : [
                                "text-sm md:text-base lg:text-lg px-2 py-2",
                                "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary",
                                pathname === href && "font-medium text-primary"
                            ]
                    )}
                    onClick={handleItemClick}
                    aria-current={pathname === href ? "page" : undefined}
                >
                    {label}

                    {/* Bottom line hover effect for desktop */}
                    {!isMobile && (
                        <span
                            className={cn(
                                "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                                pathname === href
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                            )}
                        />
                    )}
                </Link>
            ))}
        </nav>
    );
};

// Simple Mobile Navigation with Hamburger Menu
interface MobileNavProps {
    className?: string;
}

export const MobileNav = ({ className }: MobileNavProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Animation variants
    const menuVariants = {
        closed: { x: "100%" },
        open: { x: 0 }
    };

    const overlayVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <div className={cn("md:hidden", className)}>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className={cn(
                    "relative z-50 p-2 transition-colors duration-200",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none",
                    isOpen && "bg-gray-100 dark:bg-gray-800"
                )}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
            >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                    <span
                        className={cn(
                            "block h-0.5 w-full bg-gray-800 dark:bg-gray-200 transition-all duration-300 origin-center",
                            isOpen && "rotate-45 translate-y-2 bg-primary"
                        )}
                    />
                    <span
                        className={cn(
                            "block h-0.5 w-full bg-gray-800 dark:bg-gray-200 transition-all duration-300",
                            isOpen && "opacity-0 bg-primary"
                        )}
                    />
                    <span
                        className={cn(
                            "block h-0.5 w-full bg-gray-800 dark:bg-gray-200 transition-all duration-300 origin-center",
                            isOpen && "-rotate-45 -translate-y-2 bg-primary"
                        )}
                    />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={overlayVariants}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu */}
            <motion.div
                id="mobile-menu"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                    "fixed top-0 right-0 z-40 h-full w-80 max-w-[80vw] bg-white dark:bg-gray-900",
                    "shadow-2xl border-l border-gray-200 dark:border-gray-800",
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
                        <button
                            onClick={closeMenu}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                        <NavItems isMobile onItemClick={closeMenu} />

                        {/* Extra mobile menu items */}
                        {/*<div className="p-6 border-t border-gray-200 dark:border-gray-800 mt-auto">*/}
                        {/*    <Link*/}
                        {/*        href="/pricing"*/}
                        {/*        className="block w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium text-center shadow-md hover:shadow-lg transition-all duration-200"*/}
                        {/*        onClick={closeMenu}*/}
                        {/*    >*/}
                        {/*        Upgrade to Pro*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </motion.div>
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
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import NavItems from "./NavItems";

// Mobile Navigation Component
const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isOpen && !target.closest('.mobile-nav-container')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div className="mobile-nav-container relative">
            {/* Hamburger Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                aria-label="Toggle menu"
            >
                <span
                    className={cn(
                        "block w-6 h-0.5 bg-gray-800 transition-all duration-300",
                        isOpen ? "rotate-45 translate-y-2" : ""
                    )}
                />
                <span
                    className={cn(
                        "block w-6 h-0.5 bg-gray-800 transition-all duration-300",
                        isOpen ? "opacity-0" : ""
                    )}
                />
                <span
                    className={cn(
                        "block w-6 h-0.5 bg-gray-800 transition-all duration-300",
                        isOpen ? "-rotate-45 -translate-y-2" : ""
                    )}
                />
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
            )}

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20">
                                <Image
                                    src="/logo.png"
                                    alt="GitDocs Logo"
                                    width={32}
                                    height={30}
                                />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                GitDocs
                            </span>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 px-6 py-4">
                        <div onClick={() => setIsOpen(false)}>
                            <NavItems isMobile />
                        </div>
                    </div>

                    {/* Auth Section */}
                    <div className="p-6 border-t border-gray-200">
                        <SignedOut>
                            <div className="space-y-3">
                                <SignInButton>
                                    <button
                                        className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 transition-colors rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm hover:shadow"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </button>
                                </SignInButton>

                                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                                    <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white transition-all rounded-lg px-4 py-2.5 text-sm font-medium shadow-md hover:shadow-lg">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </SignedOut>

                        <SignedIn>
                            <div className="flex items-center gap-3">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "border-2 border-blue-600/20 hover:border-purple-600/50 transition-colors"
                                        }
                                    }}
                                />
                                <span className="text-sm text-gray-600">Account</span>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if we're at the top
            setIsAtTop(currentScrollY < 10);

            // Show/hide navbar based on scroll direction
            if (currentScrollY < 10) {
                // Always show when at top
                setIsVisible(true);
            } else if (currentScrollY > prevScrollY && currentScrollY > 100) {
                // Hide when scrolling down (after 100px)
                setIsVisible(false);
            } else if (currentScrollY < prevScrollY) {
                // Show when scrolling up
                setIsVisible(true);
            }

            setPrevScrollY(currentScrollY);
            setScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isVisible ? "translate-y-0" : "-translate-y-full"
            )}
        >
            <div className="container mx-auto px-4 relative">
                <nav className="flex items-center justify-between py-4">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 relative z-10">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 group-hover:from-blue-600/30 group-hover:via-purple-600/30 group-hover:to-pink-600/30 transition-all duration-300">
                                <Image
                                    src="/logo.png"
                                    alt="GitDocs Logo"
                                    width={38}
                                    height={36}
                                    className="transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                                    GitDocs
                                </span>
                                <span className="text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold ml-0.5">.</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavItems />

                        <div className="flex items-center gap-4">
                            <SignedOut>
                                <SignInButton>
                                    <button className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 transition-colors rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow">
                                        Sign In
                                    </button>
                                </SignInButton>

                                <Link href="/sign-up">
                                    <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white transition-all rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg">
                                        Get Started
                                    </button>
                                </Link>
                            </SignedOut>

                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "border-2 border-blue-600/20 hover:border-purple-600/50 transition-colors"
                                        }
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
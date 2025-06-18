"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { MobileNav } from "./NavItems";
import { cn } from "@/lib/utils";
import NavItems from "./NavItems";

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
            {/* No Background */}

            <div className="container mx-auto px-4 relative">
                <nav className="flex items-center justify-between py-4">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 relative z-10">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all duration-300">
                                <Image
                                    src="/logo.png"
                                    alt="GitDocs Logo"
                                    width={38}
                                    height={36}
                                    className="transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                    GitDocs
                                </span>
                                <span className="text-4xl text-primary font-bold ml-0.5">.</span>
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
                                    <button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white transition-all rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg">
                                        Get Started
                                    </button>
                                </Link>
                            </SignedOut>

                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "border-2 border-primary/20 hover:border-primary/50 transition-colors"
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
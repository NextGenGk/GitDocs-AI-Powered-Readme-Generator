"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavItems from "./NavItems";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar flex justify-between items-center p-4 bg-transparent absolute top-0 left-0 right-0 z-10">
            <div className="flex-shrink-0">
                <Link href="/">
                    <div className="flex items-center justify-center gap-2.5 cursor-pointer">
                        <Image src="/logo.png" alt="Logo" width={38} height={36} />
                        <span className="text-2xl sm:text-3xl font-semibold text-primary hover:text-gray-900 transition-colors">
                            GitDocs <span className="text-4xl text-primary font-semibold"> . </span>
                        </span>
                    </div>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="border border-white bg-black text-white transition-colors rounded-4xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white p-2"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 md:hidden">
                    <div className="flex flex-col p-4">
                        <NavItems isMobile={true} />
                        <div className="mt-4">
                            <SignedOut>
                                <SignInButton>
                                    <button className="border border-white text-white hover:bg-white hover:text-black transition-colors rounded-4xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer w-full justify-center">Sign In</button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
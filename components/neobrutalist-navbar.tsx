'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { NeobrutalistButton } from "@/components/ui/neobrutalist-button";
import { Menu, X } from "lucide-react";
import { useBanner } from "@/contexts/BannerContext";

const NavLink = ({ href, children, onClick, className = "" }: { 
  href: string; 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string 
}) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`font-bold text-black hover:text-[#05e17a] transition-colors px-3 py-2 rounded-lg hover:bg-black/5 ${className}`}
  >
    {children}
  </Link>
);

export default function NeobrutalistNavbar() {
    const { isLoaded, isSignedIn } = useUser();
    const { isBannerVisible } = useBanner();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    // Show loading state until client is ready and Clerk is loaded
    if (!isClient || !isLoaded) {
        return (
            <nav className={`bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(5,225,122,0.3)] fixed ${isBannerVisible ? 'top-[52px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-xl sm:text-2xl font-black transform -rotate-1 hover:rotate-0 transition-transform group">
                                <span className="inline-block px-2.5 py-1 bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:text-[#05e17a] hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)] transition-all group-hover:scale-105">
                                    GITDOCS
                                </span>
                            </Link>
                        </div>
                        
                        {/* Loading placeholders */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="md:hidden">
                            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className={`bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(5,225,122,0.3)] fixed ${isBannerVisible ? 'top-[52px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl sm:text-2xl font-black transform -rotate-1 hover:rotate-0 transition-transform group">
                            <span className="inline-block px-2.5 py-1 bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:text-[#05e17a] hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)] transition-all group-hover:scale-105">
                                GITDOCS
                            </span>
                        </Link>
                    </div>

                    {/* Centered Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex space-x-2">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/feedback">Feedback</NavLink>
                            <NavLink href="/issues">Issues</NavLink>
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isSignedIn ? (
                            <>
                                <Link href="/dashboard">
                                    <NeobrutalistButton size="sm" variant="primary">
                                        Dashboard
                                    </NeobrutalistButton>
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </>
                        ) : (
                            <>
                                <Link href="/sign-in">
                                    <NeobrutalistButton size="sm" variant="outline">
                                        Sign In
                                    </NeobrutalistButton>
                                </Link>
                                <Link href="/sign-up">
                                    <NeobrutalistButton size="sm" variant="default">
                                        Sign Up
                                    </NeobrutalistButton>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ml-auto">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-black hover:bg-black/5 transition-colors border-2 border-black"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t-4 border-black bg-white">
                        <div className="px-4 py-6 space-y-4">
                            {/* Navigation Links */}
                            <div className="space-y-2">
                                <NavLink href="/" onClick={closeMenu} className="block text-center py-3">
                                    Home
                                </NavLink>
                                <NavLink href="/feedback" onClick={closeMenu} className="block text-center py-3">
                                    Feedback
                                </NavLink>
                                <NavLink href="/issues" onClick={closeMenu} className="block text-center py-3">
                                    Issues
                                </NavLink>
                            </div>

                            {/* Divider */}
                            <div className="border-t-2 border-gray-100 my-4"></div>

                            {/* Auth Section */}
                            <div className="space-y-3">
                                {isSignedIn ? (
                                    <>
                                        <Link href="/dashboard" onClick={closeMenu}>
                                            <NeobrutalistButton variant="primary" className="w-full">
                                                Dashboard
                                            </NeobrutalistButton>
                                        </Link>
                                        <div className="flex justify-center py-2">
                                            <UserButton afterSignOutUrl="/" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/sign-in" onClick={closeMenu}>
                                            <NeobrutalistButton variant="outline" className="w-full">
                                                Sign In
                                            </NeobrutalistButton>
                                        </Link>
                                        <Link href="/sign-up" onClick={closeMenu}>
                                            <NeobrutalistButton variant="default" className="w-full">
                                                Sign Up
                                            </NeobrutalistButton>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

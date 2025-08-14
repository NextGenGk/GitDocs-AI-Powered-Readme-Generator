'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { NeobrutalistButton } from "@/components/ui/neobrutalist-button";
import { Menu, X } from "lucide-react";
import { useBanner } from "@/contexts/BannerContext";

const NavLink = ({ href, children, onClick, className = "" }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`font-bold text-black hover:text-[#05e17a] transition-colors text-base px-3 py-2 rounded-lg hover:bg-black/5 block w-full text-center md:text-left md:w-auto ${className}`}
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

    // Show loading state until client is ready and Clerk is loaded
    if (!isClient || !isLoaded) {
        return (
            <nav className={`bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(5,225,122,0.3)] fixed ${isBannerVisible ? 'top-[52px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-black transform -rotate-1 hover:rotate-0 transition-transform group">
                                <span className="inline-block px-2.5 py-1 pt-3 bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:text-[#05e17a] hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)] transition-all group-hover:scale-105">
                                    GITDOCS
                                </span>
                            </Link>
                        </div>
                        
                        {/* Center Navigation */}
                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <div className="flex space-x-2">
                                <NavLink href="/">Home</NavLink>
                                <NavLink href="/feedback">Feedback</NavLink>
                                <NavLink href="/issues">Issues</NavLink>
                            </div>
                        </div>

                        {/* Loading placeholder for auth buttons */}
                        <div className="hidden md:flex items-center space-x-4 ml-auto">
                            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
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
                </div>
            </nav>
        );
    }

    return (
        <nav className={`bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(5,225,122,0.3)] fixed ${isBannerVisible ? 'top-[52px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-300`}>
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 flex-wrap">
                    {/* Logo - Left */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-lg xs:text-xl sm:text-2xl font-black transform -rotate-1 hover:rotate-0 transition-transform group">
                            <span className="inline-block px-2 xs:px-2.5 py-1 pt-1 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:text-[#05e17a] hover:shadow-[3px_3px_0px_0px_rgba(5,225,122,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)] transition-all group-hover:scale-105">
                                GITDOCS
                            </span>
                        </Link>
                    </div>

                    {/* Center Navigation */}
                    <div className="hidden md:flex flex-1 justify-center items-center">
                        <div className="flex space-x-2">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/feedback">Feedback</NavLink>
                            <NavLink href="/issues">Issues</NavLink>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`w-full md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                        <div className="flex flex-col items-center space-y-2 py-4 px-2 bg-[#f0fdf4] border-t-2 border-black">
                            <NavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                            <NavLink href="/feedback" onClick={() => setIsMenuOpen(false)}>Feedback</NavLink>
                            <NavLink href="/issues" onClick={() => setIsMenuOpen(false)}>Issues</NavLink>
                            {isSignedIn ? (
                                <div className="w-full flex justify-center">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            ) : (
                                <>
                                    <NavLink 
                                        href="/sign-in" 
                                        className="w-full max-w-xs mx-auto mt-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <NeobrutalistButton className="w-full">
                                            Sign In
                                        </NeobrutalistButton>
                                    </NavLink>
                                    <NavLink 
                                        href="/sign-up" 
                                        className="w-full max-w-xs mx-auto"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <NeobrutalistButton variant="secondary" className="w-full">
                                            Sign Up
                                        </NeobrutalistButton>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons - Right */}
                    <div className="hidden md:flex items-center space-x-4 ml-auto">
                        {isSignedIn ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/dashboard">
                                    <NeobrutalistButton size="sm" variant="primary">
                                        Dashboard
                                    </NeobrutalistButton>
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
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
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ml-auto">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t-2 sm:border-t-4 border-black bg-white">
                        <div className="p-4 space-y-4">
                            {/* Navigation Links Section */}
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Navigation</div>
                                <div className="space-y-1">
                                    <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
                                        <div className="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-[#05e17a]">
                                            Home
                                        </div>
                                    </NavLink>
                                    <NavLink href="/feedback" onClick={() => setIsMenuOpen(false)}>
                                        <div className="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-[#05e17a]">
                                            Feedback
                                        </div>
                                    </NavLink>
                                    <NavLink href="/issues" onClick={() => setIsMenuOpen(false)}>
                                        <div className="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-[#05e17a]">
                                            Issues
                                        </div>
                                    </NavLink>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t-2 border-gray-100"></div>

                            {/* Auth Section */}
                            <div className="space-y-3">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Account</div>
                                {isSignedIn ? (
                                    <div className="space-y-3">
                                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                            <NeobrutalistButton size="sm" variant="primary" className="w-full h-12 text-sm font-bold">
                                                Dashboard
                                            </NeobrutalistButton>
                                        </Link>
                                        <div className="flex justify-center py-2">
                                            <UserButton afterSignOutUrl="/" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                                            <NeobrutalistButton size="sm" variant="outline" className="w-full h-12 text-sm font-bold">
                                                Sign In
                                            </NeobrutalistButton>
                                        </Link>
                                        <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                                            <NeobrutalistButton size="sm" variant="default" className="w-full h-12 text-sm font-bold">
                                                Sign Up
                                            </NeobrutalistButton>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </nav>
    );
}

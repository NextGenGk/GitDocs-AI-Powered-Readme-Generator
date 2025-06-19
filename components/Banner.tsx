'use client';

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard } from "lucide-react";

export default function Banner() {
    const { isSignedIn } = useUser();

    return (
        <div className="relative w-full min-h-screen overflow-hidden overscroll-none">
            {/* Light Background with Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-pink-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 lg:px-8 text-center pt-24 md:pt-32 pb-20">
                {/* Badge */}
                <div className="mb-6 animate-fade-in-down">
                    <Button
                        variant="outline"
                        className="px-4 md:px-6 py-2 md:py-2 rounded-full border border-blue-200 bg-white/70 backdrop-blur-sm text-blue-700 shadow-lg hover:bg-white/90 transition-all duration-300 text-sm md:text-base flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span>Ready. Set. Document!</span>
                    </Button>
                </div>

                {/* Headline */}
                <div className="mb-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-tight md:leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                        <span className="block">Your Code Deserves</span>
                        <span className="block">Better README.</span>
                    </h1>
                </div>

                {/* Subheadline */}
                <div className="mb-8">
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in">
                        Just paste your repo. We'll do the writing magic.
                    </p>
                </div>

                {/* Buttons */}
                {/*{isSignedIn && (*/}
                {/*    <div className="mb-12 text-base animate-fade-in-up">*/}
                {/*        <Link href="/dashboard">*/}
                {/*            <Button*/}
                {/*                variant="outline"*/}
                {/*                className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-blue-300 bg-blue-50/80 backdrop-blur-sm text-blue-700 shadow-lg hover:bg-blue-100/80 transition-all duration-300 text-base md:text-lg flex items-center gap-2"*/}
                {/*            >*/}
                {/*                <LayoutDashboard className="w-5 h-5 text-blue-600" />*/}
                {/*                <span className="text-base">Dashboard</span>*/}
                {/*            </Button>*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* Scroll Indicator - Hidden on small screens */}
                <div className="flex-col pt-16 items-center animate-bounce hidden sm:flex">
                    <span className="text-gray-500 text-sm mb-2">Scroll Down</span>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Global Animations */}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                    animation-delay: 0.2s;
                    opacity: 0;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                    animation-delay: 0.4s;
                    opacity: 0;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out forwards;
                    opacity: 0;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-fade-in, .animate-fade-in-up, .animate-fade-in-down {
                        animation: none !important;
                        opacity: 1 !important;
                    }
                }

                body {
                    overflow-x: hidden;
                    width: 100%;
                    max-width: 100vw;
                }

                html, body {
                    overscroll-behavior: none;
                }

                /* Ensure text is readable on all devices */
                @media (max-width: 640px) {
                    .bg-clip-text {
                        -webkit-background-clip: text;
                        background-clip: text;
                    }

                    body {
                        overflow-x: hidden;
                        position: relative;
                    }
                }
            `}</style>
        </div>
    );
}
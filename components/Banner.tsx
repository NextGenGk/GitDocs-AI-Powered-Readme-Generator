'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, LayoutDashboard } from "lucide-react";

export default function Banner() {
    const { user, isSignedIn } = useUser();

    const router = useRouter();

    // Redirect to dashboard if logged in
    // useEffect(() => {
    //     if (isSignedIn) {
    //         router.push('/dashboard');
    //     }
    // }, [isSignedIn, router]);

    return (
        <div className="relative w-full min-h-[100svh] overflow-hidden">
            {/* Background Image and Overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/banner.jpg"
                    alt="banner"
                    priority
                    width={1920}
                    height={1080}
                    sizes="100vw"
                    className="w-full h-full object-cover opacity-80"
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-black/40"></div>
                <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl hidden xs:block"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl hidden xs:block"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-4 sm:px-6 pt-16 sm:pt-24 text-center">
                {/* Badge */}
                <div className="mb-6 sm:mb-10 animate-fade-in-down">
                    <Button
                        variant="outline"
                        className="px-4 sm:px-6 py-1 sm:py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white shadow-md hover:bg-white/20 transition-all duration-300 text-sm"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>Ready. Set. Document!</span>
                    </Button>
                </div>

                {/* Headline */}
                <h1 className="text-6xl sm:text-5xl lg:text-6xl font-semibold ">
                    Your Code Deserves Better README.
                </h1>


                {/* Subheadline */}
                <p className="text-base font-stretch-semi-condensed sm:text-xl md:text-2xl text-white/80 font-medium mt-4 sm:mt-6 animate-fade-in">
                    Just paste your repo. We'll do the writing magic.
                </p>

                 {/*Buttons */}
                <div className="flex justify-center items-center mt-8 sm:mt-12 animate-fade-in-up">
                    {isSignedIn && (
                        <div className="pt-4 sm:pt-6">
                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-400/40 bg-blue-500/15 backdrop-blur-sm text-blue-100 shadow-md hover:bg-blue-500/25 transition-all duration-300 text-sm"
                                >
                                    <LayoutDashboard className="w-4 h-4 text-blue-300" />
                                    <span>Dashboard</span>
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-white/60 text-xs sm:text-sm mb-1">Scroll Down</span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Global Animations */}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; opacity: 0; }
                .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }

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
            `}</style>
        </div>
    );
}
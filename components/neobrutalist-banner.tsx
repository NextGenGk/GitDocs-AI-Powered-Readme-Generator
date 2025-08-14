'use client';

import Link from "next/link";
import { NeobrutalistButton } from "@/components/ui/neobrutalist-button";
import { ArrowRight } from "lucide-react";

interface NeobrutalistBannerProps {
  noPadding?: boolean;
}

export default function NeobrutalistBanner({ noPadding = false }: NeobrutalistBannerProps) {

    return (
        <section className="relative min-h-screen bg-[#2ecc71] flex justify-center overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-15">
                <div className="h-full w-full" style={{
                    backgroundImage: `
                        linear-gradient(to right, black 1px, transparent 1px),
                        linear-gradient(to bottom, black 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.5))',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.5))'
                }}></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 hidden sm:block">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-black"></div>
                <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-black"></div>
                <div className="absolute bottom-0 left-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-black"></div>
                <div className="absolute bottom-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-black"></div>
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-black/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 bg-white/10 rounded-lg animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/4 right-1/4 w-10 sm:w-15 md:w-20 h-10 sm:h-15 md:h-20 bg-black/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Add animation keyframes */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>

            {/* Content */}
            <div className="relative z-10 w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24">
                <header className="text-center px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black mb-4 sm:mb-6 transform -rotate-1">
                    <span className="inline-block px-2 xs:px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        GITDOCS
                    </span>
                </h1>
                <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] px-2 leading-tight">
                    Create Professional READMEs in Seconds with AI
                </h2>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
                    Transform your GitHub repositories into professional README files with intelligent AI. Generate comprehensive documentation, installation guides, and usage examples in seconds.
                </p>
                
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch sm:items-center px-2 max-w-md sm:max-w-none mx-auto">
                    <Link href="/dashboard" className="group w-full sm:w-auto">
                        <NeobrutalistButton 
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2.5 text-sm sm:text-base font-bold text-[#05e17a] bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(5,225,122,1)] sm:hover:shadow-[5px_5px_0px_0px_rgba(5,225,122,1)] hover:bg-black hover:text-[#05e17a] transition-all duration-200 active:scale-95"
                        >
                            Start Creating <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </NeobrutalistButton>
                    </Link>
                    <Link href="#features" className="group w-full sm:w-auto">
                        <NeobrutalistButton 
                            variant="outline"
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2.5 text-sm sm:text-base font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-[#05e17a] hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(5,225,122,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(5,225,122,1)] transition-all duration-200 active:scale-95"
                        >
                            Explore Features
                        </NeobrutalistButton>
                    </Link>
                </div>
                </header>
            </div>
        </section>
    );
}

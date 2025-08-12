'use client';

import Link from "next/link";
import { NeobrutalistButton } from "@/components/ui/neobrutalist-button";
import { ArrowRight } from "lucide-react";

interface NeobrutalistBannerProps {
  noPadding?: boolean;
}

export default function NeobrutalistBanner({ noPadding = false }: NeobrutalistBannerProps) {

    return (
        <section className="relative h-auto min-h-[500px] md:min-h-[600px] py-2 bg-[#2ecc71] flex items-center justify-center overflow-hidden">
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
            <div className="absolute inset-0">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-black"></div>
                <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-black"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-black"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-black"></div>
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-black/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-lg animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-black/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
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
            <header className={`relative z-10 text-center ${noPadding ? '' : 'px-4'}`}>
                <h1 className="text-6xl md:text-8xl font-black text-black mb-4 transform -rotate-1">
                    <span className={`inline-block ${noPadding ? '' : 'px-4'} py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                        GITDOCS
                    </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    AI-Powered README Generator for GitHub
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                    Transform your GitHub repositories into professional README files with intelligent AI. Generate comprehensive documentation, installation guides, and usage examples in seconds.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/dashboard" className="group">
                        <NeobrutalistButton 
                            className="px-6 py-2.5 text-base font-bold text-[#05e17a] bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(5,225,122,1)] hover:bg-black hover:text-[#05e17a] transition-all duration-200"
                        >
                            Start Creating <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </NeobrutalistButton>
                    </Link>
                    <Link href="#features" className="group">
                        <NeobrutalistButton 
                            variant="outline"
                            className="px-6 py-2.5 text-base font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-[#05e17a] hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(5,225,122,1)] transition-all duration-200"
                        >
                            Explore Features
                        </NeobrutalistButton>
                    </Link>
                </div>
            </header>
        </section>
    );
}

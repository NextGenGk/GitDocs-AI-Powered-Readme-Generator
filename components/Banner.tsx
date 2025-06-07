'use client';

import Image from "next/image";
import {Typewriter} from "react-simple-typewriter";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <Image
                src="/banner.jpg"
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%', opacity: 0.80, objectFit: 'cover', position: 'absolute', zIndex: -1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" style={{ zIndex: -1 }}></div>


            <div className="absolute inset-0 flex flex-col items-top justify-start mt-26 w-full sm:pt-24 md:pt-32">
                <h1 className="text-7xl font-mono text-slate-900 text-center mb-4 sm:mb-6 md:mb-8">
                    Your Code Deserves a Better {''}
                    <div className="mt-3 sm:mt-4 md:mt-6 flex items-center justify-center">
                        <span style={{ color: 'white', fontWeight: 'bold' }}>
                            <Typewriter
                                words={['README.', 'Readability', 'Documentation']}
                                loop={10}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </div>
                </h1>
                <p className="text-2xl font-mono text-slate-950 flex items-center justify-center">
                    Docs That Developers Deserve.
                </p>

                <div className="flex items-center justify-center mt-8 sm:mt-10 md:mt-12">
                    <Button variant="default" className="px-8 border border-white-100">
                        <Link href="/sign-in">
                                Get Started
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    )
}

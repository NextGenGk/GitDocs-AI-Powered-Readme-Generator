'use client';

import Image from "next/image";
import GitHubToMarkdown from "./GitHubToMarkdown";
import {Typewriter} from "react-simple-typewriter";

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


            <div className="absolute inset-0 flex flex-col items-center justify-center w-full px-4 pt-16 sm:pt-24 md:pt-32">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-center text-slate-950">
                    Your Code Deserves a Better {''}
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
                </h1>
                <p className="text-base sm:text-lg mb-4 text-center max-w-xl sm:max-w-2xl text-slate-950">
                    One Link. One Click. One Perfect README.
                </p>
                <div className="p-4 sm:p-6 md:p-10 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl bg-transparent" style={{ zIndex: 10 }}>
                    <GitHubToMarkdown />
                </div>
            </div>
        </div>
    )
}

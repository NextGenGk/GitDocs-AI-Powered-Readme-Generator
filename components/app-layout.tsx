"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import UserSyncer from "@/components/UserSyncer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamically import navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import("@/components/neobrutalist-navbar"), {
  ssr: false,
  loading: () => (
    <nav className="bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(5,225,122,0.3)] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-black">GITDOCS</span>
          </div>
        </div>
      </div>
    </nav>
  ),
});



export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white min-h-screen flex flex-col`}
        >
          <UserSyncer />

          {/* Fixed Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow pt-20">
            <div className="container mx-auto px-0">{children}</div>
          </main>


        </body>
      </html>
    </ClerkProvider>
  );
}

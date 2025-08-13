"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import UserSyncer from "@/components/UserSyncer";
import NewUIBanner from "@/components/NewUIBanner";
import { BannerProvider } from "@/contexts/BannerContext";

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
    <nav className="bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(5,225,122,0.3)] fixed top-[60px] sm:top-[64px] left-0 right-0 z-50">
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
    <ClerkProvider 
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          colorPrimary: "#05e17a",
          colorBackground: "#ffffff",
          colorText: "#000000",
          colorInputBackground: "#ffffff",
          colorInputText: "#000000",
          borderRadius: "0px",
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: "#05e17a",
            border: "2px solid #000000",
            boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
            borderRadius: "0px",
            fontWeight: "bold",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "#000000",
              color: "#05e17a",
              boxShadow: "4px 4px 0px 0px rgba(5,225,122,1)",
            },
          },
          userButtonAvatarBox: {
            border: "2px solid #000000",
            boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
          },
          userButtonPopoverCard: {
            border: "2px solid #000000",
            boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
            borderRadius: "0px",
          },
          userButtonPopoverActionButton: {
            "&:hover": {
              backgroundColor: "#05e17a",
              color: "#000000",
            },
          },
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white min-h-screen flex flex-col`}
        >
          <BannerProvider>
            <UserSyncer />
            
            {/* New UI Banner - Above everything */}
            <NewUIBanner />

            {/* Fixed Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow pt-[124px] sm:pt-[128px]">
              <div className="container mx-auto px-0">{children}</div>
            </main>
          </BannerProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}

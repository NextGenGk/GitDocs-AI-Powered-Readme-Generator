import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BasicFeature from "@/components/BasicFeature";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton, RedirectToSignIn
} from '@clerk/nextjs'
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Analytics} from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitDocs - README Generator using AI Agents",
  description: "Generate comprehensive README.md files for your GitHub repositories using AI",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        >
          <SignedIn>
            <Navbar />
            <main>
              {children}
            </main>
          </SignedIn>

          <SignedOut>
            <RedirectToSignIn />
            <Navbar />
            <main>
              {children}
              <Analytics />
            </main>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}

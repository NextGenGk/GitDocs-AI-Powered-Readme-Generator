import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import AppLayout from "@/components/app-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitDocs - AI-Powered README Generator for GitHub Repositories",
  description:
    "Generate professional README.md files for your GitHub repositories in seconds using AI. Create comprehensive documentation with installation guides, usage examples, and API docs automatically.",
  keywords: [
    "README generator",
    "GitHub documentation",
    "AI documentation",
    "markdown generator",
    "repository documentation",
    "GitHub README",
    "documentation automation",
    "developer tools"
  ],
  authors: [{ name: "GitDocs Team" }],
  creator: "GitDocs",
  publisher: "GitDocs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitdocs.vercel.app",
    title: "GitDocs - AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI",
    siteName: "GitDocs",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitDocs - AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI",
    creator: "@gitdocs",
  },
  alternates: {
    canonical: "https://gitdocs.vercel.app",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <AppLayout>{children}</AppLayout>
        <Analytics />
      </body>
    </html>
  );
}
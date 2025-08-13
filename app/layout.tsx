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
  title: {
    default: "GitDocs - AI-Powered README Generator for GitHub Repositories",
    template: "%s | GitDocs - AI README Generator"
  },
  description:
    "Generate professional README.md files for your GitHub repositories in seconds using AI. Create comprehensive documentation with installation guides, usage examples, and API docs automatically. Free tool for developers.",
  keywords: [
    "README generator",
    "GitHub documentation",
    "AI documentation",
    "markdown generator",
    "repository documentation",
    "GitHub README",
    "documentation automation",
    "developer tools",
    "free README generator",
    "automatic documentation",
    "GitHub tools",
    "markdown creator",
    "repository readme",
    "documentation generator",
    "AI-powered documentation",
    "GitHub repository documentation",
    "readme maker",
    "documentation tool",
    "open source documentation",
    "software documentation"
  ],
  authors: [{ name: "GitDocs Team", url: "https://gitdocs.vercel.app" }],
  creator: "GitDocs",
  publisher: "GitDocs",
  category: "Developer Tools",
  classification: "Software Development Tools",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitdocs.vercel.app",
    title: "GitDocs - AI-Powered README Generator for GitHub",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers to create comprehensive documentation automatically.",
    siteName: "GitDocs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitDocs - AI-Powered README Generator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gitdocs",
    creator: "@gitdocs",
    title: "GitDocs - AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://gitdocs.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "msapplication-TileColor": "#05e17a",
    "theme-color": "#05e17a",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GitDocs",
    "description": "AI-Powered README Generator for GitHub Repositories",
    "url": "https://gitdocs.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "GitDocs Team"
    },
    "featureList": [
      "AI-powered README generation",
      "GitHub repository analysis",
      "Automatic documentation creation",
      "Markdown formatting",
      "Professional templates"
    ],
    "screenshot": "https://gitdocs.vercel.app/screenshot.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#05e17a" />
        <meta name="msapplication-TileColor" content="#05e17a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <AppLayout>{children}</AppLayout>
        <Analytics />
      </body>
    </html>
  );
}
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
  metadataBase: new URL('https://www.gitdocs.xyz'),
  title: {
    default: "GitDocs - Free AI-Powered README Generator for GitHub Repositories",
    template: "%s | GitDocs - Free AI README Generator"
  },
  description:
    "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers to create comprehensive documentation with installation guides, usage examples, and API docs automatically.",
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
  authors: [{ name: "GitDocs Team", url: "https://www.gitdocs.xyz" }],
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
    url: "https://www.gitdocs.xyz",
    title: "GitDocs - Free AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers.",
    siteName: "GitDocs",
    images: [
      {
        url: "https://www.gitdocs.xyz/og-home.png",
        width: 1200,
        height: 630,
        alt: "GitDocs - Free AI-Powered README Generator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gitdocs",
    creator: "@gitdocs",
    title: "GitDocs - Free AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers.",
    images: ["https://www.gitdocs.xyz/twitter-home.png"],
  },
  alternates: {
    canonical: "https://www.gitdocs.xyz",
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
  maximumScale: 5.0,
  userScalable: true,
  viewportFit: "cover",
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
    "url": "https://www.gitdocs.xyz",
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
    "screenshot": "https://www.gitdocs.xyz/screenshot.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
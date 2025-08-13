import { Metadata } from "next";
import NeobrutalistPageUI from "@/components/neobrutalist-page-ui";

export const metadata: Metadata = {
  title: "GitDocs - Free AI-Powered README Generator for GitHub Repositories",
  description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers to create comprehensive documentation with installation guides, usage examples, and API docs automatically.",
  keywords: [
    "free README generator",
    "GitHub README maker",
    "AI documentation tool",
    "automatic README creation",
    "GitHub repository documentation",
    "markdown generator free",
    "developer documentation tool",
    "README template generator",
    "GitHub docs generator",
    "open source documentation"
  ],
  openGraph: {
    title: "GitDocs - Free AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers.",
    url: "https://gitdocs.vercel.app",
    type: "website",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "GitDocs Homepage - AI README Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitDocs - Free AI-Powered README Generator",
    description: "Generate professional README.md files for your GitHub repositories in seconds using AI. Free tool for developers.",
    images: ["/twitter-home.png"],
  },
  alternates: {
    canonical: "https://gitdocs.vercel.app",
  },
};

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "GitDocs - AI README Generator",
        "description": "Free AI-powered README generator for GitHub repositories. Create professional documentation in seconds.",
        "url": "https://gitdocs.vercel.app",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "creator": {
            "@type": "Organization",
            "name": "GitDocs Team",
            "url": "https://gitdocs.vercel.app"
        },
        "featureList": [
            "AI-powered README generation",
            "GitHub repository analysis",
            "Professional documentation templates",
            "Instant markdown generation",
            "Custom project templates",
            "Installation guide generation",
            "Usage example creation",
            "API documentation",
            "Badge integration",
            "License detection"
        ],
        "screenshot": "https://gitdocs.vercel.app/screenshot.png",
        "softwareVersion": "1.0",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "200",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Developer User"
                },
                "reviewBody": "Amazing tool for generating professional README files. Saves hours of work!"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen" role="main">
                <NeobrutalistPageUI />
            </main>
        </>
    )
}

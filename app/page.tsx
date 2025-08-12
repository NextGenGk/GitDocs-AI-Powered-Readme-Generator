import NeobrutalistPageUI from "@/components/neobrutalist-page-ui";

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "GitDocs",
        "description": "AI-powered README generator for GitHub repositories",
        "url": "https://gitdocs.vercel.app",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
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
            "GitHub repository integration",
            "Professional documentation templates",
            "Instant markdown generation",
            "Custom project templates"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen">
                <NeobrutalistPageUI />
            </main>
        </>
    )
}

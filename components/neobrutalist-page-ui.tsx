'use client';

import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
const NewUIBanner = dynamic(
  () => import('@/components/NewUIBanner'),
  { ssr: false }
);
const NeobrutalistNavbar = dynamic(
  () => import('@/components/neobrutalist-navbar'),
  { ssr: false }
);
const NeobrutalistBanner = dynamic(
  () => import('@/components/neobrutalist-banner'),
  { ssr: false }
);
const NeobrutalistFeatures = dynamic(
  () => import('@/components/neobrutalist-features'),
  { ssr: false }
);
const NeobrutalistCta = dynamic(
  () => import('@/components/neobrutalist-cta'),
  { ssr: false }
);
const NeobrutalistFaq = dynamic(
  () => import('@/components/neobrutalist-faq'),
  { ssr: false }
);
const NeobrutalistFooter = dynamic(
  () => import('@/components/neobrutalist-footer'),
  { ssr: false }
);

export default function NeobrutalistPageUI() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <NewUIBanner />
      
      {/* Navigation */}
      <header role="banner">
        <NeobrutalistNavbar />
      </header>
      
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section aria-label="Hero section - AI README Generator introduction">
          <NeobrutalistBanner noPadding={true} />
        </section>
        
        {/* Features Section */}
        <section aria-label="Features and benefits of GitDocs README generator">
          <NeobrutalistFeatures noPadding={true} />
        </section>
        
        {/* FAQ Section */}
        <section aria-label="Frequently asked questions about README generation">
          <NeobrutalistFaq noPadding={true} />
        </section>
        
        {/* Call to Action Section */}
        <section aria-label="Get started with GitDocs README generator">
          <NeobrutalistCta noPadding={true} />
        </section>
      </main>
      
      {/* Footer */}
      <footer role="contentinfo">
        <NeobrutalistFooter noPadding={true} />
      </footer>
    </div>
  );
}

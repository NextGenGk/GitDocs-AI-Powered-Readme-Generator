'use client';

import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
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
      {/* 1. Navbar */}
      <NeobrutalistNavbar />
      
      <main className="flex-1">
        {/* 2. Hero Banner */}
        <NeobrutalistBanner noPadding={true} />
        
        {/* 3. Features */}
        <NeobrutalistFeatures noPadding={true} />
        
        {/* 4. FAQ */}
        <NeobrutalistFaq noPadding={true} />
        
        {/* 5. CTA - Moved after FAQ */}
        <NeobrutalistCta noPadding={true} />
      </main>
      
      {/* 6. Footer */}
      <NeobrutalistFooter noPadding={true} />
    </div>
  );
}

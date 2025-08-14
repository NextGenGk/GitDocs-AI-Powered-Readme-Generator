'use client';

import { useBanner } from '@/contexts/BannerContext';

export default function NewUIBanner() {
  const { isBannerVisible } = useBanner();

  if (!isBannerVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] bg-[#05e17a] border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-center h-12 px-4">
        <p className="text-black font-bold text-xs sm:text-sm md:text-base leading-tight text-center">
          <span className="mr-1 sm:mr-2">✨ Announcement:</span>
          <span className="block sm:inline mt-0.5 sm:mt-0">This is our brand new UI! Check it out and explore all the amazing features we've built for you.</span>
        </p>
      </div>
    </div>
  );
}
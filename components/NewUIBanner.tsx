'use client';

import { X, Sparkles } from 'lucide-react';
import { useBanner } from '@/contexts/BannerContext';

export default function NewUIBanner() {
  const { isBannerVisible, setBannerVisible } = useBanner();

  if (!isBannerVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] bg-[#05e17a] border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center relative">
          <div className="text-center">
            <p className="text-black font-bold text-sm md:text-base">
              <span className="mr-2">✨ Announcement:</span>
              This is our brand new UI! Check it out and explore all the amazing features we've built for you.
            </p>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-0 p-1 rounded-lg text-black hover:bg-black/10 transition-colors"
            aria-label="Close new UI announcement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
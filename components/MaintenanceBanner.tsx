'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function MaintenanceBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-[60] bg-[#ff6b35] border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm md:text-base">
                <span className="inline-block px-2 py-1 bg-black/20 rounded mr-2">🔧</span>
                Site under maintenance - Sorry for the inconvenience! Try again later.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 ml-4 p-1 rounded-lg text-white hover:bg-black/20 transition-colors"
            aria-label="Close maintenance notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
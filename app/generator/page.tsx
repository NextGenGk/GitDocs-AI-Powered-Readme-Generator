'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import the readme generator with no SSR
const ReadmeGenerator = dynamic(
  () => import('@/components/readme-generator'),
  { ssr: false, loading: () => <div className="min-h-[60vh] flex items-center justify-center">Loading generator...</div> }
);

export default function GeneratorPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full">
      {isMounted && <ReadmeGenerator />}
    </div>
  );
}

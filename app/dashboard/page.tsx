'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Simple loading component that matches server and client render
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xl font-black tracking-tight">Loading your dashboard</p>
      </div>
    </div>
  );
}

// Dynamically import the dashboard component with SSR disabled
const NeobrutalistDashboard = dynamic(
  () => import('@/components/neobrutalist-dashboard'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {isClient ? <NeobrutalistDashboard /> : <LoadingSpinner />}
    </div>
  );
}

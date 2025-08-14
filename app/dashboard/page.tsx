'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { BannerProvider } from '@/contexts/BannerContext';
import NewUIBanner from '@/components/NewUIBanner';
import NeobrutalistNavbar from '@/components/neobrutalist-navbar';

// Simple loading component that matches server and client render
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0fdf4] bg-fixed">
      <div className="text-center space-y-4 p-8">
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
    <BannerProvider>
      <Head>
        <title>Dashboard - Generate README | GitDocs AI</title>
        <meta name="description" content="Generate professional README files for your GitHub repositories using AI. Create comprehensive documentation with installation guides, usage examples, and more." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://gitdocs.vercel.app/dashboard" />
      </Head>
      <NewUIBanner />
      <NeobrutalistNavbar />
      <main className="w-full" role="main">
        <h1 className="sr-only">README Generator Dashboard - Create Professional GitHub Documentation</h1>
        {isClient ? <NeobrutalistDashboard /> : <LoadingSpinner />}
      </main>
    </BannerProvider>
  );
}

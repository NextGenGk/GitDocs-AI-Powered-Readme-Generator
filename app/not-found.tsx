'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search, FileText } from 'lucide-react';
import { NeobrutalistButton } from '@/components/ui/neobrutalist-button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0fdf4] bg-fixed flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Header */}
        <div className="mb-8">
          <div className="inline-block mb-6">
            <h1 className="text-8xl md:text-9xl font-black text-black transform -rotate-2">
              <span className="inline-block px-6 py-4 bg-[#05e17a] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                404
              </span>
            </h1>
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4 transform rotate-1">
              <span className="inline-block px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                PAGE NOT FOUND
              </span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-lg mx-auto mb-8">
            Oops! The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best README generators can't document everything!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="relative mb-12">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#05e17a] border-2 border-black transform rotate-12 opacity-20"></div>
          <div className="absolute -top-2 -right-6 w-12 h-12 bg-black transform -rotate-12 opacity-10"></div>
          <div className="absolute -bottom-6 left-8 w-20 h-20 bg-[#05e17a] border-2 border-black transform rotate-45 opacity-15"></div>
          
          {/* Error Illustration */}
          <div className="relative bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mx-auto max-w-md">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>
            <div className="text-gray-500 font-medium">
              This page doesn't exist in our documentation
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/" className="group">
            <NeobrutalistButton 
              className="px-6 py-3 text-base font-bold text-white bg-[#05e17a] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#05e17a] transition-all duration-200"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </NeobrutalistButton>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="group"
          >
            <NeobrutalistButton 
              variant="outline"
              className="px-6 py-3 text-base font-bold text-black bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(5,225,122,1)] hover:bg-[#05e17a] hover:text-black transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </NeobrutalistButton>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md mx-auto">
          <h3 className="text-lg font-black text-black mb-4 uppercase">
            Popular Pages
          </h3>
          <div className="space-y-2">
            <Link 
              href="/dashboard" 
              className="block text-[#05e17a] font-bold hover:text-black transition-colors underline decoration-2 underline-offset-2"
            >
              → Dashboard
            </Link>
            <Link 
              href="/feedback" 
              className="block text-[#05e17a] font-bold hover:text-black transition-colors underline decoration-2 underline-offset-2"
            >
              → Feedback
            </Link>
            <Link 
              href="/issues" 
              className="block text-[#05e17a] font-bold hover:text-black transition-colors underline decoration-2 underline-offset-2"
            >
              → Report Issues
            </Link>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            Lost? No worries! Even the best AI can't predict every URL. 
            <br />
            <span className="font-bold text-[#05e17a]">GitDocs</span> is here to help you get back on track.
          </p>
        </div>
      </div>
    </div>
  );
}
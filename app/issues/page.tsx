'use client';

import Link from 'next/link';
import NeobrutalistFooter from '@/components/neobrutalist-footer';
import NeobrutalistNavbar from '@/components/neobrutalist-navbar';

export default function IssuesPage() {
  const handleReportClick = () => {
    const subject = 'Issue Report for GitDocs';
    const body = 'Please describe the issue you\'re experiencing in detail.\n\nSteps to reproduce:\n1. \n2. \n3. \n\nExpected behavior:\n\nActual behavior:';
    window.location.href = `mailto:gauravkumar4841@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <NeobrutalistNavbar />
      <div className="container mx-auto px-0 py-16 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col">
        <div className="text-center mb-12 group">
          <h1 className="text-4xl font-black mb-4 text-center">
            <span className="
              inline-block px-4 py-2 bg-[#05e17a] text-white 
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1
              transition-all duration-300 ease-in-out
              group-hover:shadow-[8px_8px_0px_0px_rgba(5,225,122,1)]
              group-hover:translate-y-[-2px]
            ">
              REPORT AN ISSUE
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Found a bug or have a suggestion? Let us know and we'll help you out!
          </p>
        </div>
        
        <div className="
          bg-white border-4 border-black p-8 mb-12 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
          hover:shadow-[12px_12px_0px_0px_rgba(5,225,122,1)]
          transition-all duration-300 ease-in-out
          transform hover:-translate-y-1
          text-center
        ">
          <h2 className="text-2xl font-black mb-4 group-hover:text-[#05e17a] transition-colors duration-300">
            Found an Issue?
          </h2>
          <p className="mb-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            Report bugs, request features, or suggest improvements to help us make GitDocs better for everyone.
          </p>
          <button
            onClick={handleReportClick}
            className="
              px-6 py-3 bg-black text-white font-bold 
              border-2 border-black 
              hover:bg-[#05e17a] hover:text-black 
              hover:border-[#05e17a]
              transform hover:scale-105
              active:scale-95
              transition-all duration-200 ease-in-out
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(5,225,122,1)]
            "
          >
            Report an Issue
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Your issue report will be sent to gauravkumar4841@gmail.com
          </p>
        </div>
        
        <div className="text-center">
          <Link 
            href="/" 
            className="text-black hover:underline font-medium inline-flex items-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <NeobrutalistFooter />
    </div>
  );
}

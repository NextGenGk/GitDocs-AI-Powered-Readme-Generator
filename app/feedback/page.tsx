"use client";

import Link from 'next/link';
import NeobrutalistFooter from '@/components/neobrutalist-footer';
import NeobrutalistNavbar from '@/components/neobrutalist-navbar';
import { BannerProvider, useBanner } from '@/contexts/BannerContext';
import NewUIBanner from '@/components/NewUIBanner';

function FeedbackContent() {
  const { isBannerVisible } = useBanner();
  
  const handleFeedbackClick = () => {
    const subject = 'Feedback for GitDocs';
    const body = 'Your feedback here...';
    window.location.href = `mailto:gauravkumar4841@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] bg-fixed">
      <NewUIBanner />
      <NeobrutalistNavbar />
      <div className={`w-full transition-all duration-300 ease-in-out ${isBannerVisible ? 'pt-[76px] sm:pt-[84px]' : 'pt-8 sm:pt-12'} pb-4 sm:pb-6`}>
        <div className="container mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center space-y-4 sm:space-y-6 py-4 sm:py-6">
        <div className="text-center group w-full">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-center">
            <span className="
              inline-block px-3 xs:px-4 py-2 bg-[#05e17a] text-white 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1
              transition-all duration-300 ease-in-out
              group-hover:shadow-[6px_6px_0px_0px_rgba(5,225,122,1)] sm:group-hover:shadow-[8px_8px_0px_0px_rgba(5,225,122,1)]
              group-hover:translate-y-[-2px]
            ">
              SHARE YOUR FEEDBACK
            </span>
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Help us make GitDocs even better! Your feedback is valuable to us.
          </p>
        </div>

        <div className="
          bg-white border-2 sm:border-3 md:border-4 border-black p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10
          shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(5,225,122,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(5,225,122,1)] lg:hover:shadow-[12px_12px_0px_0px_rgba(5,225,122,1)]
          transition-all duration-300 ease-in-out
          transform hover:-translate-y-1
          text-center w-full max-w-2xl
        ">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-black mb-3 sm:mb-4 group-hover:text-[#05e17a] transition-colors duration-300">
            Send Us Your Feedback
          </h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
            Share your thoughts, suggestions, or feature requests to help us improve GitDocs.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={handleFeedbackClick}
              className="
                px-4 py-2 bg-black text-white font-bold text-sm
                border-2 border-black 
                hover:bg-[#05e17a] hover:text-black 
                hover:border-[#05e17a]
                transform hover:scale-105
                active:scale-95
                transition-all duration-200 ease-in-out
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]
              "
            >
              Send Feedback
            </button>
          </div>
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 leading-relaxed">
            Your feedback will be sent to gauravkumar4841@gmail.com
          </p>
        </div>
        
        <div className="text-center w-full">
          <Link href="/" className="text-sm xs:text-base text-[#05e17a] hover:underline font-medium transition-colors inline-flex items-center">
            ← Back to Home
          </Link>
        </div>
        </div>
      </div>
      <NeobrutalistFooter />
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <BannerProvider>
      <FeedbackContent />
    </BannerProvider>
  );
}

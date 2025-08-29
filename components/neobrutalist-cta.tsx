import Link from 'next/link';
import { Mail, MessageSquare } from 'lucide-react';

interface NeobrutalistCtaProps {
  noPadding?: boolean;
}

export default function NeobrutalistCta({ noPadding = false }: NeobrutalistCtaProps) {
  return (
    <section className="bg-[#f0fdf4] w-full">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <div className="
          border-2 border-black rounded-xl p-8 
          bg-white transition-all duration-200
          hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
          hover:border-2 hover:border-black
          group
        ">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-[#05e17a] w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-8 h-8 text-black" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;re here to help! Reach out to our support team for any inquiries or assistance.
              </p>
              <div className="flex justify-center md:justify-start">
                <a 
                  href="mailto:gauravkumar4841@gmail.com" 
                  className="
                    relative px-4 py-2 border-2 border-black bg-black text-white 
                    font-bold text-base 
                    hover:bg-[#05e17a] hover:text-black
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center gap-1.5
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                    hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]
                    active:translate-x-0.5 active:translate-y-0.5
                    active:shadow-[2px_2px_0px_0px_rgba(5,225,122,1)]
                    group/btn
                  "
                >
                  <Mail className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  <span className="transition-transform group-hover/btn:translate-x-0.5">
                    Contact Support
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

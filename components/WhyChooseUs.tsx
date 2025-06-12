import React from 'react';
import {
  IconBrain,
  IconClock,
  IconDeviceDesktop,
  IconDownload,
  IconEdit,
  IconFileText
} from '@tabler/icons-react';
import {TrendingUp} from "lucide-react";

const features = [
  {
    icon: <IconBrain size={28} />,
    title: "AI-Powered Generation",
    description: "Our advanced AI technology analyzes your repository to create comprehensive, professional README files.",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: <IconClock size={28} />,
    title: "Save Time",
    description: "Generate a complete README in seconds instead of spending hours writing documentation.",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    icon: <IconFileText size={28} />,
    title: "Complete Documentation",
    description: "Get all essential sections including installation, usage, features, and more in one go.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: <IconEdit size={28} />,
    title: "Fully Editable",
    description: "Edit your generated README directly in the browser before downloading.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: <IconDownload size={28} />,
    title: "One-Click Download",
    description: "Download your polished README.md file with a single click, ready to add to your repository.",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    icon: <IconDeviceDesktop size={28} />,
    title: "Works Everywhere",
    description: "Our responsive design works on any device - desktop, tablet, or mobile.",
    gradient: "from-violet-500 to-purple-600"
  }
];

export default function WhyChooseUs() {
  return (
      <div className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        {/* Container for the content */}
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-pink-400 text-white px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Why Choose Us?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Why Choose Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Platform?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Discover the powerful features that make our AI-powered README generator the perfect choice for developers worldwide.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 sm:duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 overflow-hidden touch-manipulation"
                >
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:duration-500" />

                  {/* Content */}
                  <div className="relative p-5 sm:p-6 lg:p-8">
                    {/* Icon with Gradient Background */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 sm:mb-5 lg:mb-6 shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors leading-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>

                    {/* Decorative Element */}
                    <div className={`absolute bottom-0 left-0 h-0.5 sm:h-1 w-0 bg-gradient-to-r ${feature.gradient} group-hover:w-full transition-all duration-300 sm:duration-500`} />
                  </div>

                  {/* Subtle Glow Effect - Only on larger screens */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 sm:duration-500 -z-10 blur hidden sm:block`} />
                </div>
            ))}
          </div>

          {/* Optional: Call to Action - Uncomment if needed */}
          {/*<div className="text-center mt-12 sm:mt-16">
            <button className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              <span>Get Started Now</span>
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>*/}
        </div>
      </div>
  );
}
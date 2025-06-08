import React from 'react';
import {
  IconBrain,
  IconClock,
  IconDeviceDesktop,
  IconDownload,
  IconEdit,
  IconFileText
} from '@tabler/icons-react';

const features = [
  {
    icon: <IconBrain size={32} />,
    title: "AI-Powered Generation",
    description: "Our advanced AI technology analyzes your repository to create comprehensive, professional README files.",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: <IconClock size={32} />,
    title: "Save Time",
    description: "Generate a complete README in seconds instead of spending hours writing documentation.",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    icon: <IconFileText size={32} />,
    title: "Complete Documentation",
    description: "Get all essential sections including installation, usage, features, and more in one go.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: <IconEdit size={32} />,
    title: "Fully Editable",
    description: "Edit your generated README directly in the browser before downloading.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: <IconDownload size={32} />,
    title: "One-Click Download",
    description: "Download your polished README.md file with a single click, ready to add to your repository.",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    icon: <IconDeviceDesktop size={32} />,
    title: "Works Everywhere",
    description: "Our responsive design works on any device - desktop, tablet, or mobile.",
    gradient: "from-violet-500 to-purple-600"
  }
];

export default function WhyChooseUs() {
  return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make our AI-powered README generator the perfect choice for developers worldwide.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon with Gradient Background */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>

                    {/* Decorative Element */}
                    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} group-hover:w-full transition-all duration-500`} />
                  </div>

                  {/* Subtle Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur`} />
                </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span>Get Started Now</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
  );
}
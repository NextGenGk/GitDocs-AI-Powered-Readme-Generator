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
    description: "Our advanced AI technology analyzes your repository to create comprehensive, professional README files."
  },
  {
    icon: <IconClock size={32} />,
    title: "Save Time",
    description: "Generate a complete README in seconds instead of spending hours writing documentation."
  },
  {
    icon: <IconFileText size={32} />,
    title: "Complete Documentation",
    description: "Get all essential sections including installation, usage, features, and more in one go."
  },
  {
    icon: <IconEdit size={32} />,
    title: "Fully Editable",
    description: "Edit your generated README directly in the browser before downloading."
  },
  {
    icon: <IconDownload size={32} />,
    title: "One-Click Download",
    description: "Download your polished README.md file with a single click, ready to add to your repository."
  },
  {
    icon: <IconDeviceDesktop size={32} />,
    title: "Works Everywhere",
    description: "Our responsive design works on any device - desktop, tablet, or mobile."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GitDocs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GitDocs makes creating professional README files for your GitHub repositories quick, easy, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

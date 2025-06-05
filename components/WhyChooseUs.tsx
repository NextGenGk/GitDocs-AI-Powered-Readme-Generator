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
  );
}

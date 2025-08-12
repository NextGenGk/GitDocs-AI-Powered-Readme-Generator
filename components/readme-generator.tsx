'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NeobrutalistButton } from './ui/neobrutalist-button';

// Form schema using Zod for validation
const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  installation: z.string().optional(),
  usage: z.string().optional(),
  features: z.string().optional(),
  contributing: z.string().optional(),
  license: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReadmeGenerator() {
  const [markdown, setMarkdown] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const generateMarkdown = (data: FormValues) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const { projectName, description, installation, usage, features, contributing, license } = data;
      
      const markdownContent = `# ${projectName}

## Description
${description}

${installation ? `## Installation
${installation}
` : ''}
${usage ? `## Usage
${usage}
` : ''}
${features ? `## Features
${features}
` : ''}
${contributing ? `## Contributing
${contributing}
` : ''}
${license ? `## License
${license}
` : ''}
`;

      setMarkdown(markdownContent);
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black mb-2">README Generator</h1>
        <p className="text-gray-600">Fill in the details below to generate a professional README.md file</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-6">Project Details</h2>
          
          <form onSubmit={handleSubmit(generateMarkdown)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name*</label>
              <input
                type="text"
                {...register('projectName')}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="My Awesome Project"
              />
              {errors.projectName && (
                <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description*</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="A brief description of your project..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Installation</label>
              <textarea
                {...register('installation')}
                rows={2}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="npm install my-package"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Usage</label>
              <textarea
                {...register('usage')}
                rows={3}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="How to use your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Features</label>
              <textarea
                {...register('features')}
                rows={2}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="- Feature 1\n- Feature 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contributing</label>
              <textarea
                {...register('contributing')}
                rows={2}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="How to contribute to your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">License</label>
              <select
                {...register('license')}
                className="w-full p-2 border-2 border-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a license</option>
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL-3.0</option>
                <option value="ISC">ISC</option>
                <option value="Unlicense">Unlicense</option>
              </select>
            </div>

            <div className="pt-2">
              <NeobrutalistButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate README'}
              </NeobrutalistButton>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Preview</h2>
            {markdown && (
              <NeobrutalistButton
                onClick={copyToClipboard}
                variant="secondary"
                size="sm"
              >
                Copy to Clipboard
              </NeobrutalistButton>
            )}
          </div>
          
          {markdown ? (
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-md font-mono text-sm whitespace-pre-wrap">
              {markdown}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-500">
              <p>Your generated README will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

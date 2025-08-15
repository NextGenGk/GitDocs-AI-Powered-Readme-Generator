'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';
import { checkReadmeLimit } from '@/lib/readme-limiter';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
// @ts-ignore - We'll handle the type issues with rehype-raw
import rehypeRaw from 'rehype-raw';

// Create a simple markdown renderer with proper styling
const SimpleMarkdown = ({ content }: { content: string }) => {
  return (
    <div className="markdown-body w-full max-w-full overflow-x-auto">
      <style jsx global>{`
        .markdown-body {
          font-family: inherit;
          line-height: 1.6;
          color: #1f2937;
        }
        .markdown-body h1, 
        .markdown-body h2, 
        .markdown-body h3, 
        .markdown-body h4, 
        .markdown-body h5, 
        .markdown-body h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
          line-height: 1.25;
        }
        .markdown-body p {
          margin-top: 0;
          margin-bottom: 1em;
        }
        .markdown-body pre {
          background-color: #f3f4f6;
          border-radius: 0.375rem;
          padding: 1em;
          overflow-x: auto;
          margin: 1em 0;
        }
        .markdown-body code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }
        .markdown-body pre code {
          padding: 0;
          background-color: transparent;
        }
        .markdown-body ul, 
        .markdown-body ol {
          padding-left: 2em;
          margin: 1em 0;
        }
        .markdown-body li {
          margin-bottom: 0.5em;
        }
        .markdown-body a {
          color: #2563eb;
          text-decoration: none;
        }
        .markdown-body a:hover {
          text-decoration: underline;
        }
      `}</style>
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Custom components with proper TypeScript types
const components: Components = {
  img: ({ src, alt, ...props }) => {
    const imageSrc = src || '';
    const imageAlt = alt || '';
    const isBadge = imageSrc.includes('shields.io') || 
                   imageSrc.includes('badge') ||
                   imageAlt.toLowerCase().includes('badge');
    
    return (
      <span className={`inline-block ${isBadge ? 'align-middle mx-0.5' : ''}`}>
        <img 
          src={imageSrc}
          alt={imageAlt}
          className={`inline-block ${isBadge ? 'h-5' : 'max-w-full h-auto'}`}
          loading="lazy"
          {...props}
        />
      </span>
    );
  },
  a: ({ href, children, ...props }) => (
    <a 
      href={href || '#'}
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
      {...props}
    >
      {children}
    </a>
  )
};

import { 
  NeobrutalistCard, 
  NeobrutalistCardContent, 
  NeobrutalistCardHeader, 
  NeobrutalistCardTitle,
} from '@/components/ui/neobrutalist-card';
import { NeobrutalistButton } from '@/components/ui/neobrutalist-button';
import { 
  FileText, 
  AlertCircle, 
  Download, 
  Copy, 
  RefreshCw, 
  Eye, 
  Edit,
  Github
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NeobrutalistFooter from '@/components/neobrutalist-footer';
import { useBanner } from '@/contexts/BannerContext';

const formSchema = z.object({
  githubUrl: z.string()
    .url('Please enter a valid URL')
    .refine(url => url.includes('github.com'), {
      message: 'URL must be from GitHub',
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface UsageInfo {
  generationsUsed: number;
  maxGenerations: number;
  remaining: number;
  isLimitReached: boolean;
}

// Main dashboard component
export default function NeobrutalistDashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { isBannerVisible } = useBanner();
  const [markdown, setMarkdown] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [usageInfo, setUsageInfo] = useState<UsageInfo>({
    generationsUsed: 0,
    maxGenerations: 3,
    remaining: 3,
    isLimitReached: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'source'>('preview');
  const [editedContent, setEditedContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // Check user's README limit on load and when user changes
  useEffect(() => {
    const checkLimit = async () => {
      if (!isUserLoaded || !user) return;
      
      try {
        const limitInfo = await checkReadmeLimit(user.id);
        
        setUsageInfo({
          generationsUsed: limitInfo.generationsUsed,
          maxGenerations: 3,
          remaining: limitInfo.remaining,
          isLimitReached: limitInfo.isLimitReached
        });
      } catch (error) {
        setError('Failed to check your readme limit');
      }
    };

    checkLimit();
  }, [isUserLoaded, user]);

  // Update editedContent when markdown changes
  useEffect(() => {
    setEditedContent(markdown);
  }, [markdown]);

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      setError('You must be logged in to generate READMEs');
      return;
    }

    // Check readme limit before generating
    try {
      const limitInfo = await checkReadmeLimit(user.id);
      if (limitInfo.isLimitReached) {
        setError('You have reached your limit of 3 READMEs per account');
        setUsageInfo({
          generationsUsed: limitInfo.generationsUsed,
          maxGenerations: 3,
          remaining: 0,
          isLimitReached: true
        });
        return;
      }
    } catch (error) {
      console.error('Error checking limit:', error);
      setError('Failed to check your readme limit. Please try again.');
      return;
    }

    setActiveTab('preview');
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('/api/github-to-markdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          githubUrl: data.githubUrl
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate README');
      }

      if (!result.markdown) {
        throw new Error('No markdown content was generated');
      }
      
      // Update markdown content
      setMarkdown(result.markdown);
      
      // Update usage info from API response
      if (result.generationsUsed !== undefined) {
        setUsageInfo(prev => ({
          ...prev,
          generationsUsed: result.generationsUsed,
          remaining: result.remaining || 0,
          isLimitReached: result.isLimitReached || false
        }));
      }
      
      // Scroll to the result section
      setTimeout(() => {
        const resultSection = document.getElementById('result-section');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
    } catch (err: any) {
      setError(err.message || 'Failed to generate README. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const contentToCopy = editedContent || markdown;
      
      if (!navigator.clipboard) {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = contentToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (!successful) {
            throw new Error('Failed to copy using execCommand');
          }
        } finally {
          document.body.removeChild(textArea);
        }
      } else {
        await navigator.clipboard.writeText(contentToCopy);
      }

    } catch (err) {
      alert('Failed to copy to clipboard. Please try selecting and copying the text manually.');
    }
  };

  const downloadMarkdown = () => {
    const contentToDownload = editedContent || markdown;
    const blob = new Blob([contentToDownload], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveChanges = () => {
    setMarkdown(editedContent);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#f0fdf4] bg-fixed">
      <div className={`w-full transition-all duration-300 ease-in-out ${isBannerVisible ? 'pt-[68px] sm:pt-[76px] md:pt-[80px] lg:pt-[84px] xl:pt-[88px]' : 'pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32'} pb-0 sm:pb-0 md:pb-1 lg:pb-2 xl:pb-4`}>
        <div className="max-w-6xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-6 space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 py-0 sm:py-0 md:py-1 lg:py-2">
        {/* Header Section */}
        <div className="text-center px-2">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black mb-2 leading-tight">GitHub README Generator</h1>
          <p className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Create beautiful README files for your GitHub repositories in seconds</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-bold">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Generation Form */}
        <NeobrutalistCard className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
          <NeobrutalistCardHeader className="border-b-2 border-black p-3 sm:p-4">
            <NeobrutalistCardTitle className="text-lg xs:text-xl sm:text-2xl font-black">
              Generate New README
            </NeobrutalistCardTitle>
          </NeobrutalistCardHeader>
          <NeobrutalistCardContent className="p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4 sm:space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 xs:space-y-4 sm:space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <label htmlFor="githubUrl" className="block text-xs xs:text-sm font-bold text-black">
                    GitHub Repository URL
                  </label>
                </div>
                <div className="flex flex-col space-y-2 xs:space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <div className="flex-grow">
                    <input
                      id="githubUrl"
                      type="text"
                      placeholder="https://github.com/username/repo"
                      className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-[#05e17a] rounded-none"
                      {...register('githubUrl')}
                    />
                    {errors.githubUrl && (
                      <p className="mt-1 text-sm text-red-600 font-medium">
                        {errors.githubUrl.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full sm:w-auto">
                    <NeobrutalistButton 
                      type="submit" 
                      disabled={isGenerating || usageInfo.isLimitReached}
                      className="w-full sm:w-auto whitespace-nowrap h-11 xs:h-12 sm:h-12 px-3 xs:px-4 sm:px-6 min-w-[100px] xs:min-w-[120px] sm:min-w-[140px] text-xs xs:text-sm sm:text-base font-bold"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-xs sm:text-sm">
                            Generating...
                          </span>
                        </div>
                      ) : (
                        <span>Generate</span>
                      )}
                    </NeobrutalistButton>
                  </div>
                </div>
              </div>
            </form>

            {/* Usage Info */}
            <div className="bg-gray-100 p-3 sm:p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-1 sm:space-y-0">
                <span className="font-bold text-xs sm:text-sm">Account Usage</span>
                <span className="font-mono text-xs sm:text-sm">
                  {usageInfo.generationsUsed} / {usageInfo.maxGenerations} generations
                </span>
              </div>
              <div className="w-full bg-gray-300 h-2 sm:h-3 border border-black">
                <div 
                  className="h-full bg-[#05e17a] transition-all duration-500 ease-in-out"
                  style={{ width: `${(usageInfo.generationsUsed / usageInfo.maxGenerations) * 100}%` }}
                />
              </div>
              {usageInfo.remaining === 0 && (
                <p className="mt-2 text-xs text-red-600 font-medium text-center leading-relaxed">
                  Account limit reached. You have used all 3 README generations for this account.
                </p>
              )}
            </div>
          </NeobrutalistCardContent>
        </NeobrutalistCard>

        {/* Preview Section */}
        {markdown && (
          <div id="result-section" className="transition-all duration-300">
            <NeobrutalistCard className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <NeobrutalistCardHeader className="border-b-2 border-black p-0">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center p-4">
                    <NeobrutalistCardTitle className="text-xl font-black">
                      Generated README
                    </NeobrutalistCardTitle>
                    <div className="flex space-x-2">
                      <NeobrutalistButton
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2"
                      >
                        {isEditing ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </NeobrutalistButton>
                      <NeobrutalistButton
                        variant="secondary"
                        size="sm"
                        onClick={copyToClipboard}
                        className="p-2"
                      >
                        <Copy className="w-4 h-4" />
                      </NeobrutalistButton>
                      <NeobrutalistButton
                        variant="primary"
                        size="sm"
                        onClick={downloadMarkdown}
                        className="p-2"
                      >
                        <Download className="w-4 h-4" />
                      </NeobrutalistButton>
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  {!isEditing && (
                    <div className="flex border-b-2 border-black">
                      <button
                        type="button"
                        className={`px-4 py-2 font-bold text-sm border-r-2 border-black transition-colors ${
                          activeTab === 'preview' ? 'bg-[#05e17a]' : 'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveTab('preview')}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 font-bold text-sm transition-colors ${
                          activeTab === 'source' ? 'bg-[#05e17a]' : 'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveTab('source')}
                      >
                        Source
                      </button>
                    </div>
                  )}
                </div>
              </NeobrutalistCardHeader>
              <NeobrutalistCardContent className="p-0">
                {isEditing ? (
                  <div className="flex flex-col h-96">
                    <div className="flex-1 overflow-auto">
                      <textarea
                        ref={textareaRef}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-full p-4 border-none resize-none focus:outline-none font-mono text-sm bg-white"
                        placeholder="Edit your README..."
                      />
                    </div>
                    <div className="p-3 bg-gray-100 border-t-2 border-black flex justify-end space-x-3">
                      <NeobrutalistButton
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setEditedContent(markdown);
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </NeobrutalistButton>
                      <NeobrutalistButton
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </NeobrutalistButton>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] overflow-hidden">
                    <div className="h-full overflow-auto">
                      {activeTab === 'preview' ? (
                        <div className="p-4">
                          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded-r">
                            <p className="font-bold">Preview Only</p>
                            <p className="text-sm">This is a simplified preview. Download the file to see the full GitHub-flavored markdown with all features!</p>
                          </div>
                          {isGenerating ? (
                            <div className="flex items-center justify-center py-12">
                              <div className="text-center space-y-4">
                                <div className="w-12 h-12 border-4 border-[#05e17a] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                                <div className="space-y-2">
                                  <p className="text-gray-800 font-bold text-lg">
                                    Generating your README...
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    Please wait while we create your professional README
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="prose max-w-none">
                              <SimpleMarkdown content={markdown} />
                            </div>
                          )}
                        </div>
                      ) : (
                        <pre className="p-6 bg-gray-50 text-xs font-mono overflow-auto h-full">
                          <code className="whitespace-pre-wrap">
                            {markdown}
                          </code>
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </NeobrutalistCardContent>
            </NeobrutalistCard>
          </div>
        )}



        {/* Three Boxes Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <NeobrutalistCard className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
            <NeobrutalistCardHeader className="border-b-2 border-black p-4">
              <NeobrutalistCardTitle className="text-lg font-black">
                Quick Start
              </NeobrutalistCardTitle>
            </NeobrutalistCardHeader>
            <NeobrutalistCardContent className="p-4 flex-grow flex flex-col justify-between">
              <p className="text-gray-700 mb-4 flex-grow text-sm">Paste your GitHub URL and let AI create a professional README instantly.</p>
              <div className="flex items-center text-sm text-gray-600 mt-auto">
                <span className="w-6 h-6 rounded-full bg-[#05e17a] flex items-center justify-center text-white font-bold mr-2">1</span>
                <span>Paste GitHub URL</span>
              </div>
            </NeobrutalistCardContent>
          </NeobrutalistCard>

          <NeobrutalistCard className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
            <NeobrutalistCardHeader className="border-b-2 border-black p-4">
              <NeobrutalistCardTitle className="text-lg font-black">
                Customization
              </NeobrutalistCardTitle>
            </NeobrutalistCardHeader>
            <NeobrutalistCardContent className="p-4 flex-grow flex flex-col justify-between">
              <p className="text-gray-700 mb-4 flex-grow text-sm">Edit and preview your README with our built-in editor. Perfect your docs in real-time.</p>
              <div className="flex items-center text-sm text-gray-600 mt-auto">
                <span className="w-6 h-6 rounded-full bg-[#05e17a] flex items-center justify-center text-white font-bold mr-2">2</span>
                <span>Edit & Preview</span>
              </div>
            </NeobrutalistCardContent>
          </NeobrutalistCard>

          <NeobrutalistCard className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
            <NeobrutalistCardHeader className="border-b-2 border-black p-4">
              <NeobrutalistCardTitle className="text-lg font-black">
                Download & Share
              </NeobrutalistCardTitle>
            </NeobrutalistCardHeader>
            <NeobrutalistCardContent className="p-4 flex-grow flex flex-col justify-between">
              <p className="text-gray-700 mb-4 flex-grow text-sm">Download as .md file or copy to clipboard. Ready to add to your GitHub repo instantly.</p>
              <div className="flex items-center text-sm text-gray-600 mt-auto">
                <span className="w-6 h-6 rounded-full bg-[#05e17a] flex items-center justify-center text-white font-bold mr-2">3</span>
                <span>Download & Share</span>
              </div>
            </NeobrutalistCardContent>
          </NeobrutalistCard>
        </div>
      </div>
      
      {/* Back to Home Button */}
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
          <Link href="/" className="text-[#05e17a] hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
      <NeobrutalistFooter />
    </div>
  );
}
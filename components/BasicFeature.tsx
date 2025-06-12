"use client";

import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, CheckCircle, Github, Download, Copy, HelpCircle, Edit, Eye, Save, RefreshCw } from 'lucide-react';

interface UsageInfo {
    generationsUsed: number;
    maxGenerations: number;
    remaining: number;
    isLimitReached: boolean;
}

export default function BasicFeature() {
    const [usageInfo, setUsageInfo] = useState<UsageInfo>({
        generationsUsed: 0,
        maxGenerations: 3,
        remaining: 3,
        isLimitReached: false
    });

    const [markdownContent, setMarkdownContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [githubUrl, setGithubUrl] = useState('');

    // Fetch usage info on component mount
    useEffect(() => {
        fetchUsageInfo();
    }, []);

    const fetchUsageInfo = async () => {
        try {
            const res = await fetch('/api/github-to-markdown');
            if (res.ok) {
                const data = await res.json();
                setUsageInfo(data);
            }
        } catch (err) {
            console.error('Failed to fetch usage info:', err);
        }
    };

    const handleSubmit = async () => {
        if (!githubUrl.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/github-to-markdown', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ githubUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                setMarkdownContent(data.markdown || '');
                setUsageInfo({
                    generationsUsed: data.generationsUsed,
                    maxGenerations: data.maxGenerations,
                    remaining: data.remaining,
                    isLimitReached: data.isLimitReached
                });
            } else {
                setError(data.error || 'Failed to generate README');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdownContent);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const downloadMarkdown = () => {
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderMarkdownPreview = (markdown: string) => {
        // Simple markdown to HTML conversion for preview
        return markdown
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2">$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
            .replace(/```([^`]+)```/gim, '<pre class="bg-gray-100 p-3 rounded text-sm overflow-x-auto"><code>$1</code></pre>')
            .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
            .replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
            .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/\n/gim, '<br>');
    };

    return (
        <div className="min-h-screen py-22 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-40 left-10 w-72 h-72 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4 " />
                        You Code We Document!!
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        Documentation Generator
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Transform your GitHub repositories into beautiful, comprehensive documentation in seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {/* Input Section */}
                    <div className="w-full shadow-lg border border-blue-200 rounded-lg hover:border-blue-300 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 -translate-x-1/2 blur-xl z-0"></div>
                        <div className="relative z-10 bg-gray-50 border-b border-blue-100 p-4">
                            <h3 className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                                <Github className="h-5 w-5" />
                                Generate Documentation
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Enter your GitHub repository URL to generate a comprehensive README
                            </p>
                        </div>
                        <div className="space-y-6 p-6 relative z-10">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                    <div className="flex items-center gap-2 text-red-600">
                                        <AlertCircle className="h-4 w-4" />
                                        <span className="text-sm">{error}</span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="github-url" className="text-blue-700 font-medium text-sm">
                                        GitHub Repository URL
                                    </label>
                                    <input
                                        id="github-url"
                                        type="url"
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                        placeholder="https://github.com/username/repository"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        disabled={usageInfo.isLimitReached || isLoading}
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={usageInfo.isLimitReached || isLoading || !githubUrl.trim()}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white py-3 px-4 rounded-md font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <FileText className="h-4 w-4" />
                                    )}
                                    {isLoading ? 'Generating...' : 'Generate README'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="w-full shadow-lg border border-blue-200 rounded-lg hover:border-blue-300 transition-all duration-300 overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-y-1/2 translate-x-1/2 blur-xl z-0"></div>
                        <div className="relative z-10 bg-gray-50 border-b border-blue-100 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-blue-600 font-semibold text-lg">Generated README</h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Your generated README markdown content
                                    </p>
                                </div>
                                {markdownContent && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="flex items-center gap-1 px-3 py-1 border border-blue-300 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                            {isEditing ? <Eye className="h-3 w-3" /> : <Edit className="h-3 w-3" />}
                                            {isEditing ? 'Preview' : 'Edit'}
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex items-center gap-1 px-3 py-1 border border-blue-300 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                            <Copy className="h-3 w-3" />
                                            Copy
                                        </button>
                                        <button
                                            onClick={downloadMarkdown}
                                            className="flex items-center gap-1 px-3 py-1 border border-blue-300 rounded-md text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                            <Download className="h-3 w-3" />
                                            Download
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="relative z-10 p-4">
                            <div className="h-64 md:h-80 lg:h-96 border rounded-md overflow-hidden bg-gray-50 shadow-inner">
                                {markdownContent ? (
                                    isEditing ? (
                                        <textarea
                                            value={markdownContent}
                                            onChange={(e) => setMarkdownContent(e.target.value)}
                                            className="w-full h-full p-4 border-none resize-none focus:outline-none font-mono text-sm bg-white"
                                            placeholder="Your generated README markdown will appear here..."
                                        />
                                    ) : (
                                        <div className="w-full h-full p-4 overflow-auto bg-white">
                                            <div
                                                className="prose prose-sm max-w-none text-gray-800"
                                                dangerouslySetInnerHTML={{
                                                    __html: renderMarkdownPreview(markdownContent)
                                                }}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <div className="text-center space-y-3">
                                            <FileText className="h-12 w-12 mx-auto opacity-50" />
                                            <p>Generated README will appear here after submission</p>
                                            <div className="inline-block bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-sm">
                                                Markdown Preview
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Usage Tracking Card */}
                <div className="mt-8 mb-6 md:mt-12 md:mb-8 max-w-7xl mx-auto shadow-lg border border-blue-200 rounded-lg overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl z-0"></div>
                    <div className="relative z-10 bg-gray-50 border-b border-blue-100 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {usageInfo.isLimitReached ? (
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                )}
                                <div>
                                    <h3 className="text-lg text-blue-600 font-semibold">Usage Tracking</h3>
                                    <p className="text-gray-600 text-sm">
                                        Monitor your README generations
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-lg px-3 py-1 rounded-full font-medium ${
                                    usageInfo.isLimitReached
                                        ? 'bg-red-100 text-red-700 border border-red-200'
                                        : usageInfo.remaining === 1
                                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            : 'bg-green-100 text-green-700 border border-green-200'
                                }`}>
                                    {usageInfo.remaining}/{usageInfo.maxGenerations}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Remaining</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 p-6 relative z-10">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Generations Used</span>
                            <span>{usageInfo.generationsUsed} of {usageInfo.maxGenerations}</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(usageInfo.generationsUsed / usageInfo.maxGenerations) * 100}%` }}
                            ></div>
                        </div>

                        {usageInfo.isLimitReached && (
                            <>
                                <hr className="border-blue-100" />
                                <div className="border border-red-200 bg-red-50 rounded-md p-4">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-red-700 text-sm">
                                                Generation limit reached! You have used all {usageInfo.maxGenerations} available generations.
                                            </span>
                                            <button
                                                className="ml-4 px-3 py-1 border border-red-300 rounded-md text-sm text-red-600 hover:bg-red-100 transition-colors"
                                                onClick={() => window.location.href = '/pricing'}
                                            >
                                                Upgrade to Pro
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
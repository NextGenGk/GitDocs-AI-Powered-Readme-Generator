'use client';

import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import ProFeature from "@/components/ProFeature";
import AdvancedFeature from "@/components/AdvancedFeature";

interface UsageInfo {
    generationsUsed: number;
    maxGenerations: number;
    remaining: number;
    isLimitReached: boolean;
}

export default function ReadmeGeneratorPage() {
    const { has } = useAuth();
    const [planStatus, setPlanStatus] = useState({
        hasBasicPlan: true,
        hasProPlan: false,
        hasPremiumPlan: false
    });

    const [githubUrl, setGithubUrl] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [usageInfo, setUsageInfo] = useState<UsageInfo>({
        generationsUsed: 0,
        maxGenerations: 3,
        remaining: 3,
        isLimitReached: false
    });

    // Check user plan
    useEffect(() => {
        if (has) {
            const hasProPlan = has({ plan: 'pro' });
            const hasPremiumPlan = has({ plan: 'premium' });

            setPlanStatus(prevStatus => {
                if (prevStatus.hasProPlan !== hasProPlan || prevStatus.hasPremiumPlan !== hasPremiumPlan) {
                    return {
                        hasBasicPlan: true,
                        hasProPlan,
                        hasPremiumPlan
                    };
                }
                return prevStatus;
            });
        }
    }, [has]);

    // Load usage status
    useEffect(() => {
        const loadUsageStatus = async () => {
            try {
                await fetchUsageStatus();
            } catch (error) {
                console.error('Failed to load usage status:', error);
            }
        };
        loadUsageStatus();
    }, []);

    const fetchUsageStatus = async () => {
        try {
            const response = await fetch('/api/github-to-markdown');
            if (response.ok) {
                const data = await response.json();
                setUsageInfo(data);
            }
        } catch (err) {
            console.error('Failed to fetch usage status:', err);
        }
    };

    const handleGenerate = async () => {
        if (!githubUrl.trim()) {
            setError('Please enter a GitHub repository URL');
            return;
        }

        if (usageInfo.isLimitReached) {
            setError(`Generation limit reached. Only ${usageInfo.maxGenerations} README generations are allowed.`);
            return;
        }

        setLoading(true);
        setError('');
        setMarkdown('');

        try {
            const response = await fetch('/api/github-to-markdown', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({githubUrl}),
            });

            const data = await response.json();

            if (response.ok) {
                setMarkdown(data.markdown);
                setUsageInfo({
                    generationsUsed: data.generationsUsed,
                    maxGenerations: data.maxGenerations,
                    remaining: data.remaining,
                    isLimitReached: data.isLimitReached
                });
            } else {
                setError(data.error || 'Failed to generate README');
                if (data.generationsUsed !== undefined) {
                    setUsageInfo({
                        generationsUsed: data.generationsUsed,
                        maxGenerations: data.maxGenerations,
                        remaining: data.remaining,
                        isLimitReached: data.isLimitReached
                    });
                }
            }
        } catch (err) {
            setError('Network error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    const getUsageColor = () => {
        if (usageInfo.isLimitReached) return 'text-red-600';
        if (usageInfo.remaining === 1) return 'text-yellow-600';
        return 'text-green-600';
    };

    const getUsageIcon = () => {
        if (usageInfo.isLimitReached) return <AlertCircle className="w-4 h-4"/>;
        return <CheckCircle className="w-4 h-4"/>;
    };

    if (planStatus.hasBasicPlan) {
        return (
            <div className="min-h-screeN ">
                {/* Hero Banner Section */}
                {/*<Banner />*/}

                {/* Main Content Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        {/* Generator Section Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-bold text-gray-800 mb-2">You Code. We Document.</h2>
                            <p className="text-gray-600 text-lg">
                                Turn GitHub repos into production-grade documentation — in seconds, not hours.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Input Section */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Generate README</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            GitHub Repository URL
                                        </label>
                                        <input
                                            type="url"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                            placeholder="https://github.com/username/repository"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                                            disabled={loading || usageInfo.isLimitReached}
                                        />
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || usageInfo.isLimitReached}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin"/>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="w-4 h-4"/>
                                                Generate README
                                            </>
                                        )}
                                    </button>

                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                            <div className="flex items-center gap-2 text-red-700">
                                                <AlertCircle className="w-4 h-4"/>
                                                <span className="text-sm">{error}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Output Section */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Generated README</h3>
                                    {markdown && (
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors"
                                        >
                                            Copy to Clipboard
                                        </button>
                                    )}
                                </div>

                                <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
                                    {markdown ? (
                                        <textarea
                                            value={markdown}
                                            readOnly
                                            className="w-full h-full p-4 font-mono text-sm resize-none outline-none"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500">
                                            <div className="text-center">
                                                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50"/>
                                                <p>Generated README will appear here</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Usage Limit Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-10 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {getUsageIcon()}
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Usage Limit</h4>
                                        <p className="text-sm text-gray-600">Track your README generations</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-bold ${getUsageColor()}`}>
                                        {usageInfo.remaining}/{usageInfo.maxGenerations}
                                    </div>
                                    <div className="text-sm text-gray-500">Remaining</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Generations Used</span>
                                    <span>{usageInfo.generationsUsed} of {usageInfo.maxGenerations}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            usageInfo.isLimitReached ? 'bg-red-500' : 'bg-blue-500'
                                        }`}
                                        style={{
                                            width: `${(usageInfo.generationsUsed / usageInfo.maxGenerations) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>

                            {usageInfo.isLimitReached && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                                    <div className="flex items-center gap-2 text-red-700">
                                        <AlertCircle className="w-4 h-4"/>
                                        <span className="text-sm font-medium">
                                            Generation limit reached! You have used all {usageInfo.maxGenerations} available generations.
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (planStatus.hasProPlan) {
        return <ProFeature />;
    } else if (planStatus.hasPremiumPlan) {
        return <AdvancedFeature />;
    } else {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mt-10">Access Denied</h1>
                    <p className="text-gray-600 text-center mt-4">Please upgrade to a Pro or Premium plan to access this feature.</p>
                </div>
            </div>
        );
    }
}
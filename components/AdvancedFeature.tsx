'use client';

import React, { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Loader2, Download, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface UsageInfo {
    generationsUsed: number;
    maxGenerations: number;
    remaining: number;
    isLimitReached: boolean;
}

export default function ReadmeGeneratorPage() {
    const [githubUrl, setGithubUrl] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [usageInfo, setUsageInfo] = useState<UsageInfo>({
        generationsUsed: 0,
        maxGenerations: 100,
        remaining: 100,
        isLimitReached: false
    });

    const updateUsageInfo = (newUsageInfo: UsageInfo) => {
        setUsageInfo(newUsageInfo);
    };

    const handleGenerate = async () => {
        if (!githubUrl.trim()) {
            setError('Please enter a GitHub repository URL');
            return;
        }

        if (usageInfo.isLimitReached) {
            setError(`Generation limit reached. Only ${usageInfo.maxGenerations} README generations are allowed per session.`);
            return;
        }

        setLoading(true);
        setError('');
        setMarkdown('');

        try {
            // Simulate API call with demo content
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const demoMarkdown = `# ${githubUrl.split('/').pop() || 'Project'}

## 📋 Description
A modern web application built with cutting-edge technologies to provide an exceptional user experience.

## ✨ Features
- 🚀 Fast and responsive design
- 📱 Mobile-first approach
- 🎨 Beautiful UI components
- 🔒 Secure authentication
- 📊 Real-time analytics

## 🛠️ Installation

\`\`\`bash
# Clone the repository
git clone ${githubUrl}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 🚀 Usage
1. Open your browser and navigate to \`http://localhost:3000\`
2. Create an account or sign in
3. Start using the application

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

## 📄 License
This project is licensed under the MIT License.`;

            setMarkdown(demoMarkdown);

            // Update usage info
            const newUsageInfo = {
                generationsUsed: usageInfo.generationsUsed + 1,
                maxGenerations: 100,
                remaining: usageInfo.remaining - 1,
                isLimitReached: usageInfo.generationsUsed + 1 >= 100
            };
            updateUsageInfo(newUsageInfo);
        } catch (err) {
            setError('Network error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    const downloadReadme = () => {
        try {
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'README.md';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to download file:', err);
        }
    };

    const resetUsage = () => {
        const resetUsageInfo = {
            generationsUsed: 0,
            maxGenerations: 100,
            remaining: 100,
            isLimitReached: false
        };
        updateUsageInfo(resetUsageInfo);
        setError('');
        setMarkdown('');
    };

    const getUsageVariant = () => {
        if (usageInfo.isLimitReached) return 'destructive';
        if (usageInfo.remaining <= 20) return 'secondary';
        return 'default';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                        You Code. We Document.
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                        Turn GitHub repos into production-grade documentation — in seconds, not hours.
                    </p>
                </div>

                {/* Usage Limit Card */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {usageInfo.isLimitReached ? (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                ) : (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                                <div>
                                    <CardTitle className="text-lg">Session Usage Limit</CardTitle>
                                    <CardDescription>Track your README generations per session</CardDescription>
                                </div>
                            </div>
                            <div className="text-center sm:text-right">
                                <Badge variant={getUsageVariant()} className="text-lg px-3 py-1">
                                    {usageInfo.remaining}/{usageInfo.maxGenerations}
                                </Badge>
                                <p className="text-xs text-slate-500 mt-1">Remaining</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Generations Used</span>
                            <span>{usageInfo.generationsUsed} of {usageInfo.maxGenerations}</span>
                        </div>
                        <Progress 
                            value={(usageInfo.generationsUsed / usageInfo.maxGenerations) * 100}
                            className="h-2"
                        />

                        {usageInfo.isLimitReached && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <span className="text-sm">
                                        Session limit reached! You have used all {usageInfo.maxGenerations} available generations.
                                    </span>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={resetUsage}
                                        className="w-full sm:w-auto"
                                    >
                                        <RotateCcw className="w-3 h-3 mr-1" />
                                        Reset Session
                                    </Button>
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Generate README
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="github-url">GitHub Repository URL</Label>
                                <Input
                                    id="github-url"
                                    type="url"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/username/repository"
                                    disabled={loading || usageInfo.isLimitReached}
                                    className="text-sm"
                                />
                            </div>

                            <Button
                                onClick={handleGenerate}
                                disabled={loading || usageInfo.isLimitReached}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Generate README
                                    </>
                                )}
                            </Button>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="text-sm">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Output Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <CardTitle>Generated README</CardTitle>
                                {markdown && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={copyToClipboard}
                                            className="flex-1 sm:flex-none"
                                        >
                                            <Copy className="w-3 h-3 mr-1" />
                                            {copySuccess ? 'Copied!' : 'Copy'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={downloadReadme}
                                            className="flex-1 sm:flex-none"
                                        >
                                            <Download className="w-3 h-3 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-md overflow-hidden">
                                {markdown ? (
                                    <Textarea
                                        value={markdown}
                                        readOnly
                                        className="min-h-96 font-mono text-xs sm:text-sm resize-none border-0 focus-visible:ring-0"
                                        style={{ height: '24rem' }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-96 text-slate-500">
                                        <div className="text-center space-y-2">
                                            <FileText className="w-12 h-12 mx-auto opacity-50" />
                                            <p className="text-sm">Generated README will appear here</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="text-center text-slate-500 text-xs sm:text-sm space-y-1">
                    <p>This service is limited to {usageInfo.maxGenerations} README generations per page load to ensure fair usage.</p>
                    <p>Refresh the page to reset your generation limit.</p>
                </div>
            </div>
        </div>
    );
}
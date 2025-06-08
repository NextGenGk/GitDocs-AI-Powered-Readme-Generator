'use client';

import React, { useState } from 'react';
import { Github, FileText, AlertCircle, CheckCircle, Loader2, Download, Copy, RotateCcw } from 'lucide-react';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
        maxGenerations: 50,
        remaining: 50,
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
            const response = await fetch('/api/github-to-markdown', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ githubUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                setMarkdown(data.markdown);

                // Update usage info locally
                const newUsageInfo = {
                    generationsUsed: usageInfo.generationsUsed + 1,
                    maxGenerations: 50,
                    remaining: usageInfo.remaining - 1,
                    isLimitReached: usageInfo.generationsUsed + 1 >= 50
                };
                updateUsageInfo(newUsageInfo);
            } else {
                setError(data.error || 'Failed to generate README');
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
            maxGenerations: 50,
            remaining: 50,
            isLimitReached: false
        };
        updateUsageInfo(resetUsageInfo);
        setError('');
        setMarkdown('');
    };

    const getUsageVariant = () => {
        if (usageInfo.isLimitReached) return 'destructive';
        if (usageInfo.remaining <= 10) return 'secondary';
        return 'default';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-12 space-y-4">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        You Code. We Document.
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Turn GitHub repos into production-grade documentation — in seconds, not hours.
                    </p>
                </div>

                {/* Usage Tracking Card */}
                <Card className="mb-6 md:mb-8">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {usageInfo.isLimitReached ? (
                                    <AlertCircle className="h-5 w-5 text-destructive" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                )}
                                <div>
                                    <CardTitle className="text-lg">Session Usage Limit</CardTitle>
                                    <CardDescription>Track your README generations per session</CardDescription>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant={getUsageVariant()} className="text-lg px-3 py-1">
                                    {usageInfo.remaining}/{usageInfo.maxGenerations}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">Remaining</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Generations Used</span>
                            <span>{usageInfo.generationsUsed} of {usageInfo.maxGenerations}</span>
                        </div>
                        
                        <Progress 
                            value={(usageInfo.generationsUsed / usageInfo.maxGenerations) * 100} 
                            className="w-full"
                        />

                        {usageInfo.isLimitReached && (
                            <>
                                <Separator />
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Session Limit Reached!</AlertTitle>
                                    <AlertDescription className="flex items-center justify-between mt-2">
                                        <span>You have used all {usageInfo.maxGenerations} available generations.</span>
                                        <Button
                                            onClick={resetUsage}
                                            variant="outline"
                                            size="sm"
                                            className="ml-4"
                                        >
                                            <RotateCcw className="mr-2 h-3 w-3" />
                                            Reset Session
                                        </Button>
                                    </AlertDescription>
                                </Alert>
                            </>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Input Section */}
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Github className="h-5 w-5" />
                                Generate README
                            </CardTitle>
                            <CardDescription>
                                Enter your GitHub repository URL to generate comprehensive documentation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="github-url">GitHub Repository URL</Label>
                                <Input
                                    id="github-url"
                                    type="url"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/username/repository"
                                    disabled={loading || usageInfo.isLimitReached}
                                    className="w-full"
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
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Generate README
                                    </>
                                )}
                            </Button>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Output Section */}
                    <Card className="w-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated README</CardTitle>
                                    <CardDescription>
                                        Your generated README markdown content
                                    </CardDescription>
                                </div>
                                {markdown && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={copyToClipboard}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Copy className="mr-2 h-3 w-3" />
                                            {copySuccess ? 'Copied!' : 'Copy'}
                                        </Button>
                                        <Button
                                            onClick={downloadReadme}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Download className="mr-2 h-3 w-3" />
                                            Download
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 md:h-80 lg:h-96 border rounded-md overflow-hidden">
                                {markdown ? (
                                    <Textarea
                                        value={markdown}
                                        readOnly
                                        className="w-full h-full font-mono text-sm resize-none border-0 focus-visible:ring-0"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        <div className="text-center space-y-3">
                                            <FileText className="h-12 w-12 mx-auto opacity-50" />
                                            <p>Generated README will appear here</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Info */}
                <Card className="mt-6 md:mt-8">
                    <CardContent className="pt-6">
                        <div className="text-center text-muted-foreground text-sm space-y-2">
                            <p>This service is limited to {usageInfo.maxGenerations} README generations per session to ensure fair usage.</p>
                            <p>Refresh the page or use the reset button to start a new session.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
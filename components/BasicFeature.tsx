'use client'

import React, { useState } from 'react';
import { Github, FileText, AlertCircle, CheckCircle, Loader2, Download, Copy, RotateCcw, Star } from 'lucide-react';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
        maxGenerations: 3,
        remaining: 3,
        isLimitReached: false
    });

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
                setUsageInfo(newUsageInfo);
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
        setUsageInfo({
            generationsUsed: 0,
            maxGenerations: 3,
            remaining: 3,
            isLimitReached: false
        });
        setError('');
        setMarkdown('');
    };

    const getUsageVariant = () => {
        if (usageInfo.isLimitReached) return 'destructive';
        if (usageInfo.remaining <= 10) return 'secondary';
        return 'default';
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-12 space-y-4">
                    <Badge variant="outline" className="text-sm px-4 py-1 border-primary/30 bg-primary/5 text-primary mb-4">
                    BEST README GENERATOR
                    </Badge>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        Readme Documentation Generator
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Unlimited documentation generation with advanced features.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Input Section */}
                    <Card className="w-full shadow-lg border-primary/20 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-xl z-0"></div>
                        <CardHeader className="relative z-10 bg-muted/30 border-b border-primary/10">
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Github className="h-5 w-5" />
                                Generate Pro Documentation
                            </CardTitle>
                            <CardDescription>
                                Enter your GitHub repository URL to generate comprehensive documentation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6 relative z-10">
                            <div className="space-y-2">
                                <Label htmlFor="github-url" className="text-primary/90">GitHub Repository URL</Label>
                                <Input
                                    id="github-url"
                                    type="url"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/username/repository"
                                    disabled={loading || usageInfo.isLimitReached}
                                    className="w-full focus:ring-primary focus:border-primary/30 bg-muted/10"
                                />
                            </div>

                            <Button
                                onClick={handleGenerate}
                                disabled={loading || usageInfo.isLimitReached}
                                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 transition-all duration-300"
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
                                <Alert variant="destructive" className="border-destructive/30 bg-destructive/5">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Output Section */}
                    <Card className="w-full shadow-lg border-primary/20 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 blur-xl z-0"></div>
                        <CardHeader className="relative z-10 bg-muted/30 border-b border-primary/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-primary">Generated README</CardTitle>
                                    <CardDescription>
                                        Your pro-quality README markdown content
                                    </CardDescription>
                                </div>
                                {markdown && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={copyToClipboard}
                                            variant="outline"
                                            size="sm"
                                            className="border-primary/30 hover:bg-primary/10"
                                        >
                                            <Copy className="mr-2 h-3 w-3" />
                                            {copySuccess ? 'Copied!' : 'Copy'}
                                        </Button>
                                        <Button
                                            onClick={downloadReadme}
                                            variant="outline"
                                            size="sm"
                                            className="border-primary/30 hover:bg-primary/10"
                                        >
                                            <Download className="mr-2 h-3 w-3" />
                                            Download
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="h-64 md:h-80 lg:h-96 border rounded-md overflow-hidden bg-muted/10 shadow-inner">
                                {markdown ? (
                                    <Textarea
                                        value={markdown}
                                        readOnly
                                        className="w-full h-full font-mono text-sm resize-none border-0 focus-visible:ring-0 bg-transparent"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        <div className="text-center space-y-3">
                                            <FileText className="h-12 w-12 mx-auto opacity-50" />
                                            <p>Generated README will appear here</p>
                                            <Badge variant="outline" className="mx-auto mt-2 bg-primary/5 text-primary border-primary/20">
                                                Pro Feature
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Usage Tracking Card */}
                <Card className="mb-6 md:mb-8 shadow-lg border-primary/20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl z-0"></div>
                    <CardHeader className="relative z-10 bg-muted/30 border-b border-primary/10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {usageInfo.isLimitReached ? (
                                    <AlertCircle className="h-5 w-5 text-destructive" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                )}
                                <div>
                                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        Pro Session Usage
                                    </CardTitle>
                                    <CardDescription>
                                        Enjoy expanded generation limits with your Pro plan
                                    </CardDescription>
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
                    <CardContent className="space-y-4 pt-6 relative z-10">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Generations Used</span>
                            <span>{usageInfo.generationsUsed} of {usageInfo.maxGenerations}</span>
                        </div>

                        <Progress
                            value={(usageInfo.generationsUsed / usageInfo.maxGenerations) * 100}
                            className="w-full h-2 bg-muted/50"
                        />

                        {usageInfo.isLimitReached && (
                            <>
                                <Separator className="bg-primary/10" />
                                <Alert variant="destructive" className="border-destructive/30 bg-destructive/5">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Session Limit Reached!</AlertTitle>
                                    <AlertDescription className="flex items-center justify-between mt-2">
                                        <span>You have used all {usageInfo.maxGenerations} available generations.</span>
                                        <Button
                                            onClick={resetUsage}
                                            variant="outline"
                                            size="sm"
                                            className="ml-4 border-destructive/30 hover:bg-destructive/10"
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
            </div>
        </div>
    );
}
'use client';

import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, CheckCircle, Loader2, Copy, Github } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import ProFeature from "@/components/ProFeature";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    const { has } = useAuth();
    const [planStatus, setPlanStatus] = useState({
        hasBasicPlan: true,
        hasProPlan: false
    });

    const [githubUrl, setGithubUrl] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [usageInfo, setUsageInfo] = useState<UsageInfo>({
        generationsUsed: 0,
        maxGenerations: 3, // Increased limit to 3
        remaining: 3,
        isLimitReached: false
    });

    // Check user plan
    useEffect(() => {
        if (has) {
            const hasProPlan = has({ plan: 'pro' });

            setPlanStatus(prevStatus => {
                if (prevStatus.hasProPlan !== hasProPlan) {
                    return {
                        hasBasicPlan: true,
                        hasProPlan
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
                    maxGenerations: data.maxGenerations || 3, // Fallback to 3
                    remaining: data.remaining,
                    isLimitReached: data.isLimitReached
                });
            } else {
                setError(data.error || 'Failed to generate README');
                if (data.generationsUsed !== undefined) {
                    setUsageInfo({
                        generationsUsed: data.generationsUsed,
                        maxGenerations: data.maxGenerations || 3, // Fallback to 3
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
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    const getUsageVariant = () => {
        if (usageInfo.isLimitReached) return 'destructive';
        if (usageInfo.remaining === 1) return 'secondary';
        return 'default';
    };

    const getProgressColor = () => {
        const percentage = (usageInfo.generationsUsed / usageInfo.maxGenerations) * 100;
        if (percentage >= 100) return 'bg-destructive';
        if (percentage >= 75) return 'bg-yellow-500';
        return 'bg-primary';
    };

    if (planStatus.hasProPlan) {
        return <ProFeature />;
    } else if (planStatus.hasBasicPlan) {
        return (
            <div className="min-h-screen py-12">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-8 md:py-16">
                    <div className="text-center mb-8 md:mb-12 space-y-4">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
                            Basic Plan Features
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                            Get started with GitHub documentation generation. Upgrade to Pro for unlimited access.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                        {/* Input Section */}
                        <Card className="w-full shadow-lg border-primary/20 hover:border-primary/30 transition-all duration-300">
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Github className="h-5 w-5" />
                                    Generate README
                                </CardTitle>
                                <CardDescription>
                                    Enter your GitHub repository URL to generate a comprehensive README
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="github-url">GitHub Repository URL</Label>
                                    <Input
                                        id="github-url"
                                        type="url"
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                        placeholder="https://github.com/username/repository"
                                        disabled={loading || usageInfo.isLimitReached}
                                        className="w-full focus:ring-primary"
                                    />
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={loading || usageInfo.isLimitReached}
                                    className="w-full bg-primary hover:bg-primary/90"
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
                        <Card className="w-full shadow-lg border-primary/20 hover:border-primary/30 transition-all duration-300">
                            <CardHeader className="bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-primary">Generated README</CardTitle>
                                        <CardDescription>
                                            Your generated README markdown content
                                        </CardDescription>
                                    </div>
                                    {markdown && (
                                        <Button
                                            onClick={copyToClipboard}
                                            variant="outline"
                                            size="sm"
                                            className="border-primary/30 hover:bg-primary/10"
                                        >
                                            <Copy className="mr-2 h-4 w-4" />
                                            {copySuccess ? 'Copied!' : 'Copy'}
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
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
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Usage Tracking Card */}
                    <Card className="mt-6 md:mt-8 max-w-7xl mx-auto shadow-lg border-primary/20">
                        <CardHeader className="bg-muted/30">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    {usageInfo.isLimitReached ? (
                                        <AlertCircle className="h-5 w-5 text-destructive" />
                                    ) : (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    )}
                                    <div>
                                        <CardTitle className="text-lg text-primary">Usage Tracking</CardTitle>
                                        <CardDescription>Monitor your README generations</CardDescription>
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
                        <CardContent className="space-y-4 pt-6">
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
                                        <AlertDescription className="flex items-center justify-between">
                                            <span>Generation limit reached! You have used all {usageInfo.maxGenerations} available generations.</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="ml-4 border-destructive/30 hover:bg-destructive/10"
                                                onClick={() => window.location.href = '/pricing'}
                                            >
                                                Upgrade to Pro
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
    } else {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-lg border-destructive/20">
                    <CardHeader className="text-center bg-muted/30">
                        <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
                        <CardDescription>
                            Please upgrade to a Pro plan to access this feature.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 flex justify-center">
                        <Button
                            onClick={() => window.location.href = '/pricing'}
                            className="bg-primary hover:bg-primary/90"
                        >
                            View Pricing Plans
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}


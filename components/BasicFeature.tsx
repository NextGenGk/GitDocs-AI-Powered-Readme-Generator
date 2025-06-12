import React from 'react';
import {FileText, AlertCircle, CheckCircle, Github, Download, Copy, HelpCircle} from 'lucide-react';
// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Book } from 'lucide-react';

interface UsageInfo {
    generationsUsed: number;
    maxGenerations: number;
    remaining: number;
    isLimitReached: boolean;
}

async function fetchUsageStatusServer(): Promise<UsageInfo> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/github-to-markdown`, { cache: 'no-store' });
        if (res.ok) {
            return await res.json();
        }
    } catch (err) {
        // fallback default
    }
    return {
        generationsUsed: 0,
        maxGenerations: 3,
        remaining: 3,
        isLimitReached: false
    };
}

export default async function BasicFeature() {
    const usageInfo = await fetchUsageStatusServer();

    return (
        <div className="min-h-screen py-22 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-40 left-10 w-72 h-72 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <Book className="w-4 h-4 " />
                        You Code We Document!!
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        Documentation Generator
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Transform your GitHub repositories into beautiful, comprehensive documentation in seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {/* Input Section */}
                    <Card className="w-full shadow-lg border-primary/20 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-xl z-0"></div>
                        <CardHeader className="relative z-10 bg-muted/30 border-b border-primary/10">
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Github className="h-5 w-5" />
                                Generate Documentation
                            </CardTitle>
                            <CardDescription>
                                Enter your GitHub repository URL to generate a comprehensive README
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6 relative z-10">
                            <form action="/api/github-to-markdown" method="POST" className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="github-url" className="text-primary/90">GitHub Repository URL</Label>
                                    <Input
                                        id="github-url"
                                        name="githubUrl"
                                        type="url"
                                        placeholder="https://github.com/username/repository"
                                        className="w-full focus:ring-primary focus:border-primary/30 bg-muted/10"
                                        required
                                        disabled={usageInfo.isLimitReached}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={usageInfo.isLimitReached}
                                    className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 transition-all duration-300"
                                    size="lg"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate README
                                </Button>
                            </form>
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
                                        Your generated README markdown content
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-primary/30 hover:bg-primary/10"
                                    >
                                        <Copy className="mr-2 h-3 w-3" />
                                        Copy
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-primary/30 hover:bg-primary/10"
                                    >
                                        <Download className="mr-2 h-3 w-3" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="h-64 md:h-80 lg:h-96 border rounded-md overflow-hidden bg-muted/10 shadow-inner">
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <div className="text-center space-y-3">
                                        <FileText className="h-12 w-12 mx-auto opacity-50" />
                                        <p>Generated README will appear here after submission</p>
                                        <Badge variant="outline" className="mx-auto mt-2 bg-primary/5 text-primary border-primary/20">
                                            Markdown Preview
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Usage Tracking Card */}
                <Card className="mt-8 mb-6 md:mt-12 md:mb-8 max-w-7xl mx-auto shadow-lg border-primary/20 overflow-hidden">
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
                                    <CardTitle className="text-lg text-primary">Usage Tracking</CardTitle>
                                    <CardDescription>
                                        Monitor your README generations
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant={usageInfo.isLimitReached ? 'destructive' : usageInfo.remaining === 1 ? 'secondary' : 'default'} className="text-lg px-3 py-1">
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
}


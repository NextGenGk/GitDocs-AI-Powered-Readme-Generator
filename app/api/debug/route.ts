import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET() {
  try {
    // Get environment information
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      nextPublicUrl: process.env.NEXT_PUBLIC_URL,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      hasGithubToken: !!process.env.GITHUB_TOKEN,
      hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      internalApiKey: process.env.INTERNAL_API_KEY ? '***SET***' : 'Not set'
    };

    // Test Supabase connection
    let supabaseStatus = 'Not connected';
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true });
      
      supabaseStatus = error ? `Error: ${error.message}` : 'Connected successfully';
    } catch (error) {
      supabaseStatus = `Connection failed: ${error instanceof Error ? error.message : String(error)}`;
    }

    // Test GitHub API access
    let githubStatus = 'Not tested';
    try {
      const response = await fetch('https://api.github.com/rate_limit', {
        headers: process.env.GITHUB_TOKEN 
          ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } 
          : {}
      });
      githubStatus = `GitHub API ${response.status === 200 ? 'accessible' : `error: ${response.status} ${response.statusText}`}`;
    } catch (error) {
      githubStatus = `GitHub API error: ${error instanceof Error ? error.message : String(error)}`;
    }

    // Test Gemini API access (without making a real request)
    const geminiStatus = process.env.GEMINI_API_KEY 
      ? 'API key is set' 
      : 'API key is missing';

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memoryUsage: process.memoryUsage()
      },
      environmentVariables: envInfo,
      services: {
        supabase: supabaseStatus,
        github: githubStatus,
        gemini: geminiStatus
      },
      routes: {
        githubToMarkdown: '/api/github-to-markdown',
        feedback: '/api/feedback',
        debug: '/api/debug'
      }
    });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: 'Failed to gather debug information',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

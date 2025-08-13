import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with better error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);



const README_GENERATOR_PROMPT = `You are an expert technical writer and open-source maintainer. Generate a complete, professional README.md file for the given GitHub repository.

ANALYSIS REQUIREMENTS:
1. Examine the repository structure, files, and code
2. Identify the programming language, framework, and dependencies
3. Understand the project's purpose and functionality
4. Determine the target audience and use cases
5. Extract key features and capabilities

MARKDOWN FORMATTING RULES:
- Use proper markdown syntax with correct spacing
- Add blank lines before/after headers, code blocks, and lists
- Use backticks for inline code, triple backticks for code blocks
- Include language specifiers for syntax highlighting
- Ensure all links follow [text](url) format
- Use consistent heading hierarchy (# ## ### ####)
- Add line breaks between sections for readability

Generate a complete, production-ready README.md that follows GitHub markdown best practices and serves as excellent documentation for the project.`;

// Default generation limit (you can adjust this value)
const DEFAULT_GENERATION_LIMIT = 3;

// Helper function to parse request body (handles both JSON and form data)
async function parseRequestBody(request: NextRequest): Promise<{ githubUrl: string }> {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    // Handle JSON data
    const body = await request.json();
    return { githubUrl: body.githubUrl };
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    // Handle form data
    const formData = await request.formData();
    const githubUrl = formData.get('githubUrl') as string;
    return { githubUrl };
  } else {
    // Try to parse as text and handle URL-encoded data
    const text = await request.text();

    // Check if it's URL-encoded format like "githubUrl=..."
    if (text.startsWith('githubUrl=')) {
      const githubUrl = decodeURIComponent(text.split('=')[1]);
      return { githubUrl };
    }

    // Try parsing as JSON as fallback
    try {
      const body = JSON.parse(text);
      return { githubUrl: body.githubUrl };
    } catch {
      throw new Error('Invalid request format. Expected JSON or form data.');
    }
  }
}

function isValidGithubUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
        parsedUrl.hostname === 'github.com' &&
        parsedUrl.pathname.split('/').filter(Boolean).length >= 2
    );
  } catch (error) {
    return false;
  }
}

async function generateReadmeWithGemini(githubUrl: string, apiKey: string): Promise<string> {
  try {
    // Extract repository information from the GitHub URL
    const url = new URL(githubUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) {
      throw new Error(`Invalid GitHub URL format. Expected: https://github.com/owner/repo, got: ${githubUrl}`);
    }
    
    const [owner, repo] = pathParts;
    
    // Fetch repository details from GitHub API
    const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    
    const repoResponse = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitDocs/1.0' // GitHub requires a user agent
      }
    });

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status} ${repoResponse.statusText}`);
    }

    const repoData = await repoResponse.json();

    // Prepare the context for the Gemini API
    const context = `
# GitHub Repository Information
- Repository: ${repoData.full_name}
- Description: ${repoData.description || 'No description available'}
- Language: ${repoData.language || 'Not specified'}
- Stars: ${repoData.stargazers_count || 0}
- Forks: ${repoData.forks_count || 0}
- Open Issues: ${repoData.open_issues_count || 0}
- Last Updated: ${repoData.updated_at || 'N/A'}
- URL: ${githubUrl}
`;

    // Call Gemini API with proper formatting
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: README_GENERATOR_PROMPT },
                { text: context }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
            topP: 0.8,
            topK: 40
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const generatedText = data.candidates[0].content.parts[0].text;
      return generatedText;
    } else {
      throw new Error('Unexpected response format from Gemini API: Missing expected content in response');
    }
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user data from database
    const { data, error } = await supabase
        .from('users')
        .select('readme_count')
        .eq('id', userId)
        .single();

    let currentCount = 0;

    if (error) {
      if (error.code === 'PGRST116') {
        // User not found, try to create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .upsert({ 
            id: userId, 
            readme_count: 0,
            email: null,
            name: null,
            avatar: null
          }, {
            onConflict: 'id',
            ignoreDuplicates: false
          })
          .select('readme_count')
          .single();
          
        if (createError) {
          currentCount = 0;
        } else {
          currentCount = newUser?.readme_count || 0;
        }
      } else {
        currentCount = 0;
      }
    } else {
      currentCount = data?.readme_count || 0;
    }

    return NextResponse.json({
      generationsUsed: currentCount,
      maxGenerations: DEFAULT_GENERATION_LIMIT,
      remaining: DEFAULT_GENERATION_LIMIT - currentCount,
      isLimitReached: currentCount >= DEFAULT_GENERATION_LIMIT
    });
  } catch (error) {
    return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {

    // Get authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('readme_count')
      .eq('id', userId)
      .single();

    let currentCount = 0;

    if (userError) {
      if (userError.code === 'PGRST116') {
        // User not found, try to create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .upsert({ 
            id: userId, 
            readme_count: 0,
            email: null,
            name: null,
            avatar: null
          }, {
            onConflict: 'id',
            ignoreDuplicates: false
          })
          .select('readme_count')
          .single();
          
        if (createError) {
          currentCount = 0;
        } else {
          currentCount = newUser?.readme_count || 0;
        }
      } else {
        currentCount = 0;
      }
    } else {
      currentCount = userData?.readme_count || 0;
    }

    // Check if limit is reached
    if (currentCount >= DEFAULT_GENERATION_LIMIT) {
      return NextResponse.json(
        {
          error: `Generation limit reached. Only ${DEFAULT_GENERATION_LIMIT} README generations are allowed.`,
          code: 'GENERATION_LIMIT_REACHED',
          generationsUsed: currentCount,
          maxGenerations: DEFAULT_GENERATION_LIMIT,
          remaining: 0,
          isLimitReached: true
        },
        { status: 429 }
      );
    }

    // Parse request body
    let githubUrl: string;
    try {
      const parsedBody = await parseRequestBody(request);
      githubUrl = parsedBody.githubUrl;
      
      if (!githubUrl) {
        throw new Error('Missing githubUrl in request body');
      }
    } catch (parseError) {
      const errorMsg = parseError instanceof Error 
        ? parseError.message 
        : 'Unknown error parsing request body';
      
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: errorMsg,
          code: 'INVALID_REQUEST_FORMAT'
        },
        { status: 400 }
      );
    }

    if (!isValidGithubUrl(githubUrl)) {
      return NextResponse.json(
        { 
          error: 'Invalid GitHub repository URL. Expected format: https://github.com/username/repository',
          receivedUrl: githubUrl,
          code: 'INVALID_GITHUB_URL'
        },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable',
          code: 'SERVICE_UNAVAILABLE'
        },
        { status: 503 }
      );
    }

    try {
      const markdownContent = await generateReadmeWithGemini(githubUrl, geminiApiKey);
      
      // Update user count in database
      const newCount = currentCount + 1;
      
      // Try direct update first
      const { error: updateError } = await supabase
        .from('users')
        .update({ readme_count: newCount })
        .eq('id', userId);

      // If direct update fails, try upsert
      if (updateError) {
        await supabase
          .from('users')
          .upsert({ 
            id: userId, 
            readme_count: newCount,
            email: null,
            name: null,
            avatar: null
          }, {
            onConflict: 'id',
            ignoreDuplicates: false
          });
      }

      const remaining = Math.max(0, DEFAULT_GENERATION_LIMIT - newCount);
      const isLimitReached = newCount >= DEFAULT_GENERATION_LIMIT;
      
      return NextResponse.json({
        success: true,
        markdown: markdownContent,
        generationsUsed: newCount,
        maxGenerations: DEFAULT_GENERATION_LIMIT,
        remaining,
        isLimitReached,
        timestamp: new Date().toISOString()
      });
    } catch (geminiError) {
      const errorMsg = geminiError instanceof Error ? geminiError.message : 'Unknown error';
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate README',
          details: errorMsg,
          code: 'GENERATION_FAILED',
          generationsUsed: currentCount,
          maxGenerations: DEFAULT_GENERATION_LIMIT,
          remaining: Math.max(0, DEFAULT_GENERATION_LIMIT - currentCount),
          isLimitReached: currentCount >= DEFAULT_GENERATION_LIMIT,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: errorMsg,
        code: 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
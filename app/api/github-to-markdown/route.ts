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

// Enable debug logging in development
const debug = process.env.NODE_ENV !== 'production';

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
  console.log('🚀 Starting README generation for:', githubUrl);
  
  try {
    // Extract repository information from the GitHub URL
    console.log('🔗 Parsing GitHub URL...');
    const url = new URL(githubUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) {
      throw new Error(`Invalid GitHub URL format. Expected: https://github.com/owner/repo, got: ${githubUrl}`);
    }
    
    const [owner, repo] = pathParts;
    console.log(`📂 Repository: ${owner}/${repo}`);
    
    // Fetch repository details from GitHub API
    console.log('🌐 Fetching repository details from GitHub...');
    const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    console.log('GitHub API URL:', repoUrl);
    
    const repoResponse = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitDocs/1.0' // GitHub requires a user agent
      }
    });

    if (!repoResponse.ok) {
      const errorText = await repoResponse.text();
      console.error('❌ GitHub API error:', {
        status: repoResponse.status,
        statusText: repoResponse.statusText,
        url: repoUrl,
        response: errorText
      });
      throw new Error(`GitHub API error: ${repoResponse.status} ${repoResponse.statusText}`);
    }

    const repoData = await repoResponse.json();

    console.log('✅ Successfully fetched repository details');
    
    // Log basic repo info
    console.log('📊 Repository Info:', {
      name: repoData.full_name,
      description: repoData.description,
      language: repoData.language,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
      lastUpdated: repoData.updated_at
    });

    // Prepare the context for the Gemini API
    console.log('📝 Preparing context for Gemini API...');
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
    console.log('🤖 Sending request to Gemini API...');
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

    console.log('📥 Received response from Gemini API');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('🔍 Gemini API Response:', {
      hasCandidates: !!data.candidates,
      candidateCount: data.candidates?.length || 0,
      firstCandidate: data.candidates?.[0] ? '***PRESENT***' : 'MISSING',
      contentParts: data.candidates?.[0]?.content?.parts?.length || 0
    });
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const generatedText = data.candidates[0].content.parts[0].text;
      console.log('✅ Successfully generated README');
      console.log('📄 Generated content preview:', generatedText.substring(0, 200) + '...');
      return generatedText;
    } else {
      console.error('❌ Unexpected response format from Gemini:', JSON.stringify(data, null, 2));
      throw new Error('Unexpected response format from Gemini API: Missing expected content in response');
    }
  } catch (error) {
    console.error('Error in generateReadmeWithGemini:', error);
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
        // User not found, create new user with count 0
        console.log('User not found, creating new user...');
        const { error: createError } = await supabase
          .from('users')
          .insert({ id: userId, readme_count: 0 });
          
        if (createError) {
          console.error('Error creating user:', createError);
        }
        currentCount = 0;
      } else {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
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
    console.error('Error fetching user data:', error);
    return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('🔍 POST /api/github-to-markdown - Request received');
  
  try {
    // Debug: Log environment variables (mask sensitive data)
    console.log('🔧 Environment Variables:', {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      hasGithubToken: !!process.env.GITHUB_TOKEN,
      nodeEnv: process.env.NODE_ENV
    });

    // Get authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    console.log('📊 Fetching user data from Supabase...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('readme_count')
      .eq('id', userId)
      .single();

    let currentCount = 0;

    if (userError) {
      if (userError.code === 'PGRST116') {
        // User not found, create new user
        console.log('Creating new user...');
        const { error: createError } = await supabase
          .from('users')
          .insert({ id: userId, readme_count: 0 });
          
        if (createError) {
          console.error('Error creating user:', createError);
          return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
        }
        currentCount = 0;
      } else {
        console.error('❌ Supabase user error:', userError);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    } else {
      currentCount = userData?.readme_count || 0;
    }

    console.log(`📊 User has used ${currentCount} of ${DEFAULT_GENERATION_LIMIT} generations`);

    // Check if limit is reached
    if (currentCount >= DEFAULT_GENERATION_LIMIT) {
      const errorMsg = `Generation limit reached. Only ${DEFAULT_GENERATION_LIMIT} README generations are allowed.`;
      console.error(`❌ ${errorMsg}`);
      
      return NextResponse.json(
        {
          error: errorMsg,
          code: 'GENERATION_LIMIT_REACHED',
          generationsUsed: currentCount,
          maxGenerations: DEFAULT_GENERATION_LIMIT,
          remaining: 0,
          isLimitReached: true
        },
        { status: 429 }
      );
    }

    // Parse request body with improved error handling
    console.log('📦 Parsing request body...');
    let githubUrl: string;
    try {
      const parsedBody = await parseRequestBody(request);
      githubUrl = parsedBody.githubUrl;
      
      if (!githubUrl) {
        throw new Error('Missing githubUrl in request body');
      }
      
      console.log('✅ Parsed GitHub URL:', githubUrl);
    } catch (parseError) {
      const errorMsg = parseError instanceof Error 
        ? parseError.message 
        : 'Unknown error parsing request body';
      
      console.error('❌ Error parsing request body:', parseError);
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: errorMsg,
          code: 'INVALID_REQUEST_FORMAT'
        },
        { status: 400 }
      );
    }

    console.log('🔗 Validating GitHub URL...');
    if (!isValidGithubUrl(githubUrl)) {
      const errorMsg = 'Invalid GitHub repository URL. Expected format: https://github.com/username/repository';
      console.error(`❌ ${errorMsg}: ${githubUrl}`);
      
      return NextResponse.json(
        { 
          error: errorMsg,
          receivedUrl: githubUrl,
          code: 'INVALID_GITHUB_URL'
        },
        { status: 400 }
      );
    }

    console.log('🔑 Checking for Gemini API key...');
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      const errorMsg = 'Gemini API key is not configured';
      console.error(`❌ ${errorMsg}`);
      
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable',
          code: 'SERVICE_UNAVAILABLE',
          details: errorMsg
        },
        { status: 503 }
      );
    }

    try {
      console.log('🚀 Starting README generation...');
      const markdownContent = await generateReadmeWithGemini(githubUrl, geminiApiKey);
      
      // Update user count in database - increment by 1
      console.log('🔄 Updating user generation count...');
      const newCount = currentCount + 1;
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ readme_count: newCount })
        .eq('id', userId);

      if (updateError) {
        console.error('⚠️ Failed to update user count:', updateError);
        // Continue anyway - don't fail the request
      } else {
        console.log('✅ Updated user generation count in database');
      }

      const remaining = Math.max(0, DEFAULT_GENERATION_LIMIT - newCount);
      const isLimitReached = newCount >= DEFAULT_GENERATION_LIMIT;
      
      console.log(`✅ README generation successful! Remaining generations: ${remaining}`);
      
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
      console.error('❌ Gemini API error:', geminiError);
      
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
    console.error('❌ Unhandled error in API route:', error);
    
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
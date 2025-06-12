import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const PROMPT = `You are a professional technical writer and open-source maintainer. Given a GitHub repository link, generate a complete and polished \`README.md\` file in Markdown format.

Use the repository content to understand its purpose, tech stack, structure, and usage.

The \`README.md\` should include the following sections (even if the original repo lacks them — infer wherever necessary):

1. **Project Title** with matching emoji
2. **Badges**: license, stars, forks, issues (use \`shields.io\`)
3. **About**: a short paragraph summarizing the project, its purpose, and target users
4. **Features**: list key features using bullet points
5. **Demo**: link to live app or deployment (if any) + screenshots or GIFs if possible
6. **Installation Instructions**: commands to clone, install, and run the project
7. **Usage**: explain how to use the project (CLI, GUI, or API)
8. **Configuration**: list required environment variables or config setup
9. **Project Structure**: show a basic file/folder layout (optional)
10. **Contribution Guide**: clear steps for contributing
11. **License**: name and link to license file
12. **Contact Info**: GitHub, email, or social media for reaching the author
13. **Acknowledgements**: libraries, tools, or people credited (optional)

For markdown badges use this repo: https://github.com/Ileriayo/markdown-badges

Output should be in valid Markdown and follow good formatting practices with proper headers, code blocks, and links.`;

// Store sessions with their generation counts
const sessionCounts = new Map<string, number>();

// Generation limits for different plans
const BASIC_PLAN_LIMIT = 2;
const PRO_PLAN_LIMIT = 50;
const PREMIUM_PLAN_LIMIT = 100;

// Function to get the generation limit based on user's plan
async function getGenerationLimit(request: NextRequest): Promise<number> {
  try {
    const { has } = await auth();

    if (has({ plan: 'premium' })) {
      return PREMIUM_PLAN_LIMIT;
    } else if (has({ plan: 'pro' })) {
      return PRO_PLAN_LIMIT;
    } else {
      // Default to basic plan
      return BASIC_PLAN_LIMIT;
    }
  } catch (error) {
    // If auth fails or user is not authenticated, return basic plan limit
    return BASIC_PLAN_LIMIT;
  }
}

// Clean up old sessions (optional - prevents memory leaks)
const SESSION_CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
setInterval(() => {
  // In a real app, you might want to track session timestamps and clean up old ones
  // For now, we'll keep it simple
}, SESSION_CLEANUP_INTERVAL);

function getSessionId(request: NextRequest): string {
  // Try to get session ID from cookie
  const sessionCookie = request.cookies.get('readme-session-id');
  if (sessionCookie) {
    return sessionCookie.value;
  }

  // Generate new session ID
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getSessionCount(sessionId: string): number {
  return sessionCounts.get(sessionId) || 0;
}

function incrementSessionCount(sessionId: string): number {
  const currentCount = getSessionCount(sessionId);
  const newCount = currentCount + 1;
  sessionCounts.set(sessionId, newCount);
  return newCount;
}

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

export async function POST(request: NextRequest) {
  try {
    const sessionId = getSessionId(request);
    const currentCount = getSessionCount(sessionId);

    // Get the generation limit based on user's plan
    const maxGenerations = await getGenerationLimit(request);

    // Check if limit is reached before processing
    if (currentCount >= maxGenerations) {
      const response = NextResponse.json(
          {
            error: `Session limit reached. Only ${maxGenerations} README generations are allowed per session.`,
            generationsUsed: currentCount,
            maxGenerations: maxGenerations,
            remaining: maxGenerations - currentCount,
            isLimitReached: true
          },
          { status: 429 }
      );

      // Set session cookie
      response.cookies.set('readme-session-id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    }

    // Parse request body with improved error handling
    let githubUrl: string;
    try {
      const parsedBody = await parseRequestBody(request);
      githubUrl = parsedBody.githubUrl;
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
          { error: 'Invalid request format. Please send githubUrl as JSON or form data.' },
          { status: 400 }
      );
    }

    if (!githubUrl || !isValidGithubUrl(githubUrl)) {
      return NextResponse.json(
          { error: 'Invalid GitHub repository URL' },
          { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
          { error: 'Gemini API key is not configured' },
          { status: 500 }
      );
    }

    try {
      const markdownContent = await generateReadmeWithGemini(githubUrl, geminiApiKey);

      // Only increment counter after successful generation
      const newCount = incrementSessionCount(sessionId);

      const response = NextResponse.json({
        markdown: markdownContent,
        generationsUsed: newCount,
        maxGenerations: maxGenerations,
        remaining: maxGenerations - newCount,
        isLimitReached: newCount >= maxGenerations
      });

      // Set session cookie
      response.cookies.set('readme-session-id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      const response = NextResponse.json(
          {
            error: 'Failed to generate README. Please try again later.',
            generationsUsed: currentCount,
            maxGenerations: maxGenerations,
            remaining: maxGenerations - currentCount,
            isLimitReached: currentCount >= maxGenerations
          },
          { status: 500 }
      );

      // Set session cookie even on error
      response.cookies.set('readme-session-id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
        { error: 'Failed to process the request' },
        { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const sessionId = getSessionId(request);
  const currentCount = getSessionCount(sessionId);

  // Get the generation limit based on user's plan
  const maxGenerations = await getGenerationLimit(request);

  const response = NextResponse.json({
    generationsUsed: currentCount,
    maxGenerations: maxGenerations,
    remaining: maxGenerations - currentCount,
    isLimitReached: currentCount >= maxGenerations
  });

  // Set session cookie
  response.cookies.set('readme-session-id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 // 24 hours
  });

  return response;
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
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: PROMPT + '\n\n' + githubUrl }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
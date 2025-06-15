import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('users')
      .select('readme_count')
      .eq('id', userId)
      .single();

    if (error) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentCount = data.readme_count || 0;

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
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('readme_count')
      .eq('id', userId)
      .single();

    if (userError) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentCount = userData.readme_count || 0;

    // Check if limit is reached before processing
    if (currentCount >= DEFAULT_GENERATION_LIMIT) {
      return NextResponse.json(
        {
          error: `Generation limit reached. Only ${DEFAULT_GENERATION_LIMIT} README generations are allowed.`,
          generationsUsed: currentCount,
          maxGenerations: DEFAULT_GENERATION_LIMIT,
          remaining: DEFAULT_GENERATION_LIMIT - currentCount,
          isLimitReached: true
        },
        { status: 429 }
      );
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

      // Update user's readme count after successful generation
      const { error: updateError } = await supabase
        .from('users')
        .update({ readme_count: currentCount + 1 })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating user count:', updateError);
        return NextResponse.json(
          { error: 'Failed to update generation count' },
          { status: 500 }
        );
      }

      const newCount = currentCount + 1;

      return NextResponse.json({
        markdown: markdownContent,
        generationsUsed: newCount,
        maxGenerations: DEFAULT_GENERATION_LIMIT,
        remaining: DEFAULT_GENERATION_LIMIT - newCount,
        isLimitReached: newCount >= DEFAULT_GENERATION_LIMIT
      });
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json(
        {
          error: 'Failed to generate README. Please try again later.',
          generationsUsed: currentCount,
          maxGenerations: DEFAULT_GENERATION_LIMIT,
          remaining: DEFAULT_GENERATION_LIMIT - currentCount,
          isLimitReached: currentCount >= DEFAULT_GENERATION_LIMIT
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}
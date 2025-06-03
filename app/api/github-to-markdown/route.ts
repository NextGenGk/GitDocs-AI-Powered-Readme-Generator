import { NextRequest, NextResponse } from 'next/server';

// The prompt to be used for generating the README.md
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

For markdown badges use this repo:
https://github.com/Ileriayo/markdown-badges

Output should be in valid Markdown and follow good formatting practices with proper headers, code blocks, and links.`;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { githubUrl } = body;

    // Validate the GitHub URL
    if (!githubUrl || !isValidGithubUrl(githubUrl)) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL' },
        { status: 400 }
      );
    }

    // Get the Gemini API key from environment variables
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Call the Gemini API to generate the README.md
    const markdownContent = await generateReadmeWithGemini(
      githubUrl,
      geminiApiKey
    );

    // Return the generated markdown content
    return NextResponse.json({ markdown: markdownContent });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}

// Function to validate GitHub URL
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

// Function to generate README.md using Gemini API
async function generateReadmeWithGemini(
  githubUrl: string,
  apiKey: string
): Promise<string> {
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
          parts: [
            {
              text: PROMPT + '\n\n' + githubUrl
            }
          ]
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

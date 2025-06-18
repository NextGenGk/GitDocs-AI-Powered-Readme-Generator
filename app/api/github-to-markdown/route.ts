import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

OUTPUT STRUCTURE:

# 1. PROJECT HEADER
Include:
- Project name with relevant emoji (🚀 apps, 📚 libraries, 🛠️ tools, 🎨 UI/design, 📱 mobile, 🌐 web, 🤖 AI/ML, 🔧 utilities)
- One-line compelling description
- Brief tagline or value proposition

# 2. BADGES SECTION
Create badges using shields.io syntax - use this exact format:

![License](https://img.shields.io/github/license/username/repo-name)
![GitHub stars](https://img.shields.io/github/stars/username/repo-name?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/repo-name?style=social)
![GitHub issues](https://img.shields.io/github/issues/username/repo-name)
![GitHub pull requests](https://img.shields.io/github/issues-pr/username/repo-name)
![GitHub last commit](https://img.shields.io/github/last-commit/username/repo-name)

Add technology badges from https://github.com/Ileriayo/markdown-badges:
- Language badges (JavaScript, Python, etc.)
- Framework badges (React, Vue, Django, etc.)
- Platform badges (Node.js, Docker, etc.)

# 3. TABLE OF CONTENTS
Generate exactly this format:

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [FAQ](#faq)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

# 4. ABOUT SECTION
Include:
- 2-3 paragraphs explaining the project
- Problem it solves and target audience
- Key technologies and architecture
- Unique selling points

# 5. FEATURES SECTION
Use this format:

## ✨ Features

- 🎯 **Feature Name**: Detailed description of capability
- ⚡ **Performance**: Speed/efficiency benefits
- 🔒 **Security**: Security features if applicable
- 🎨 **UI/UX**: Interface highlights
- 📱 **Responsive**: Cross-platform compatibility
- 🛠️ **Extensible**: Customization options

# 6. DEMO SECTION
Include:
- Live demo link if available
- Screenshots with descriptive alt text
- GIFs or video demonstrations
- Interactive examples

Use this format:

## 🎬 Demo

🔗 **Live Demo**: [https://your-demo-url.com](https://your-demo-url.com)

### Screenshots
![Main Interface](screenshots/main-interface.png)
*Main application interface showing key features*

![Dashboard View](screenshots/dashboard.png)  
*User dashboard with analytics and controls*

# 7. QUICK START SECTION
Provide the fastest way to get started:

## 🚀 Quick Start

Clone and run in 3 steps:
git clone https://github.com/username/repo-name.git
cd repo-name
npm install && npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# 8. INSTALLATION SECTION
Detailed installation steps:

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git
- [Additional requirements]

### Option 1: NPM Package
npm install package-name

### Option 2: From Source
# Clone repository
git clone https://github.com/username/repo-name.git
cd repo-name

# Install dependencies
npm install

# Build project (if needed)
npm run build

# Start development server
npm run dev

### Option 3: Docker
docker run -p 3000:3000 username/repo-name

# 9. USAGE SECTION
Practical examples:

## 💻 Usage

### Basic Usage
const { functionName } = require('package-name');

// Example usage
const result = functionName({
  option1: 'value1',
  option2: 'value2'
});

console.log(result);

### Advanced Examples
// More complex usage scenarios

### CLI Usage (if applicable)
# Command line examples
npx package-name --option value

# 10. CONFIGURATION SECTION
## ⚙️ Configuration

### Environment Variables
Create a .env file in the root directory:

# Database
DATABASE_URL=postgresql://localhost:5432/dbname
DATABASE_SSL=false

# API Keys
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key

# Server
PORT=3000
NODE_ENV=development

# External Services
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE_API_KEY=your_email_key

### Configuration File
{
  "name": "app-config",
  "version": "1.0.0",
  "settings": {
    "theme": "dark",
    "language": "en",
    "notifications": true
  }
}

# 11. API REFERENCE (if applicable)
Document API endpoints, methods, and examples

# 12. PROJECT STRUCTURE
## 📁 Project Structure

project-name/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 pages/              # Application pages
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 utils/              # Utility functions
│   ├── 📁 services/           # API services
│   ├── 📁 styles/             # CSS/styling files
│   └── 📄 index.js            # Application entry point
├── 📁 public/                 # Static assets
├── 📁 tests/                  # Test files
├── 📁 docs/                   # Documentation
├── 📁 scripts/                # Build/deployment scripts
├── 📄 .env.example           # Environment variables template
├── 📄 .gitignore             # Git ignore rules
├── 📄 package.json           # Project dependencies
├── 📄 README.md              # Project documentation
└── 📄 LICENSE                # License file

# 13. CONTRIBUTING SECTION
## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. 🍴 Fork the repository
2. 🌟 Create your feature branch (git checkout -b feature/AmazingFeature)
3. ✅ Commit your changes (git commit -m 'Add some AmazingFeature')
4. 📤 Push to the branch (git push origin feature/AmazingFeature)
5. 🔃 Open a Pull Request

### Development Setup
# Fork and clone the repo
git clone https://github.com/yourusername/repo-name.git

# Install dependencies
npm install

# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes and test
npm test

# Commit and push
git commit -m "Description of changes"
git push origin feature/your-feature-name

### Code Style
- Follow existing code conventions
- Run npm run lint before committing
- Add tests for new features
- Update documentation as needed

# 14. TESTING SECTION
Include testing instructions and commands

# 15. DEPLOYMENT SECTION
Provide deployment instructions for different platforms

# 16. FAQ SECTION
Address common questions and issues

# 17. LICENSE SECTION
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

# 18. SUPPORT SECTION
## 💬 Support

- 📧 **Email**: your.email@example.com
- 💬 **Discord**: [Join our community](https://discord.gg/your-invite)
- 🐛 **Issues**: [GitHub Issues](https://github.com/username/repo-name/issues)
- 📖 **Documentation**: [Full Documentation](https://docs.your-site.com)
- 💰 **Sponsor**: [Support the project](https://github.com/sponsors/username)

# 19. ACKNOWLEDGMENTS SECTION
## 🙏 Acknowledgments

- 🎨 **Design inspiration**: [Source or person]
- 📚 **Libraries used**:
  - [Library Name](https://github.com/author/library) - Description
  - [Another Library](https://github.com/author/library) - Description
- 👥 **Contributors**: Thanks to all [contributors](https://github.com/username/repo-name/contributors)
- 🌟 **Special thanks**: Mention specific people or organizations

QUALITY REQUIREMENTS:
1. ✅ All markdown syntax must be valid and render correctly
2. ✅ Use consistent formatting and spacing throughout
3. ✅ Include working links (use placeholder URLs if needed)
4. ✅ Add appropriate emojis for visual appeal
5. ✅ Ensure code blocks have proper language specifiers
6. ✅ Make content scannable with clear headers and lists
7. ✅ Include realistic examples and code snippets
8. ✅ Adapt sections based on project type (library, app, tool, etc.)
9. ✅ Use professional tone while being approachable
10. ✅ Test that table of contents links work with proper anchors

CUSTOMIZATION NOTES:
- Adjust sections based on project type (remove API Reference for simple tools, add more technical details for libraries)
- Include framework-specific instructions (React, Vue, Django, etc.)
- Add deployment-specific sections (Vercel, Netlify, Docker, etc.)
- Include relevant badges for the technology stack
- Adapt examples to match the actual codebase

IMPORTANT: When outputting the README.md, wrap all code examples in proper markdown code blocks with language specifiers. For example:
- Use triple backticks with language: \`\`\`bash, \`\`\`javascript, \`\`\`json, \`\`\`env
- Use single backticks for inline code references
- Ensure proper spacing around all markdown elements

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
          parts: [{ text: README_GENERATOR_PROMPT + '\n\n' + githubUrl }]
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
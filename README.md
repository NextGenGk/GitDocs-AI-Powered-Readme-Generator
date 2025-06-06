# GitHub to Markdown Converter

A web application that converts GitHub repository links to polished README.md files using AI. The application allows users to input a GitHub repository URL, generates a comprehensive README.md file, and provides options to edit and download the result.

## Features

- Convert GitHub repository links to README.md files
- AI-powered content generation using Google's Gemini API
- User authentication with Clerk
- Edit generated markdown content in the browser
- Download the final README.md file
- Responsive design for desktop and mobile

## Prerequisites

- Node.js 18.x or later
- A Google Gemini API key
- A Clerk account for authentication

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gitdocs-api.git
cd gitdocs-api
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory with the following environment variables:

```
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

#### Getting your Clerk Publishable Key:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign up or log in to your account
3. Create a new application or select an existing one
4. Navigate to the "API Keys" section
5. Copy your "Publishable key" (it starts with `pk_test_` or `pk_live_`)
6. Add it to your `.env.local` file

#### Getting your Gemini API Key:

1. Go to [Google AI Studio](https://ai.google.dev/gemini-api)
2. Sign in with your Google account
3. Create a new API key
4. Add it to your `.env.local` file

You can use the `.env.local.example` file as a template.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Sign in to your account using Clerk authentication
2. Enter a GitHub repository URL in the input field (e.g., https://github.com/username/repository)
3. Click the "Generate README" button
4. Wait for the AI to generate the README.md content
5. Edit the generated content in the textarea if needed
6. Click the "Download README.md" button to save the file

## How It Works

The application uses the following process:

1. The user authenticates through Clerk
2. The user submits a GitHub repository URL through the web interface
3. The application validates the URL format
4. The backend makes a request to the Google Gemini API with a specialized prompt
5. The AI generates a comprehensive README.md file based on the repository
6. The generated content is displayed in an editable textarea
7. The user can download the final README.md file

## API Reference

### POST /api/github-to-markdown

Converts a GitHub repository URL to a README.md file.

**Request Body:**

```json
{
  "githubUrl": "https://github.com/username/repository"
}
```

**Response:**

```json
{
  "markdown": "# Repository Name\n\nDescription of the repository..."
}
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Clerk](https://clerk.com/) - Authentication and user management
- [Google Gemini API](https://ai.google.dev/gemini-api) - AI content generation
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Environment Variables

Make sure to set up the following environment variables in your `.env.local` file:

- `GEMINI_API_KEY` - Your Google Gemini API key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key

## Troubleshooting

### Clerk Authentication Error

If you see an error about an invalid Clerk publishable key:

1. Make sure you have created a `.env.local` file in the root directory
2. Verify that your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set correctly
3. Ensure the key starts with `pk_test_` (for development) or `pk_live_` (for production)
4. Restart your development server after adding the environment variable

## License

This project is licensed under the MIT License - see the LICENSE file for details.
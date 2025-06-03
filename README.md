# GitHub to Markdown Converter

A web application that converts GitHub repository links to polished README.md files using AI. The application allows users to input a GitHub repository URL, generates a comprehensive README.md file, and provides options to edit and download the result.

## Features

- Convert GitHub repository links to README.md files
- AI-powered content generation using Google's Gemini API
- Edit generated markdown content in the browser
- Download the final README.md file
- Responsive design for desktop and mobile

## Prerequisites

- Node.js 18.x or later
- A Google Gemini API key

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

Create a `.env.local` file in the root directory with your Google Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

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

1. Enter a GitHub repository URL in the input field (e.g., https://github.com/username/repository)
2. Click the "Generate README" button
3. Wait for the AI to generate the README.md content
4. Edit the generated content in the textarea if needed
5. Click the "Download README.md" button to save the file

## How It Works

The application uses the following process:

1. The user submits a GitHub repository URL through the web interface
2. The application validates the URL format
3. The backend makes a request to the Google Gemini API with a specialized prompt
4. The AI generates a comprehensive README.md file based on the repository
5. The generated content is displayed in an editable textarea
6. The user can download the final README.md file

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
- [Google Gemini API](https://ai.google.dev/gemini-api) - AI content generation
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

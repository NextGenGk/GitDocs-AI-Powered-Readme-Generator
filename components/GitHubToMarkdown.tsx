'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRef, useState } from 'react';

// Define the form schema with Zod
const formSchema = z.object({
  githubUrl: z.string()
    .url("Please enter a valid URL")
    .refine(
      (url) => url.startsWith("https://github.com/") || url.startsWith("http://github.com/"),
      { message: "URL must be a GitHub repository link" }
    )
});

// Define the form values type
type FormValues = z.infer<typeof formSchema>;

export default function GitHubToMarkdown() {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/github-to-markdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubUrl: values.githubUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate README.md');
      }

      setMarkdown(data.markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!markdown) return;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 mt-2">
          <div className="flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input 
                      placeholder="Enter GitHub repository URL" 
                      className="p-2 border border-gray-400 rounded-lg text-gray-950 h-10"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-slate-800 text-white px-4 rounded-lg hover:bg-slate-700 disabled:bg-blue-400 h-10"
            >
              {isLoading ? 'Generating...' : 'Generate README'}
            </Button>
          </div>
        </form>
      </Form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {markdown && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Generated README.md</h2>

            <Button 
              onClick={handleDownload}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Download README.md
            </Button>
          </div>

          <Textarea 
            ref={textareaRef}
            value={markdown}
            onChange={handleTextareaChange}
            onInput={adjustTextareaHeight}
            className="w-full p-4 border border-gray-300 rounded font-mono min-h-[300px]"
            style={{resize: 'vertical'}} 
          />
        </div>
      )}
    </div>
  );
}

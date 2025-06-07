'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';

interface MarkdownPreviewProps {
  markdown: string;
  onClose: () => void;
  onDownload: () => void;
}

export default function MarkdownPreview({ markdown, onClose, onDownload }: MarkdownPreviewProps) {
  return (
    <div className="w-full bg-gradient-to-br from-blue-600/5 via-indigo-500/5 to-purple-700/5 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-border bg-background/80">
        <h2 className="text-xl font-semibold">Generated README.md</h2>
        <div className="flex gap-2">
          <Button
            onClick={onDownload}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Download README.md
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="hover:bg-purple-50 dark:hover:bg-purple-950/20"
          >
            Close
          </Button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto p-6">
        <div className="bg-card/95 rounded-lg shadow-lg p-8 border border-blue-100 dark:border-blue-900/30">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

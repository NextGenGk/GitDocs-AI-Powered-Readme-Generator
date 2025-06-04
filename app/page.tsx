import GitHubToMarkdown from "@/components/GitHubToMarkdown";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Banner />
      </div>
      <main className="flex flex-col items-center justify-center w-full" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-4xl font-bold mb-6">GitHub to README.md Converter</h1>
        <p className="text-lg mb-8 text-center max-w-2xl">
          Generate comprehensive README.md files for your GitHub repositories using AI.
        </p>
        <GitHubToMarkdown />
      </main>
    </div>
  );
}

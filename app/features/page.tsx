import FeaturesSection from "@/components/FeatureSection";


export default function FeaturesPage() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover all the powerful features that make GitDocs the best solution for generating README files.
          </p>
        </div>
        <FeaturesSection />
      </div>
    </div>
  );
}

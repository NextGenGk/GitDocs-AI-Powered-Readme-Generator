import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturesSection from "@/components/FeatureSection";
import React from "react";
import SubscriptionPage from "@/components/SubscriptionPage";

export default function Home() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
        <Banner />
        <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Features You've Never Seen Before</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">
                        Say goodbye to boring, copy-paste templates. This is README
                        generation like you've never seen before. Powered by AI, crafted
                        for developers — your GitHub repos get the spotlight they deserve,
                        instantly. No fluff. Just flawless documentation.
                    </p>
                </div>
                <FeaturesSection />
            </div>
        </section>

        <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose GitDocs</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">
                        GitDocs makes creating professional README files for your GitHub repositories quick, easy, and hassle-free.
                    </p>
                </div>
                <WhyChooseUs />
            </div>
        </section>

        <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">
                        Choose the plan that fits your workflow — whether you're a solo developer,
                        a fast-moving startup, or a growing team. Get powerful README generation
                        features, AI customization, and seamless GitHub integration at every level.
                    </p>
                </div>
                <SubscriptionPage />
            </div>
        </section>
    </div>
  );
}
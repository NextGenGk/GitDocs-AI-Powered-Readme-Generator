import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturesSection from "@/components/FeatureSection";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
        <Banner />
        {/*<WhyChooseUs />*/}
        <section className="py-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">Features You’ve Never Seen Before</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
                        Say goodbye to boring, copy-paste templates. This is README
                        generation like you’ve never seen before. Powered by AI, crafted
                        for developers — your GitHub repos get the spotlight they deserve,
                        instantly. No fluff. Just flawless documentation.
                    </p>
                </div>
                <FeaturesSection />
            </div>
        </section>
    </div>
  );
}

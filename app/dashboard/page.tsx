import BasicFeature from "@/components/BasicFeature";
import { FeaturesSection } from "@/components/FeatureSection";

export default async function Dashboard() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            {/*<div className="w-full max-w-7xl mx-auto px-2 md:px-8">*/}
                {/* Features Section - visually rich, device friendly */}
                {/*<FeaturesSection />*/}
                {/* Basic Feature Section - device friendly */}

            {/*</div>*/}

            <BasicFeature />
        </main>
    );
}


import Banner from "@/components/Banner";
import {FeaturesSection} from "@/components/FeatureSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import SubscriptionPage from "@/components/SubscriptionPage";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

export default function Page() {
    return (
        <main className="min-h-screen">
            <Banner />
            <div id="features" className="scroll-mt-20">
                <FeaturesSection />
            </div>
            <WhyChooseUs />
            <section className="py-16 sm:py-24 md:py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10">Supercharge Your Repos with Smarter READMEs</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">
                            Choose the plan that fits your workflow — whether you're a solo developer, a fast-moving startup, or a growing team. Get powerful README generation features, AI customization, and seamless GitHub integration at every level.
                        </p>
                    </div>
                    <div id="pricing" className="scroll-mt-20">
                        <SubscriptionPage />
                    </div>
                </div>
            </section>
            <div id="faq" className="scroll-mt-20">
                <Faq />
            </div>
            <Footer />
        </main>
    )
}

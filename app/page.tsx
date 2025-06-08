import Banner from "@/components/Banner";
import {FeaturesSection} from "@/components/FeatureSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import SubscriptionPage from "@/components/SubscriptionPage";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

export default function Page() {
    return (
        <main>
            <Banner />

            {/*<section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="text-center mb-8 sm:mb-12">*/}
            {/*            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Features You’ve Never Seen Before</h2>*/}
            {/*            <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">*/}
            {/*                Say goodbye to boring, copy-paste templates. This is README generation like you’ve never seen before.*/}
            {/*                Powered by AI, crafted for developers — your GitHub repos get the spotlight they deserve, instantly.*/}
            {/*                No fluff. Just flawless documentation.*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <FeaturesSection />*/}
            {/*    </div>*/}
            {/*</section>*/}
            <FeaturesSection />

            {/*<section className="sm:py-24 md:py-32 bg-gradient-to-t from-blue-50 to-white">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="text-center mb-8 sm:mb-12">*/}
            {/*            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 m-4">Why Choose GitDocs</h2>*/}
            {/*            <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">*/}
            {/*                GitDocs makes creating professional README files for your GitHub repositories quick, easy, and hassle-free.*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <WhyChooseUs />*/}
            {/*    </div>*/}
            {/*</section>*/}
            <WhyChooseUs />

            <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10">Supercharge Your Repos with Smarter READMEs</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">
                            Choose the plan that fits your workflow — whether you're a solo developer, a fast-moving startup, or a growing team. Get powerful README generation features, AI customization, and seamless GitHub integration at every level.
                        </p>
                    </div>
                    <SubscriptionPage />
                </div>
            </section>

            <Faq />

            <Footer />
            {/*// Footer*/}
            {/*<footer className="bg-gray-100 py-8">*/}
            {/*    <Footer />*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">*/}
            {/*        <p className="text-lg text-gray-600">© {new Date().getFullYear()} GitDocs. All rights reserved.</p>*/}
            {/*        <p className="text-sm text-gray-500 mt-2">*/}
            {/*            Made with ❤️ by the GitDocs Team*/}
            {/*        </p>*/}
            {/*    </div>*/}

            {/*</footer>*/}


        </main>
    )
}

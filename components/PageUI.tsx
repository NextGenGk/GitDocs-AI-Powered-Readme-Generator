import Banner from "@/components/Banner";
import {FeaturesSection} from "@/components/FeatureSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

export default function Page() {
    return (
        <main className="min-h-screen">
            <Banner />
            <FeaturesSection />
            <WhyChooseUs />
            <Faq />
            <Footer />
        </main>
    )
}

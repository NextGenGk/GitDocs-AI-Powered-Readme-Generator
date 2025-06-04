import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Banner />
      <WhyChooseUs />
    </div>
  );
}

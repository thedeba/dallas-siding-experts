import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-white pt-2 pb-20 lg:pt-2">
        <AboutSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

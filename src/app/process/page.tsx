import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";

export default function ProcessPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-brand-gray pt-2 pb-20 lg:pt-2">
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function FAQPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-brand-gray pt-2 pb-20 lg:pt-2">
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

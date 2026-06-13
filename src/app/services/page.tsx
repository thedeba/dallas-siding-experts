import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-brand-gray pt-2 pb-20 lg:pt-2">
        <ServicesSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceAreas from "@/components/ServiceAreas";
import CTASection from "@/components/CTASection";

export default function ServiceAreasPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow pt-2 pb-20 lg:pt-2">
        <ServiceAreas />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

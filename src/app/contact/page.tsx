import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-[#070d19] pt-2 pb-20 lg:pt-2">
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

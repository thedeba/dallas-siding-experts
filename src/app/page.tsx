import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ServiceAreas from "@/components/ServiceAreas";
import LatestBlogs from "@/components/LatestBlogs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import admin from "@/data/admin.json";

export default function HomePage() {
  return (
    <>

      <Header />

      <main id="main-content">
        <HeroSection />
        <WhyChooseUs />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <ServiceAreas />
        <LatestBlogs />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />

      {/* Floating phone button (mobile) */}
      <div
        className="fixed bottom-6 right-6 z-40 lg:hidden"
        aria-label="Quick call button"
      >
        <a
          href={admin.phoneRaw}
          id="floating-call-btn"
          className="flex items-center justify-center w-14 h-14 bg-brand-orange rounded-full shadow-2xl shadow-brand-orange/50 hover:bg-orange-500 transition-all hover:scale-110 pulse-ring"
          aria-label="Call Dallas Siding Experts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 7.29 7.29l.9-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>
    </>
  );
}

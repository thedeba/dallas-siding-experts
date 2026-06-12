import { MessageSquare, Search, FileText, HardHat, Phone } from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

// Map string keys to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Search,
  FileText,
  HardHat,
};

export default function ProcessSection() {
  const { process } = siteData;

  return (
    <section id="process" className="py-20 lg:py-28 bg-brand-gray border-t border-gray-100" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
            {process.badge}
          </span>
          <h2 id="process-heading" className="section-heading mb-4">
            {process.title}{" "}
            <span className="text-brand-orange">{process.titleHighlight}</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            {process.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-blue via-brand-orange to-brand-blue opacity-30"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || MessageSquare;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step circle */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300 border-4 border-white">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6.5 shadow-sm border border-gray-100 w-full card-hover hover:border-brand-orange/20 transition-all duration-300">
                    <div className="text-brand-orange/25 font-black text-4xl mb-2 leading-none uppercase tracking-wider">
                      {step.number}
                    </div>
                    <h3 className="text-brand-blue font-extrabold text-base mb-2.5 group-hover:text-brand-orange transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <a
            href={admin.phoneRaw}
            id="process-cta-btn"
            className="btn-orange text-base py-4 px-10 shadow-lg shadow-brand-orange/20 rounded-xl"
          >
            <Phone className="w-5 h-5" />
            Call for Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

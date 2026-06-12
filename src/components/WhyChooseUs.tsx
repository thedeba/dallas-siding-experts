import {
  Wrench,
  Award,
  DollarSign,
  BarChart3,
  Timer,
  ThumbsUp,
  Phone,
} from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

// Map string keys to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Award,
  DollarSign,
  BarChart3,
  Timer,
  ThumbsUp,
};

export default function WhyChooseUs() {
  const { whyChooseUs } = siteData;

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
            {whyChooseUs.badge}
          </span>
          <h2 id="why-heading" className="section-heading mb-4">
            {whyChooseUs.title}{" "}
            <span className="text-brand-orange">{whyChooseUs.titleHighlight}</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            {whyChooseUs.subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseUs.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Wrench;
            return (
              <div
                key={benefit.title}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 card-hover shadow-sm hover:border-brand-orange/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-brand-blue-mid text-white group-hover:bg-brand-orange shadow-md group-hover:scale-110 transition-all duration-300`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="text-brand-blue font-bold text-lg mb-3 group-hover:text-brand-orange transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {benefit.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <a
            href={admin.phoneRaw}
            id="why-cta-btn"
            className="btn-orange text-base py-4 px-10 shadow-lg shadow-brand-orange/20 rounded-xl"
          >
            <Phone className="w-5 h-5" />
            Call Now: {admin.phone}
          </a>
          <p className="text-gray-500 text-sm mt-3">
            No pressure, no obligation — just expert advice.
          </p>
        </div>
      </div>
    </section>
  );
}

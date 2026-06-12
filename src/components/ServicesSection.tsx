import Link from "next/link";
import {
  Hammer,
  Wrench,
  RefreshCw,
  Layers,
  Building2,
  CloudLightning,
  Snowflake,
  Factory,
  ArrowRight,
} from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

// Map string keys to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Hammer,
  Wrench,
  RefreshCw,
  Layers,
  Building2,
  CloudLightning,
  Snowflake,
  Factory,
};

export default function ServicesSection() {
  const { services } = siteData;

  return (
    <section id="services" className="py-20 lg:py-28 bg-brand-gray border-y border-gray-100" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
            {services.badge}
          </span>
          <h2 id="services-heading" className="section-heading mb-4">
            {services.title}{" "}
            <span className="text-brand-orange">{services.titleHighlight}</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.items.map((service) => {
            const IconComponent = iconMap[service.icon] || Hammer;
            return (
              <article
                key={service.title}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover shadow-sm hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5 transition-all duration-300"
              >
                {service.badge && (
                  <div className="absolute top-4 right-4 z-10 bg-brand-orange text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    {service.badge}
                  </div>
                )}

                {/* Top accent bar */}
                <div className={`h-1.5 bg-brand-blue-mid w-full group-hover:bg-brand-orange transition-colors duration-300`} />

                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue mb-5 group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300 shadow-md`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-brand-blue font-bold text-base mb-2.5 leading-tight group-hover:text-brand-orange transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 min-h-[72px]">
                    {service.description}
                  </p>

                  <Link
                    href={`#contact`}
                    id={`service-${service.slug}-btn`}
                    className="inline-flex items-center gap-1.5 text-brand-blue font-bold text-xs uppercase tracking-wider hover:text-brand-orange transition-colors duration-200 group/link"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Get Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200 text-brand-orange" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-gray-600 mb-4 text-base">
            Not sure which service you need?{" "}
            <strong className="text-brand-blue font-extrabold">We'll help you find out — for free.</strong>
          </p>
          <a
            href={admin.phoneRaw}
            id="services-call-btn"
            className="btn-orange text-base py-4 px-10 shadow-lg shadow-brand-orange/20 rounded-xl"
          >
            Call for Free Assessment
          </a>
        </div>
      </div>
    </section>
  );
}

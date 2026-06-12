import { Phone, Clock, MapPin, CheckCircle2, PhoneCall } from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

export default function CTASection() {
  const { cta } = siteData;

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#070d19] hero-pattern relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Pitch */}
          <div className="lg:col-span-7">
            <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
              {cta.badge}
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-6"
            >
              {cta.title}{" "}
              <span className="text-brand-orange">{cta.titleHighlight}</span>{" "}
              {cta.titleSuffix}
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl font-light">
              {cta.description}
            </p>

            {/* Checklist with clean gold checks */}
            <ul className="space-y-4 mb-8" role="list">
              {cta.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5.5 h-5.5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100/90 font-medium">{reason}</span>
                </li>
              ))}
            </ul>

            {/* Contact quick details */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-blue-200 text-sm">
                <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>{admin.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>{admin.address}</span>
              </div>
            </div>
          </div>

          {/* Right — Call Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-orange to-brand-blue-light opacity-30 blur-lg pointer-events-none" />

            <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center border border-white/10">
              {/* Icon */}
              <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-orange/30 group-hover:rotate-6 transition-transform">
                <PhoneCall className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-brand-blue font-black text-2xl mb-1.5 uppercase tracking-wide">
                Call Us Now
              </h3>
              <p className="text-gray-500 text-xs mb-6 uppercase tracking-wider font-semibold">
                Talk to a siding expert — no wait, no forms
              </p>

              {/* Big gold phone button */}
              <a
                href={admin.phoneRaw}
                id="cta-main-call-btn"
                className="block w-full btn-orange text-xl py-5 px-6 justify-center shadow-xl shadow-brand-orange/30 mb-4 rounded-2xl group/cta"
                aria-label={`Call Dallas Siding Experts at ${admin.phone}`}
              >
                <Phone className="w-6 h-6 group-hover/cta:scale-110 transition-transform" />
                {admin.phone}
              </a>

              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-6">
                Available {admin.hours}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {["Free Estimate", "Licensed & Insured", "Dallas, TX"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 bg-brand-gray border border-gray-100 text-brand-blue text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full"
                  >
                    <CheckCircle2 className="w-3 h-3 text-brand-orange" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

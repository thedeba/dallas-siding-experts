import { CheckCircle2, Phone, Shield, Users } from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

// Map string keys to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Users,
  CheckCircle2,
  Phone,
};

export default function AboutSection() {
  const { about } = siteData;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Redesigned Text Content */}
          <div className="lg:col-span-7">
            <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
              {about.badge}
            </span>
            <h2 id="about-heading" className="section-heading mb-6">
              {about.title}{" "}
              <span className="text-brand-orange">{about.titleHighlight}</span>
            </h2>

            <div className="space-y-4 mb-8 text-gray-600 leading-relaxed text-[1.05rem]">
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Checklist with premium gold markers */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8" role="list">
              {about.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm font-semibold leading-normal">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={admin.phoneRaw}
              id="about-call-btn"
              className="btn-orange text-base py-4.5 px-8 shadow-lg shadow-brand-orange/20 rounded-xl"
            >
              <Phone className="w-5 h-5" />
              Call {admin.phone} — It's Free
            </a>
          </div>

          {/* Right — Redesigned Premium Visual Card with Image Background */}
          <div className="lg:col-span-5 relative">
            {/* Ambient gold glow */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-orange to-brand-blue opacity-25 blur-md pointer-events-none" />

            {/* Visual card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-[#070d19] min-h-[420px] flex flex-col justify-between p-8">
              {/* Siding Image Background */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/dallas_siding_hero.png"
                  alt="High-end Dallas siding project"
                  className="w-full h-full object-cover opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-[#070d19]/80 to-[#070d19]/40" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {about.stats.map((stat) => {
                    const IconComponent = iconMap[stat.icon] || Shield;
                    return (
                      <div
                        key={stat.label}
                        className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center backdrop-blur-sm hover:border-brand-orange/30 transition-colors"
                      >
                        <IconComponent className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                        <div className="text-white font-black text-2xl">{stat.value}</div>
                        <div className="text-blue-100 text-[10px] uppercase tracking-wider font-semibold mt-1.5">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#0b1329]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <p className="text-white font-bold text-sm mb-1">James Hardie® Preferred</p>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    {about.certificationText}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating accent badge */}
            <div className="absolute -bottom-4 -left-4 bg-brand-orange rounded-xl px-5 py-3.5 shadow-xl shadow-brand-orange/30 font-bold text-white text-xs uppercase tracking-wider z-20">
              Est. {admin.yearEstablished} — {admin.address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

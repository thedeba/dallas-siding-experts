import {
  Phone,
  CheckCircle2,
  Zap,
  Award,
} from "lucide-react";
import admin from "@/data/admin.json";
import siteData from "@/data/siteData.json";

// Map string keys to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle2: CheckCircle2,
  Zap: Zap,
  Award: Award,
  Phone: Phone,
};

export default function HeroSection() {
  const { hero } = siteData;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#070d19] hero-pattern overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-brand-blue-light/15 blur-[120px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Value Pitch */}
          <div className="lg:col-span-7 fade-in-up text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange rounded-full px-4.5 py-1.5 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Award className="w-4 h-4 fill-current animate-pulse" />
              {hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              {hero.titlePrefix}{" "}
              <span className="text-brand-orange orange-underline">{hero.titleHighlight}</span>{" "}
              {hero.titleSuffix}
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed mb-8 max-w-2xl font-light">
              {hero.description}
            </p>

            {/* Redesigned CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={admin.phoneRaw}
                id="hero-call-btn"
                className="btn-orange text-base py-4.5 px-8 justify-center sm:justify-start shadow-xl shadow-brand-orange/20 rounded-xl group/btn"
              >
                <Phone className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                Call Now: {admin.phone}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hero.trustBadges.map((badge) => {
                const IconComponent = iconMap[badge.icon] || CheckCircle2;
                return (
                  <div
                    key={badge.text}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 backdrop-blur-md"
                  >
                    <IconComponent className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    <span className="text-blue-50 text-xs font-semibold leading-tight">
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column — Redesigned Glassmorphic Card */}
          <div className="lg:col-span-5 fade-in-up stagger-2">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-orange to-brand-blue-light opacity-30 blur-lg animate-tilt pointer-events-none" />

              {/* Glassmorphic Container Card */}
              <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
                <h2 className="text-white font-extrabold text-lg mb-6 text-center tracking-wide uppercase text-blue-200">
                  Why Dallas Choose Us
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {hero.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.04] rounded-2xl p-4 text-center border border-white/5 hover:border-brand-orange/20 transition-all duration-300 group/stat"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-brand-orange group-hover/stat:scale-105 transition-transform">
                        {stat.number}
                      </div>
                      <div className="text-blue-200 text-xs font-semibold mt-1.5 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call-Only Emergency/Fast Booking Widget */}
                <div className="bg-gradient-to-r from-brand-orange/10 to-brand-blue-light/5 border border-brand-orange/20 rounded-2xl p-5 mb-5 hover:border-brand-orange/30 transition-colors">
                  <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">Direct Siding Hotline</p>
                  <a
                    href={admin.phoneRaw}
                    className="flex items-center gap-4 group/call"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0 group-hover/call:rotate-6 transition-transform shadow-lg shadow-brand-orange/30">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-black text-xl leading-tight group-hover/call:text-brand-orange transition-colors">
                        {admin.phone}
                      </div>
                      <div className="text-blue-200 text-xs mt-0.5">Free local estimates in 24 hrs</div>
                    </div>
                  </a>
                </div>

                {/* Local status tag */}
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-3.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
                  <p className="text-blue-100 text-xs leading-normal">
                    <strong className="text-white">Active in Dallas:</strong> crews currently scheduling inspections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30" aria-hidden="true">
          <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll to explore</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-brand-orange rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

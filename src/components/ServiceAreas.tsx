import { MapPin, Phone, CheckCircle2 } from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

export default function ServiceAreas() {
  const { serviceAreas } = siteData;

  return (
    <section
      id="service-areas"
      className="py-20 lg:py-28 gradient-blue hero-pattern"
      aria-labelledby="areas-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-orange-400 font-bold text-sm tracking-widest uppercase mb-3">
              {serviceAreas.badge}
            </span>
            <h2 id="areas-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
              {serviceAreas.title}{" "}
              <span className="text-orange-400">{serviceAreas.titleHighlight}</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              {serviceAreas.description}
            </p>

            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-4 mb-8">
              <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold">{admin.address}</div>
                <div className="text-blue-200 text-sm">Our only service city — we know it inside and out</div>
              </div>
            </div>

            <a
              href={admin.phoneRaw}
              id="areas-call-btn"
              className="btn-orange text-base py-3.5 px-8 shadow-lg shadow-orange-500/30 justify-center sm:justify-start inline-flex"
            >
              <Phone className="w-5 h-5" />
              Call Us: {admin.phone}
            </a>
          </div>

          {/* Right — Dallas Neighborhoods */}
          <div>
            <p className="text-orange-400 font-bold text-sm tracking-widest uppercase mb-4">
              Dallas Neighborhoods We Cover
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceAreas.neighborhoods.map((neighborhood) => (
                <div
                  key={neighborhood}
                  className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-xl px-4 py-3 hover:bg-white/15 transition-all duration-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{neighborhood}</span>
                </div>
              ))}

              {/* Call to confirm */}
              <div className="sm:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center">
                <p className="text-blue-200 text-sm">
                  Not sure if we cover your street?{" "}
                  <a
                    href={admin.phoneRaw}
                    className="text-orange-400 font-semibold hover:text-orange-300 underline underline-offset-2"
                  >
                    Call us to confirm
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Phone, Mail, MapPin, Shield } from "lucide-react";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";

export default function Footer() {
  const { footer } = siteData;

  return (
    <footer className="bg-brand-blue text-blue-100" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-white font-extrabold text-lg leading-tight">
                  Dallas Siding
                </span>
                <span className="block text-orange-400 font-semibold text-xs tracking-widest uppercase">
                  Experts
                </span>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              Dallas&apos;s most trusted siding contractors since {admin.yearEstablished}. Licensed,
              insured, and committed to protecting your home with premium materials
              and expert craftsmanship.
            </p>
            <div className="space-y-2.5">
              <a
                href={admin.phoneRaw}
                className="flex items-center gap-2.5 text-blue-100 hover:text-orange-400 transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                {admin.phone}
              </a>
              <a
                href={`mailto:${admin.email}`}
                className="flex items-center gap-2.5 text-blue-100 hover:text-orange-400 transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                {admin.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>{admin.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {siteData.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-orange-400 transition-colors text-sm hover:underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 border-b border-white/10 pb-2">
              Our Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-orange-400 transition-colors text-sm hover:underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 border-b border-white/10 pb-2">
              Service Area
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-4">
              <div className="flex items-center gap-2.5 mb-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-white font-bold text-sm">{admin.address}</span>
              </div>
              <p className="text-blue-300 text-xs leading-relaxed">
                We exclusively serve {admin.serviceArea} homeowners. Our focused service area
                means faster response times and deeper local expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA bar */}
      <div className="border-t border-white/10 bg-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white font-semibold text-base text-center sm:text-left">
              Ready to transform your home? Call us for a free estimate today!
            </p>
            <a
              href={admin.phoneRaw}
              id="footer-call-btn"
              className="flex items-center gap-2 bg-white text-brand-orange font-extrabold px-6 py-2.5 rounded-lg hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Call {admin.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 bg-brand-blue-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p className="text-blue-300/60">
              © {new Date().getFullYear()} {footer.copyrightText}
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-blue-300/60 hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-blue-300/60 hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-blue-300/60 hover:text-blue-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

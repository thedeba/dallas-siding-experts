"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import admin from "@/data/admin.json";
import siteData from "@/data/siteData.json";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gradient-blue ${
        scrolled ? "header-scrolled" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Dallas Siding Experts - Home">
            <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-white font-extrabold text-lg leading-tight tracking-tight">
                Dallas Siding
              </span>
              <span className="block text-orange-400 font-semibold text-xs tracking-widest uppercase">
                Experts
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {siteData.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-blue-100 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={admin.phoneRaw}
              id="header-call-btn"
              className="flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 pulse-ring"
              aria-label="Call Dallas Siding Experts now"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{admin.phone}</span>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={admin.phoneRaw}
              className="flex items-center gap-1.5 bg-brand-orange text-white font-bold px-3 py-2 rounded-lg text-sm"
              aria-label="Call now"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Now</span>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                id="mobile-menu-trigger"
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-80 gradient-blue border-l border-white/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="block text-white font-extrabold text-base leading-tight">Dallas Siding</span>
                        <span className="block text-orange-400 font-semibold text-xs tracking-widest uppercase">Experts</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="text-white/70 hover:text-white p-1"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                    {siteData.navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-blue-100 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-base"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-8 border-t border-white/10">
                    <a
                      href={admin.phoneRaw}
                      className="btn-orange w-full justify-center text-base py-3.5"
                    >
                      <Phone className="w-5 h-5" />
                      Call {admin.phone}
                    </a>
                    <p className="text-blue-200 text-center text-sm mt-3">
                      Free estimates — No obligation
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

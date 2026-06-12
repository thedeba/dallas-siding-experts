import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Tag, ShieldAlert } from "lucide-react";
import blogs from "@/data/blogs.json";
import admin from "@/data/admin.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dallas Siding Blog | Siding Guides, Tips & Storm Advice",
  description: "Read expert siding articles, repair tips, and storm damage guides for homeowners in Dallas, Texas from Dallas Siding Experts.",
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-brand-gray pt-24 pb-20 lg:pt-32">
        {/* Banner */}
        <section className="relative py-16 lg:py-24 bg-brand-blue hero-pattern overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
              Guides & Advice
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Dallas Siding <span className="text-brand-orange">Blog</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Expert advice, buying guides, and maintenance tips to help protect and beautify your Dallas home.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <article
                key={post.slug}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover hover:border-brand-orange/20 flex flex-col"
              >
                {/* Visual Accent */}
                <div className="relative h-60 overflow-hidden bg-brand-blue-mid flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent" />
                </div>

                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue font-bold px-2.5 py-1 rounded-full">
                        <Tag className="w-3.5 h-3.5 text-brand-orange" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 group-hover:text-brand-orange transition-colors">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-brand-blue font-extrabold text-sm hover:text-brand-orange transition-colors group/link mt-auto"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Notice */}
          <div className="mt-16 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-brand-blue font-bold text-base">Have Siding Damage or Storm Concerns?</h3>
                <p className="text-gray-500 text-xs mt-0.5">Don't wait for minor leaks to become structural failures. Call us for a free assessment.</p>
              </div>
            </div>
            <a
              href={admin.phoneRaw}
              className="btn-orange text-sm py-3 px-6 whitespace-nowrap"
            >
              Call {admin.phone}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

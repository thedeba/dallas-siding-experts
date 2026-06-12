import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import blogs from "@/data/blogs.json";

export default function LatestBlogs() {
  // Take the 3 most recent blogs
  const recentBlogs = blogs.slice(0, 3);

  return (
    <section id="latest-blogs" className="py-20 lg:py-28 bg-white border-t border-gray-100" aria-labelledby="latest-blogs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div className="text-left">
            <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
              Learn From The Pros
            </span>
            <h2 id="latest-blogs-heading" className="section-heading">
              Latest Siding <span className="text-brand-orange">Insights & Advice</span>
            </h2>
            <p className="section-subheading max-w-xl mt-3">
              Guides and maintenance tips from our certified Dallas contractors.
            </p>
          </div>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-mid text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-lg"
            >
              View All Guides
              <ArrowRight className="w-4 h-4 text-brand-orange" />
            </Link>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBlogs.map((post) => (
            <article
              key={post.slug}
              className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm card-hover hover:border-brand-orange/20 transition-all duration-300 flex flex-col"
            >
              {/* Card Image Header */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-brand-blue-mid flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between flex-grow min-h-[260px]">
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3.5">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue font-bold px-2 py-0.5 rounded-full">
                      <Tag className="w-3.5 h-3.5 text-brand-orange" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-blue mb-2.5 group-hover:text-brand-orange transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-brand-blue font-bold text-xs uppercase tracking-wider hover:text-brand-orange transition-colors group/link mt-auto"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-brand-orange" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

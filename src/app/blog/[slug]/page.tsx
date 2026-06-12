import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, PhoneCall, CheckCircle2 } from "lucide-react";
import blogs from "@/data/blogs.json";
import admin from "@/data/admin.json";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for each post dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Dallas Siding Experts`,
    description: post.excerpt,
  };
}

// Pre-render blog detail paths
export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find other posts for the "Read More" sidebar
  const otherPosts = blogs.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />

      <main id="main-content" className="flex-grow bg-brand-gray pt-24 pb-20 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button & Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-orange transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <nav className="text-xs text-gray-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/blog" className="hover:underline">Blog</Link> &gt;{" "}
              <span className="text-gray-600 font-medium truncate max-w-[200px] inline-block align-bottom">
                {post.title}
              </span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Article Content */}
            <article className="lg:col-span-2 bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm">
              {/* Category Badge */}
              <span className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue font-bold text-xs px-3 py-1.5 rounded-full mb-4">
                <Tag className="w-3.5 h-3.5 text-brand-orange" />
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue leading-tight mb-4">
                {post.title}
              </h1>

              {/* Author & Date metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6 mb-8">
                <span className="font-semibold text-brand-blue">{post.author}</span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {post.date}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {post.readTime}
                </span>
              </div>

              {/* Featured Cover Image */}
              {post.image && (
                <div className="relative w-full h-[240px] sm:h-[360px] rounded-2xl overflow-hidden mb-8 border border-gray-100 shadow-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Content body */}
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
                {post.content.map((paragraph, index) => {
                  // If line is a header markup e.g. "### Heading"
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-brand-blue pt-4">
                        {paragraph.replace("### ", "")}
                      </h2>
                    );
                  }
                  return (
                    <p key={index} className="text-base leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </article>

            {/* Sidebar widgets */}
            <aside className="space-y-6">
              {/* Call to Action card */}
              <div className="bg-[#0b1329] text-white rounded-2xl p-8 border border-white/10 text-center relative overflow-hidden hero-pattern">
                <div className="w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Need Siding Service in Dallas?</h3>
                <p className="text-blue-200 text-xs leading-relaxed mb-6">
                  Available Mon–Fri 7am–7pm and Sat 8am–5pm. Skip forms — speak to a local siding expert now.
                </p>
                <a
                  href={admin.phoneRaw}
                  className="block w-full btn-orange text-base py-3 px-4 justify-center shadow-lg shadow-orange-500/25 mb-4 rounded-lg"
                >
                  {admin.phone}
                </a>
                <div className="flex flex-col gap-2 items-center text-xs text-blue-200 pt-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Free Consultations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>100% Dallas Focus</span>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              {otherPosts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-brand-blue font-bold text-base mb-4 border-b border-gray-100 pb-2">
                    Other Articles
                  </h3>
                  <div className="space-y-4">
                    {otherPosts.map((other) => (
                      <div key={other.slug} className="group">
                        <Link
                          href={`/blog/${other.slug}`}
                          className="block font-semibold text-brand-blue group-hover:text-brand-orange transition-colors text-sm mb-1 leading-snug"
                        >
                          {other.title}
                        </Link>
                        <span className="text-xs text-gray-400">{other.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

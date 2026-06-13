import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: blog.blogId,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      date: blog.date,
      author: blog.author,
      category: blog.category,
      readTime: blog.readTime,
      image: blog.image,
      content:
        blog.content && typeof blog.content === "object"
          ? (blog.content as any).paragraphs || blog.content
          : [],
    });
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

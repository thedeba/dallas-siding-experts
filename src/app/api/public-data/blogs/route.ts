import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      blogs.map((blog) => ({
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
      }))
    );
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

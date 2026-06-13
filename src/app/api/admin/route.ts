import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Helper to check authorization
function isAuthorized(req: NextRequest): boolean {
  const password = req.headers.get("x-admin-password");
  return password === "admin";
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const company = await prisma.company.findFirst();
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    const siteDataRows = await prisma.siteData.findMany();

    // Convert siteData array back to object format
    const siteData: Record<string, any> = {};
    siteDataRows.forEach((row) => {
      siteData[row.key] = row.value;
    });

    return NextResponse.json({
      admin: company,
      blogs: blogs.map((blog) => ({
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
      })),
      siteData,
    });
  } catch (error: any) {
    console.error("Error reading database:", error);
    return NextResponse.json(
      { error: "Failed to read database: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, data } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }

    if (action === "update-admin") {
      const company = await prisma.company.findFirst();
      if (company) {
        await prisma.company.update({
          where: { id: company.id },
          data: {
            companyName: data.companyName,
            phone: data.phone,
            phoneRaw: data.phoneRaw,
            email: data.email,
            address: data.address,
            hours: data.hours,
            serviceArea: data.serviceArea,
            yearEstablished: data.yearEstablished,
          },
        });
      }
      return NextResponse.json({
        success: true,
        message: "Settings updated successfully",
      });
    }

    if (action === "update-site-data") {
      // Delete existing site data
      await prisma.siteData.deleteMany();

      // Insert new site data
      for (const [key, value] of Object.entries(data)) {
        await prisma.siteData.create({
          data: {
            key,
            value: (typeof value === "string" ? { text: value } : value) as any,
          },
        });
      }
      return NextResponse.json({
        success: true,
        message: "Homepage sections updated successfully",
      });
    }

    if (action === "save-blog") {
      const blogData = {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author,
        category: data.category,
        readTime: data.readTime,
        image: data.image,
        content: Array.isArray(data.content)
          ? { paragraphs: data.content }
          : data.content,
      };

      const existingBlog = await prisma.blog.findFirst({
        where: {
          OR: [{ blogId: data.id }, { slug: data.slug }],
        },
      });

      if (existingBlog) {
        await prisma.blog.update({
          where: { id: existingBlog.id },
          data: { ...blogData, blogId: data.id },
        });
      } else {
        await prisma.blog.create({
          data: { ...blogData, blogId: data.id },
        });
      }
      return NextResponse.json({
        success: true,
        message: "Blog saved successfully",
      });
    }

    if (action === "delete-blog") {
      await prisma.blog.deleteMany({
        where: { slug: data.slug },
      });
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    }

    return NextResponse.json(
      { error: "Unknown action" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error writing database:", error);
    return NextResponse.json(
      { error: "Failed to write database: " + error.message },
      { status: 500 }
    );
  }
}

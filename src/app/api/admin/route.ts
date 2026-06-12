import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Helper to check authorization
function isAuthorized(req: NextRequest): boolean {
  const password = req.headers.get("x-admin-password");
  return password === "admin";
}

const dataPaths = {
  admin: path.join(process.cwd(), "src", "data", "admin.json"),
  blogs: path.join(process.cwd(), "src", "data", "blogs.json"),
  siteData: path.join(process.cwd(), "src", "data", "siteData.json"),
};

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminContent = await fs.readFile(dataPaths.admin, "utf8");
    const blogsContent = await fs.readFile(dataPaths.blogs, "utf8");
    const siteDataContent = await fs.readFile(dataPaths.siteData, "utf8");

    return NextResponse.json({
      admin: JSON.parse(adminContent),
      blogs: JSON.parse(blogsContent),
      siteData: JSON.parse(siteDataContent),
    });
  } catch (error: any) {
    console.error("Error reading database files:", error);
    return NextResponse.json({ error: "Failed to read database files: " + error.message }, { status: 500 });
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
      return NextResponse.json({ error: "Action is required" }, { status: 400 });
    }

    if (action === "update-admin") {
      await fs.writeFile(dataPaths.admin, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Settings updated successfully" });
    }

    if (action === "update-site-data") {
      await fs.writeFile(dataPaths.siteData, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Homepage sections updated successfully" });
    }

    if (action === "save-blog") {
      const blogsContent = await fs.readFile(dataPaths.blogs, "utf8");
      const blogs = JSON.parse(blogsContent) as any[];

      const updatedBlog = data;
      const index = blogs.findIndex((b) => b.id === updatedBlog.id || b.slug === updatedBlog.slug);

      if (index > -1) {
        blogs[index] = { ...blogs[index], ...updatedBlog };
      } else {
        blogs.unshift(updatedBlog); // Put new blogs at the top
      }

      await fs.writeFile(dataPaths.blogs, JSON.stringify(blogs, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Blog saved successfully" });
    }

    if (action === "delete-blog") {
      const blogsContent = await fs.readFile(dataPaths.blogs, "utf8");
      const blogs = JSON.parse(blogsContent) as any[];

      const targetSlug = data.slug;
      const filteredBlogs = blogs.filter((b) => b.slug !== targetSlug);

      await fs.writeFile(dataPaths.blogs, JSON.stringify(filteredBlogs, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Blog deleted successfully" });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("Error writing database files:", error);
    return NextResponse.json({ error: "Failed to write database: " + error.message }, { status: 500 });
  }
}

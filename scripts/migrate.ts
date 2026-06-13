import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function migrate() {
  try {
    console.log("🚀 Starting data migration to NeonDB...");

    // Read JSON data files
    const adminPath = path.join(process.cwd(), "src/data/admin.json");
    const blogsPath = path.join(process.cwd(), "src/data/blogs.json");
    const siteDataPath = path.join(process.cwd(), "src/data/siteData.json");

    const adminData = JSON.parse(fs.readFileSync(adminPath, "utf-8"));
    const blogsData = JSON.parse(fs.readFileSync(blogsPath, "utf-8"));
    const siteData = JSON.parse(fs.readFileSync(siteDataPath, "utf-8"));

    // Migrate company data
    console.log("📝 Migrating company data...");
    await prisma.company.deleteMany();
    await prisma.company.create({
      data: {
        companyName: adminData.companyName,
        phone: adminData.phone,
        phoneRaw: adminData.phoneRaw,
        email: adminData.email,
        address: adminData.address,
        hours: adminData.hours,
        serviceArea: adminData.serviceArea,
        yearEstablished: adminData.yearEstablished,
      },
    });
    console.log("✅ Company data migrated");

    // Migrate site data
    console.log("📝 Migrating site configuration...");
    await prisma.siteData.deleteMany();
    for (const [key, value] of Object.entries(siteData)) {
      await prisma.siteData.create({
        data: {
          key,
          value: (typeof value === "string" ? { text: value } : value) as any,
        },
      });
    }
    console.log("✅ Site configuration migrated");

    // Migrate blogs
    console.log("📝 Migrating blog posts...");
    await prisma.blog.deleteMany();
    for (const blog of blogsData) {
      await prisma.blog.create({
        data: {
          blogId: blog.id,
          slug: blog.slug,
          title: blog.title,
          excerpt: blog.excerpt,
          date: blog.date,
          author: blog.author,
          category: blog.category,
          readTime: blog.readTime,
          image: blog.image,
          content: Array.isArray(blog.content)
            ? { paragraphs: blog.content }
            : blog.content,
        },
      });
    }
    console.log(`✅ ${blogsData.length} blog posts migrated`);

    console.log("🎉 Migration completed successfully!");
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

migrate();

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const siteDataRows = await prisma.siteData.findMany();

    // Convert to object format
    const siteData: Record<string, any> = {};
    siteDataRows.forEach((row) => {
      siteData[row.key] = row.value;
    });

    return NextResponse.json(siteData);
  } catch (error: any) {
    console.error("Error fetching site data:", error);
    return NextResponse.json(
      { error: "Failed to fetch site data" },
      { status: 500 }
    );
  }
}

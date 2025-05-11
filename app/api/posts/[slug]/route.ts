import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  // Check if the slug is null or undefined and handle the error case
  if (!params.slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const slug = params.slug

  try {
    await prisma.post.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

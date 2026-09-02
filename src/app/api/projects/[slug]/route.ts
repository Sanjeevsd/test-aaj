import { NextRequest, NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/projects-service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await new Promise((r) => setTimeout(r, 200));

  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

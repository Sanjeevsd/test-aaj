import { NextResponse } from "next/server";
import { getCompanyInfo } from "@/lib/projects-service";

export async function GET() {
  await new Promise((r) => setTimeout(r, 100));
  return NextResponse.json(getCompanyInfo());
}

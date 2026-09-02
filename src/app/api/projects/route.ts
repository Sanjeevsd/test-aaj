import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/projects-service";
import type { SearchFilters } from "@/lib/types";

export async function GET(request: NextRequest) {
  await new Promise((r) => setTimeout(r, 300));

  const params = request.nextUrl.searchParams;
  const filters: SearchFilters = {
    query: params.get("query") || undefined,
    area: params.get("area") || undefined,
    propertyType:
      (params.get("propertyType") as SearchFilters["propertyType"]) ||
      undefined,
    status: (params.get("status") as SearchFilters["status"]) || undefined,
    developer: params.get("developer") || undefined,
    minPrice: params.get("minPrice")
      ? Number(params.get("minPrice"))
      : undefined,
    maxPrice: params.get("maxPrice")
      ? Number(params.get("maxPrice"))
      : undefined,
    beds: params.get("beds") ? Number(params.get("beds")) : undefined,
    sortBy: (params.get("sortBy") as SearchFilters["sortBy"]) || undefined,
  };

  const featuredOnly = params.get("featured") === "true";
  const result = getProjects(filters, featuredOnly);
  return NextResponse.json(result);
}

import { projects, companyInfo } from "@/data/projects";
import type { CompanyInfo, Project, SearchFilters } from "@/lib/types";

export function getProjects(
  filters: SearchFilters = {},
  featuredOnly = false
): Project[] {
  let result = [...projects];

  if (featuredOnly) {
    result = result.filter((p) => p.featured);
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.area) {
    result = result.filter(
      (p) => p.area.toLowerCase() === filters.area!.toLowerCase()
    );
  }

  if (filters.propertyType) {
    result = result.filter((p) => p.propertyType === filters.propertyType);
  }

  if (filters.status) {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.developer) {
    result = result.filter(
      (p) => p.developer.toLowerCase() === filters.developer!.toLowerCase()
    );
  }

  if (filters.minPrice) {
    result = result.filter((p) => p.priceFrom >= filters.minPrice!);
  }

  if (filters.maxPrice) {
    result = result.filter((p) => p.priceFrom <= filters.maxPrice!);
  }

  if (filters.beds !== undefined) {
    result = result.filter((p) =>
      p.unitTypes.some((u) => u.beds === filters.beds)
    );
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.priceFrom - b.priceFrom);
      break;
    case "price-desc":
      result.sort((a, b) => b.priceFrom - a.priceFrom);
      break;
    case "handover":
      result.sort((a, b) => a.handoverDate.localeCompare(b.handoverDate));
      break;
    case "newest":
    default:
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return result;
}

export function getFeaturedProjects(): Project[] {
  return getProjects({}, true);
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getCompanyInfo(): CompanyInfo {
  return companyInfo;
}

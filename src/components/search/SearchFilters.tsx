"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { areas, developers } from "@/data/projects";
import type { SearchFilters } from "@/lib/types";

export function SearchFiltersPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMobile, setShowMobile] = useState(false);

  const current: SearchFilters = {
    query: searchParams.get("query") || undefined,
    area: searchParams.get("area") || undefined,
    propertyType:
      (searchParams.get("propertyType") as SearchFilters["propertyType"]) ||
      undefined,
    status:
      (searchParams.get("status") as SearchFilters["status"]) || undefined,
    developer: searchParams.get("developer") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    beds: searchParams.get("beds")
      ? Number(searchParams.get("beds"))
      : undefined,
    sortBy:
      (searchParams.get("sortBy") as SearchFilters["sortBy"]) || "newest",
  };

  const [filters, setFilters] = useState<SearchFilters>(current);

  const applyFilters = useCallback(
    (newFilters: SearchFilters) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.set(key, String(value));
        }
      });
      router.push(`/search?${params.toString()}`);
      setShowMobile(false);
    },
    [router]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyFilters(filters);
  }

  function clearFilters() {
    const cleared: SearchFilters = { sortBy: "newest" };
    setFilters(cleared);
    router.push("/search");
    setShowMobile(false);
  }

  const activeCount = Object.entries(current).filter(
    ([key, v]) => v !== undefined && key !== "sortBy"
  ).length;

  const filterForm = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Search
        </label>
        <div className="relative mt-1.5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Project name, location..."
            value={filters.query || ""}
            onChange={(e) =>
              setFilters({ ...filters, query: e.target.value || undefined })
            }
            className="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Area
        </label>
        <select
          value={filters.area || ""}
          onChange={(e) =>
            setFilters({ ...filters, area: e.target.value || undefined })
          }
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
        >
          <option value="">All Areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Property Type
        </label>
        <select
          value={filters.propertyType || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              propertyType:
                (e.target.value as SearchFilters["propertyType"]) || undefined,
            })
          }
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="townhouse">Townhouse</option>
          <option value="penthouse">Penthouse</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Status
        </label>
        <select
          value={filters.status || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: (e.target.value as SearchFilters["status"]) || undefined,
            })
          }
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="off-plan">Off-Plan</option>
          <option value="under-construction">Under Construction</option>
          <option value="ready">Ready</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Developer
        </label>
        <select
          value={filters.developer || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              developer: e.target.value || undefined,
            })
          }
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
        >
          <option value="">All Developers</option>
          {developers.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Bedrooms
        </label>
        <select
          value={filters.beds ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              beds: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
        >
          <option value="">Any</option>
          <option value="0">Studio</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
          <option value="3">3 Beds</option>
          <option value="4">4 Beds</option>
          <option value="5">5+ Beds</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Min Price (AED)
          </label>
          <input
            type="number"
            placeholder="500,000"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Max Price (AED)
          </label>
          <input
            type="number"
            placeholder="10,000,000"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Sort By
        </label>
        <select
          value={filters.sortBy || "newest"}
          onChange={(e) =>
            setFilters({
              ...filters,
              sortBy: e.target.value as SearchFilters["sortBy"],
            })
          }
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="handover">Handover Date</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-accent py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          Clear
        </button>
      </div>
    </form>
  );

  return (
    <>
      <button
        onClick={() => setShowMobile(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-background">
            {activeCount}
          </span>
        )}
      </button>

      {showMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowMobile(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowMobile(false)}>
                <X className="h-5 w-5 text-muted" />
              </button>
            </div>
            {filterForm}
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border/50 bg-surface p-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="mt-4">{filterForm}</div>
        </div>
      </div>
    </>
  );
}

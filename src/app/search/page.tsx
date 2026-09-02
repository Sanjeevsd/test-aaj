import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchFiltersPanel } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search Properties | AAJ Property LLC",
  description:
    "Search and filter off-plan and ready properties across Dubai.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Search Properties</h1>
        <p className="mt-2 text-muted">
          Find your perfect property from our curated collection of Dubai
          developments
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-80">
          <Suspense>
            <SearchFiltersPanel />
          </Suspense>
        </aside>

        <div className="flex-1">
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="skeleton aspect-[4/5] rounded-2xl"
                  />
                ))}
              </div>
            }
          >
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

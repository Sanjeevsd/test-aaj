"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/projects/PropertyCard";
import type { Project, SearchFilters } from "@/lib/types";

export function SearchResults() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = new URLSearchParams();
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
      if (!params.has("sortBy")) params.set("sortBy", "newest");

      try {
        const res = await fetch(`/api/projects?${params.toString()}`);
        const data = await res.json();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="skeleton aspect-[4/5] rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-surface py-16 text-center">
        <p className="text-lg font-semibold">No projects found</p>
        <p className="mt-2 text-sm text-muted">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        {projects.length} project{projects.length !== 1 ? "s" : ""} found
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <PropertyCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

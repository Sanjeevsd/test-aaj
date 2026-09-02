"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { areas } from "@/data/projects";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (area) params.set("area", area);
    if (propertyType) params.set("propertyType", propertyType);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-3xl"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-surface/80 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5">
        <div className="flex flex-1 items-center gap-2 px-3 sm:border-r sm:border-border/50">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            type="text"
            placeholder="Search projects, areas, developers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>

        <div className="flex flex-1 items-center gap-2 px-3 sm:border-r sm:border-border/50">
          <MapPin className="h-4 w-4 shrink-0 text-muted" />
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full cursor-pointer bg-transparent py-2.5 text-sm text-foreground focus:outline-none"
          >
            <option value="" className="bg-surface">
              All Areas
            </option>
            {areas.map((a) => (
              <option key={a} value={a} className="bg-surface">
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-1 items-center gap-2 px-3">
          <Home className="h-4 w-4 shrink-0 text-muted" />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full cursor-pointer bg-transparent py-2.5 text-sm text-foreground focus:outline-none"
          >
            <option value="" className="bg-surface">
              All Types
            </option>
            <option value="apartment" className="bg-surface">
              Apartment
            </option>
            <option value="villa" className="bg-surface">
              Villa
            </option>
            <option value="townhouse" className="bg-surface">
              Townhouse
            </option>
            <option value="penthouse" className="bg-surface">
              Penthouse
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover sm:rounded-full"
        >
          <DollarSign className="h-4 w-4" />
          Search
        </button>
      </div>
    </motion.form>
  );
}

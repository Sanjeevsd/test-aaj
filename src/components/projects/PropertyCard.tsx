"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Building2, Calendar, MapPin, Maximize } from "lucide-react";
import type { Project } from "@/lib/types";
import { formatPrice } from "@/lib/api";

interface PropertyCardProps {
  project: Project;
  index?: number;
}

export function PropertyCard({ project, index = 0 }: PropertyCardProps) {
  const minBeds = Math.min(...project.unitTypes.map((u) => u.beds));
  const maxBeds = Math.max(...project.unitTypes.map((u) => u.beds));
  const bedsLabel =
    minBeds === maxBeds
      ? minBeds === 0
        ? "Studio"
        : `${minBeds} Bed`
      : minBeds === 0
        ? `Studio - ${maxBeds} Bed`
        : `${minBeds} - ${maxBeds} Bed`;

  const statusColors: Record<string, string> = {
    "off-plan": "bg-accent/20 text-accent",
    "under-construction": "bg-blue-500/20 text-blue-400",
    ready: "bg-green-500/20 text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <article className="overflow-hidden rounded-2xl border border-border/50 bg-surface transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute left-3 top-3 flex gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusColors[project.status]}`}
              >
                {project.status.replace("-", " ")}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-lg font-bold text-foreground drop-shadow-lg">
                From {formatPrice(project.priceFrom)}
              </p>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
              {project.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {project.location}, {project.area}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-4 border-t border-border/50 pt-3 text-xs text-muted">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {bedsLabel}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {project.propertyType}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {project.handoverDate}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted">{project.developer}</span>
              <span className="flex items-center gap-1 text-xs text-accent">
                <Maximize className="h-3 w-3" />
                View Details
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

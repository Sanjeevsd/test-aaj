"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/types";
import { formatPrice } from "@/lib/api";

interface FeaturedCarouselProps {
  projects: Project[];
}

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative mx-2 block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      Off-Plan
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-foreground">
                      {project.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-accent">
                      From {formatPrice(project.priceFrom)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur-sm transition-colors hover:bg-surface-elevated"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur-sm transition-colors hover:bg-surface-elevated"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-4 flex justify-center gap-1.5">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selectedIndex
                ? "w-6 bg-accent"
                : "w-1.5 bg-border hover:bg-muted"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

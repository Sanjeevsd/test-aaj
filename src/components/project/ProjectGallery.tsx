"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  name: string;
}

export function ProjectGallery({ images, name }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function goNext() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  function goPrev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`${name} - Image ${activeIndex + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setLightbox(true)}
            className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
          >
            <Expand className="h-3.5 w-3.5" />
            View All
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all ${
                  i === activeIndex
                    ? "ring-2 ring-accent"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 rounded-full bg-surface p-2 text-foreground"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={name}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-surface p-3"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-surface p-3"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

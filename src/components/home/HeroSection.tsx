"use client";

import { motion } from "framer-motion";
import { HeroSearch } from "@/components/home/HeroSearch";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-muted)_0%,_transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Dubai&apos;s Premier Real Estate
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Find Your Dream{" "}
            <span className="text-accent">Property</span> in Dubai
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted sm:text-xl"
          >
            Explore exclusive off-plan projects from top developers. Your
            trusted partner for Dubai real estate investment.
          </motion.p>
        </div>

        <div className="mx-auto mt-10 flex justify-center">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

export function HeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-surface-elevated hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/search"
          className="ml-3 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
        >
          Explore Projects
        </Link>
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground md:hidden"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-16 border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:bg-surface-elevated hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-background"
              >
                Explore Projects
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

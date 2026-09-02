import Link from "next/link";
import { Building2, Menu, X } from "lucide-react";
import { HeaderClient } from "./HeaderClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Properties" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20 transition-colors group-hover:bg-accent/20">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide text-foreground">
              AAJ Property
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted">
              LLC
            </span>
          </div>
        </Link>

        <HeaderClient navLinks={navLinks} />
      </div>
    </header>
  );
}

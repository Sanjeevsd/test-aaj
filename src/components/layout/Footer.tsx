import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
                <Building2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">AAJ Property LLC</p>
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  Dubai Real Estate
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Your trusted partner for off-plan and ready properties across
              Dubai. Guiding you from discovery to handover.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/search", label: "Properties" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Property Types
            </h3>
            <ul className="mt-4 space-y-2">
              {["Apartments", "Villas", "Townhouses", "Penthouses"].map(
                (type) => (
                  <li key={type}>
                    <Link
                      href={`/search?propertyType=${type.toLowerCase().slice(0, -1)}`}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {type}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Office 1204, Bay Square, Business Bay, Dubai
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                +971 4 123 4567
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                info@aajproperty.ae
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} AAJ Property LLC. All rights
            reserved.
          </p>
          <p className="text-xs text-muted">
            RERA ORN: 12345 | BRN: 67890
          </p>
        </div>
      </div>
    </footer>
  );
}

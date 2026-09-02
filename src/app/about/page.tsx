import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Target,
  Heart,
  Handshake,
} from "lucide-react";
import { getCompanyInfo } from "@/lib/projects-service";

export const metadata: Metadata = {
  title: "About Us | AAJ Property LLC",
  description:
    "Learn about AAJ Property LLC — your trusted Dubai real estate partner since 2019.",
};

const valueIcons = [Shield, Target, Heart, Handshake];

export default async function AboutPage() {
  const company = getCompanyInfo();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-muted)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            About Us
          </span>
          <h1 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {company.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            {company.tagline}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
            <p className="mt-4 leading-relaxed text-muted">
              {company.description}
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Founded in {company.founded}, we have grown from a boutique
              consultancy to one of Dubai&apos;s most trusted real estate
              advisory firms. Our team combines local market expertise with
              international standards of service.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {company.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-surface p-4 text-center"
                >
                  <p className="text-2xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80"
              alt="Dubai skyline"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Our Values</h2>
            <p className="mt-2 text-muted">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {company.values.map((value, i) => {
              const Icon = valueIcons[i] || Shield;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border/50 bg-background p-6"
                >
                  <Icon className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Meet Our Team</h2>
          <p className="mt-2 text-muted">
            Experienced professionals dedicated to your success
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {company.team.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-2xl border border-border/50 bg-surface"
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-accent">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border/50 bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Building2 className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 text-2xl font-bold">Get in Touch</h2>
          <p className="mt-2 text-muted">
            Ready to start your property journey? We&apos;d love to hear from
            you.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted">
            <p className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              {company.address}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              {company.phone}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              {company.email}
            </p>
          </div>
          <Link
            href="/search"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    </div>
  );
}

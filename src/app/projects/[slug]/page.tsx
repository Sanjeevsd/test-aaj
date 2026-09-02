import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  Bed,
  Building2,
  Calendar,
  Check,
  MapPin,
  Maximize,
  Phone,
  Mail,
} from "lucide-react";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { MortgageCalculator } from "@/components/project/MortgageCalculator";
import { HandoverTimeline } from "@/components/project/HandoverTimeline";
import { PropertyCard } from "@/components/projects/PropertyCard";
import { getProjectBySlug, getProjects } from "@/lib/projects-service";
import { formatPrice, formatPriceFull } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} | AAJ Property LLC`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const related = getProjects({ area: project.area })
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const statusColors: Record<string, string> = {
    "off-plan": "bg-accent/20 text-accent",
    "under-construction": "bg-blue-500/20 text-blue-400",
    ready: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/search"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <ProjectGallery images={project.images} name={project.name} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusColors[project.status]}`}
            >
              {project.status.replace("-", " ")}
            </span>
            <span className="text-sm text-muted">{project.developer}</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {project.name}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-accent" />
            <span>
              {project.location}, {project.area}
            </span>
          </div>

          <p className="mt-2 text-2xl font-bold text-accent">
            From {formatPrice(project.priceFrom)}
            <span className="text-sm font-normal text-muted">
              {" "}
              — {formatPrice(project.priceTo)}
            </span>
          </p>

          <div className="mt-6 flex flex-wrap gap-4 rounded-xl border border-border/50 bg-surface p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted">Handover</p>
                <p className="text-sm font-medium">{project.handoverDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted">Type</p>
                <p className="text-sm font-medium capitalize">
                  {project.propertyType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="h-4 w-4 text-accent" />
              <div>
                <p className="text-xs text-muted">Progress</p>
                <p className="text-sm font-medium">
                  {project.completionPercentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">About This Project</h2>
            <p className="mt-3 leading-relaxed text-muted">
              {project.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Unit Types & Pricing</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted">
                    <th className="pb-3 pr-4 font-medium">Type</th>
                    <th className="pb-3 pr-4 font-medium">Beds</th>
                    <th className="pb-3 pr-4 font-medium">Baths</th>
                    <th className="pb-3 pr-4 font-medium">Size</th>
                    <th className="pb-3 font-medium">Price From</th>
                  </tr>
                </thead>
                <tbody>
                  {project.unitTypes.map((unit, i) => (
                    <tr
                      key={i}
                      className="border-b border-border/50 transition-colors hover:bg-surface"
                    >
                      <td className="py-3 pr-4">
                        {unit.beds === 0 ? "Studio" : `${unit.beds} Bedroom`}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5 text-muted" />
                          {unit.beds === 0 ? "Studio" : unit.beds}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-1">
                          <Bath className="h-3.5 w-3.5 text-muted" />
                          {unit.baths}
                        </span>
                      </td>
                      <td className="py-3 pr-4">{unit.sqft.toLocaleString()} sqft</td>
                      <td className="py-3 font-medium text-accent">
                        {formatPriceFull(unit.priceFrom)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Features</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.amenities.map((amenity) => (
                <span
                  key={amenity.name}
                  className="rounded-full border border-border/50 bg-surface px-4 py-2 text-sm text-muted"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-border/50 bg-surface p-6">
              <h3 className="text-lg font-semibold">Interested?</h3>
              <p className="mt-1 text-sm text-muted">
                Contact our team for a private viewing or more details.
              </p>
              <div className="mt-4 space-y-3">
                <a
                  href="tel:+97141234567"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
                <a
                  href="mailto:info@aajproperty.ae"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-semibold transition-colors hover:bg-surface-elevated"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>

            <HandoverTimeline
              handoverDate={project.handoverDate}
              completionPercentage={project.completionPercentage}
              paymentPlan={project.paymentPlan}
            />

            <MortgageCalculator priceFrom={project.priceFrom} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-12">
          <h2 className="text-xl font-semibold">Similar Projects</h2>
          <p className="mt-1 text-sm text-muted">
            Other developments in {project.area}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PropertyCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

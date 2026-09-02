import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { PropertyCard } from "@/components/projects/PropertyCard";
import { getFeaturedProjects, getProjects } from "@/lib/projects-service";

export default async function HomePage() {
  const [featured, allProjects] = await Promise.all([
    Promise.resolve(getFeaturedProjects()),
    Promise.resolve(getProjects({ sortBy: "newest" })),
  ]);

  const latestProjects = allProjects.slice(0, 6);

  return (
    <>
      <HeroSection />

      <section className="border-y border-border/50 bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { icon: Building2, value: "500+", label: "Properties Sold" },
            { icon: Users, value: "1,200+", label: "Happy Clients" },
            { icon: Star, value: "25+", label: "Developer Partners" },
            { icon: TrendingUp, value: "7+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto h-6 w-6 text-accent" />
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Featured Off-Plan Projects
            </h2>
            <p className="mt-2 text-muted">
              Handpicked premium developments across Dubai
            </p>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover sm:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <FeaturedCarousel projects={featured} />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Latest Projects
              </h2>
              <p className="mt-2 text-muted">
                Newly launched developments you don&apos;t want to miss
              </p>
            </div>
            <Link
              href="/search?sortBy=newest"
              className="hidden items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((project, i) => (
              <PropertyCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Why AAJ Property?</h2>
          <p className="mt-2 text-muted">
            Your trusted partner for Dubai real estate
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Shield,
              title: "RERA Licensed",
              desc: "Fully licensed and regulated by Dubai's Real Estate Regulatory Agency.",
            },
            {
              icon: Building2,
              title: "Top Developers",
              desc: "Exclusive partnerships with Emaar, Damac, Sobha, and more.",
            },
            {
              icon: TrendingUp,
              title: "Investment Focus",
              desc: "Data-driven advice to maximize your property investment returns.",
            },
            {
              icon: Users,
              title: "End-to-End Support",
              desc: "From property search to handover and beyond.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/50 bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <item.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Invest in Dubai?
          </h2>
          <p className="mt-3 text-muted">
            Get in touch with our expert advisors for personalized property
            recommendations.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/search"
              className="rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Browse Properties
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

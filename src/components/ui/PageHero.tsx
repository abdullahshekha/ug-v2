import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ breadcrumb, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-grey pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e0a9aa 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative px-4 sm:px-8 lg:px-12">
        <nav className="flex items-center gap-2 text-sm text-white">
          <Link href="/" className="transition-colors hover:text-mist">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-bold">{breadcrumb}</span>
        </nav>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

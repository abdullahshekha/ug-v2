import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ breadcrumb, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-plaster-900 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e0a9aa 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-plaster-400">
          <Link href="/" className="transition-colors hover:text-brand-300">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-brand-300">{breadcrumb}</span>
        </nav>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-plaster-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

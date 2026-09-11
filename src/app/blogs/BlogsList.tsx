"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Blog } from "@/app/blogs/data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogsList({
  blogs,
  categories,
}: {
  blogs: Blog[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...categories];

  const shown = useMemo(
    () => (active === "All" ? blogs : blogs.filter((b) => b.category === active)),
    [active, blogs],
  );

  const [featured, ...rest] = shown;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${
              active === t
                ? "border-red bg-red text-white"
                : "border-warm bg-white text-grey hover:border-red hover:text-red"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/blogs/${featured.slug}/`}
          className="group mt-10 grid overflow-hidden rounded-3xl border border-warm bg-white shadow-plaster transition-transform hover:-translate-y-1 lg:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden bg-mist lg:aspect-auto">
            <Image
              src={featured.featuredImage}
              alt={featured.title}
              width={1024}
              height={640}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-grey">
              <span className="rounded-full bg-red px-3 py-1 text-[10px] uppercase tracking-wide text-white">
                {featured.category}
              </span>
              <span>{formatDate(featured.date)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {featured.readTime}
              </span>
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-grey group-hover:text-red sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-grey">
              {featured.metaDescription}
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-red">
              Read the article
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-3xl border border-warm bg-white shadow-plaster transition-transform hover:-translate-y-1"
          >
            <Link href={`/blogs/${post.slug}/`} className="block">
              <div className="aspect-[2/1] overflow-hidden bg-mist">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1024}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-grey">
                <span>{post.category}</span>
                <span>&middot;</span>
                <span>{formatDate(post.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </p>
              <h2 className="mt-2 text-base font-extrabold leading-snug text-grey group-hover:text-red">
                <Link href={`/blogs/${post.slug}/`}>{post.title}</Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-grey">
                {post.metaDescription}
              </p>
              <Link
                href={`/blogs/${post.slug}/`}
                className="mt-4 text-sm font-bold text-red"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-sm text-grey">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}

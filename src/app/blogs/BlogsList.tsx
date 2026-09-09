"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
                ? "border-brand-800 bg-brand-800 text-white"
                : "border-warm bg-white text-plaster-700 hover:border-brand-300 hover:text-brand-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-3xl border border-warm bg-white shadow-plaster transition-transform hover:-translate-y-1"
          >
            <Link href={`/blogs/${post.slug}/`} className="block">
              <div className="aspect-[2/1] overflow-hidden bg-plaster-100">
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
              <p className="text-xs font-bold text-plaster-500">
                {post.category} &middot; {formatDate(post.date)} &middot;{" "}
                {post.author}
              </p>
              <h2 className="mt-2 text-base font-extrabold leading-snug text-plaster-800 group-hover:text-brand-800">
                <Link href={`/blogs/${post.slug}/`}>{post.title}</Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-plaster-600">
                {post.metaDescription}
              </p>
              <Link
                href={`/blogs/${post.slug}/`}
                className="mt-4 text-sm font-bold text-brand-800"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-sm text-plaster-500">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}

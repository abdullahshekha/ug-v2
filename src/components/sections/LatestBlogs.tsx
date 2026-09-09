import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { latestBlogs } from "@/app/blogs/data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LatestBlogs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="From the journal" title="Read the latest blogs" />
          <Link
            href="/blogs/"
            className="text-sm font-bold text-brand-800 transition-colors hover:text-brand-900"
          >
            View all articles
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestBlogs.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-warm bg-plaster-50 shadow-plaster transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[2/1] overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1024}
                  height={512}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold text-plaster-500">
                  {post.category} &middot; {formatDate(post.date)}
                </p>
                <h3 className="mt-2 flex-1 text-base font-extrabold leading-snug text-plaster-800 group-hover:text-brand-800">
                  {post.title}
                </h3>
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
      </div>
    </section>
  );
}

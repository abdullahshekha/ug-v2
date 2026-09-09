import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BlogArticle from "@/components/blog/BlogArticle";
import ProductCta from "@/components/products/ProductCta";
import { blogs, getBlogBySlug } from "../data";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | United Gypsum`,
    description: post.metaDescription,
    alternates: { canonical: `/blogs/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `https://www.unitedgypsum.com/blogs/${post.slug}/`,
      images: [{ url: post.featuredImage }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = blogs
    .filter((b) => b.slug !== post.slug && b.category === post.category)
    .slice(0, 3);
  const fill = blogs
    .filter((b) => b.slug !== post.slug && !related.includes(b))
    .slice(0, 3 - related.length);
  const relatedPosts = [...related, ...fill];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: "United Gypsum (Pvt.) Ltd." },
    publisher: { "@type": "Organization", name: "United Gypsum (Pvt.) Ltd." },
    image: `https://www.unitedgypsum.com${post.featuredImage}`,
    mainEntityOfPage: `https://www.unitedgypsum.com/blogs/${post.slug}/`,
  };

  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="bg-plaster-900 pb-14 pt-32 sm:pb-16 sm:pt-40">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 text-sm text-plaster-400">
                <Link href="/" className="hover:text-brand-300">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blogs/" className="hover:text-brand-300">
                  Blog
                </Link>
              </nav>
              <p className="mt-6 text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-300">
                {post.category}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-plaster-300">
                {formatDate(post.date)} &middot; {post.author} &middot;{" "}
                {post.readTime}
              </p>
            </div>
          </header>

          <div className="bg-plaster-50">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
              <div className="overflow-hidden rounded-3xl border border-warm shadow-plaster">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1024}
                  height={512}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-10">
                <BlogArticle sections={post.sections} />
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-warm bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800">
                More from the journal
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blogs/${r.slug}/`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-warm bg-plaster-50 shadow-plaster transition-transform hover:-translate-y-1"
                  >
                    <div className="aspect-[2/1] overflow-hidden bg-plaster-100">
                      <Image
                        src={r.featuredImage}
                        alt={r.title}
                        width={800}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-bold text-plaster-500">
                        {r.category}
                      </p>
                      <h3 className="mt-1.5 flex-1 text-sm font-extrabold leading-snug text-plaster-800 group-hover:text-brand-800">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ProductCta
          heading="Building with gypsum systems?"
          body="Talk to United Gypsum about products, specifications and becoming a stockist."
        />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

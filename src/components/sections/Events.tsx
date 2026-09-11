import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { events, eventImages } from "@/lib/events";

const featured = events.filter((e) => e.imageCount > 0);

export default function Events() {
  return (
    <section className="bg-white">
      <div className="px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="On the ground"
            title="Events and exhibitions"
            lead="Where you'll find United Gypsum next, and where we've been."
          />
          <Link
            href="/events/"
            className="text-sm font-bold text-red transition-colors hover:text-grey"
          >
            View full gallery
          </Link>
        </div>

        <div className="mt-12 space-y-14">
          {featured.map((event) => {
            const images = eventImages(event.slug, event.imageCount).slice(0, 4);
            return (
              <article key={event.slug}>
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-red">
                      {event.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-grey">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location} &middot; {event.date}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-grey">
                      {event.summary}
                    </p>
                    {event.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {event.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm leading-relaxed text-grey"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red"
                              aria-hidden="true"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={`/events/#${event.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-grey transition-colors hover:text-red"
                    >
                      View the gallery
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {images.map((img, i) => (
                      <div
                        key={img.src}
                        className={`overflow-hidden rounded-2xl border border-warm ${
                          i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={800}
                          height={i === 0 ? 450 : 400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

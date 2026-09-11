import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { events, eventImages } from "@/lib/events";

const featured = events.filter((e) => e.imageCount > 0);

export default function Events() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((event) => {
            const images = eventImages(event.slug, event.imageCount).slice(0, 3);
            return (
              <article
                key={event.slug}
                className="flex flex-col overflow-hidden rounded-3xl border border-warm bg-mist shadow-plaster"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    width={800}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-red">
                    {event.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-grey">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location} &middot; {event.date}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-grey">
                    {event.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex -space-x-3">
                      {images.slice(1).map((img) => (
                        <span
                          key={img.src}
                          className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border-2 border-white"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={72}
                            height={72}
                            className="h-full w-full object-cover"
                          />
                        </span>
                      ))}
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-white bg-red text-[10px] font-bold text-white">
                        +{event.imageCount - images.length}
                      </span>
                    </div>

                    <Link
                      href={`/events/#${event.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-grey transition-colors hover:text-red"
                    >
                      Gallery
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
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

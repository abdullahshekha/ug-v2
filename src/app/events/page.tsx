import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCta from "@/components/products/ProductCta";
import DealerForm from "@/components/sections/DealerForm";
import { events, eventImages } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events & Exhibitions | United Gypsum",
  description:
    "United Gypsum takes part in construction exhibitions and trade events across Pakistan to share the advantages of gypsum systems. See photos from IAPEX 2026, IAPEX 2025 and past events.",
  alternates: { canonical: "/events/" },
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Events"
          title="Events and exhibitions"
          subtitle="We regularly take part in construction exhibitions and trade events to show how gypsum systems build faster, lighter and cleaner."
        />

        <section className="bg-mist">
          <div className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionHeading eyebrow="Where we have been" title="Past events" />

            <div className="mt-10 space-y-16">
              {events.map((event) => {
                const images = eventImages(event.slug, event.imageCount);
                return (
                  <article
                    key={event.slug}
                    id={event.slug}
                    className="scroll-mt-24 rounded-3xl border border-warm bg-white p-6 shadow-plaster sm:p-8"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red text-white">
                      <CalendarDays className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-xl font-extrabold text-red">
                      {event.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-grey">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location} &middot; {event.date}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-grey">
                      {event.summary}
                    </p>

                    {event.highlights.length > 0 && (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
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

                    {images.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {images.map((img) => (
                          <div
                            key={img.src}
                            className="aspect-square overflow-hidden rounded-xl border border-warm"
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              width={400}
                              height={400}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-warm bg-white">
          <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <SectionHeading eyebrow="Coming up" title="Upcoming events" />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-grey">
              No upcoming events are listed right now. Follow United Gypsum on
              social media, or contact our team to find out where we will be next.
            </p>
          </div>
        </section>

        <ProductCta
          heading="Want to meet the team?"
          body="Contact us to arrange a visit, a product demonstration or a specification session."
        />

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}

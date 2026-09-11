import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCta from "@/components/products/ProductCta";
import DealerForm from "@/components/sections/DealerForm";

export const metadata: Metadata = {
  title: "Events & Exhibitions | United Gypsum",
  description:
    "United Gypsum takes part in construction exhibitions and trade events across Pakistan to share the advantages of gypsum systems.",
  alternates: { canonical: "/events/" },
};

const pastEvents = [
  {
    name: "Build Asia Expo 2017",
    place: "Karachi Expo Centre",
    body: "United Gypsum exhibited its full product range and shared the advantages of gypsum systems with architects, contractors and specifiers from across the country.",
  },
];

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
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {pastEvents.map((e) => (
                <article
                  key={e.name}
                  className="rounded-3xl border border-warm bg-white p-6 shadow-plaster"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red text-white">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-red">
                    {e.name}
                  </h3>
                  <p className="text-xs font-bold text-grey">{e.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-grey">
                    {e.body}
                  </p>
                </article>
              ))}
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

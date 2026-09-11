import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Smartphone, Mail, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import DealerForm from "@/components/sections/DealerForm";

export const metadata: Metadata = {
  title: "Contact Us | United Gypsum",
  description:
    "Contact United Gypsum in Karachi. Landline +92 21 34123301-2, mobile +92 300 0566858, info@ and sales@unitedgypsum.com. Factory at Port Qasim.",
  alternates: { canonical: "/contact-us/" },
};

const MAP_SRC =
  "https://www.google.com/maps?q=NWIZ%20Port%20Qasim%20Karachi&output=embed";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Contact Us"
          title="Contact us"
          subtitle="Ask your query and one of our representatives will get back to you as soon as possible."
        />

        <section className="bg-mist">
          <div className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              {/* Details */}
              <div>
                <h2 className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
                  Contact details
                </h2>
                <dl className="mt-6 space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                    <div>
                      <dt className="font-bold text-grey">Landline</dt>
                      <dd className="mt-0.5 text-grey">
                        <a href="tel:+922134123301" className="hover:text-red">
                          +92 21 34123301
                        </a>
                        {", "}
                        <a href="tel:+922134123302" className="hover:text-red">
                          +92 21 34123302
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                    <div>
                      <dt className="font-bold text-grey">Mobile</dt>
                      <dd className="mt-0.5 text-grey">
                        <a href="tel:+923000566858" className="hover:text-red">
                          +92 300 0566858
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                    <div>
                      <dt className="font-bold text-grey">Email</dt>
                      <dd className="mt-0.5 space-y-0.5 text-grey">
                        <a
                          href="mailto:info@unitedgypsum.com"
                          className="block hover:text-red"
                        >
                          info@unitedgypsum.com
                        </a>
                        <a
                          href="mailto:sales@unitedgypsum.com"
                          className="block hover:text-red"
                        >
                          sales@unitedgypsum.com
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                    <div>
                      <dt className="font-bold text-grey">Hours</dt>
                      <dd className="mt-0.5 text-grey">
                        Mon to Sat, 9:00 AM to 6:00 PM
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                    <div>
                      <dt className="font-bold text-grey">Location</dt>
                      <dd className="mt-0.5 text-grey">
                        B-22, 23 &amp; 24 NWIZ, Port Qasim, Karachi, Sindh,
                        Pakistan.
                      </dd>
                    </div>
                  </div>
                </dl>

                <p className="mt-8 text-sm text-grey">
                  Looking to stock our products?{" "}
                  <Link href="/#dealer" className="font-bold text-red">
                    Become a dealer
                  </Link>
                  .
                </p>
              </div>

              {/* Form */}
              <ContactForm />
            </div>

            {/* Map */}
            <div className="mt-14 overflow-hidden rounded-3xl border border-warm shadow-plaster">
              <iframe
                title="United Gypsum location, Port Qasim, Karachi"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0"
              />
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import DistributorMap from "@/components/sections/DistributorMap";

const inputClass =
  "w-full rounded-xl border border-warm bg-white px-4 py-3 text-sm text-grey placeholder:text-grey focus:border-red focus:outline-none";

export default function DistributorForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Backend (SMTP + Sheets + reCAPTCHA) is wired in a later pass. The hidden
    // `website` honeypot below is already in place so that work is drop-in.
    setSubmitted(true);
  }

  return (
    <section id="distributor" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Become a Distributor"
              title="Partner with United Gypsum"
              lead="Feel free to ask your query and one of our representatives will get back to you as soon as possible. Tell us about your market and the products you want to carry."
            />
            <div className="mt-8 space-y-3 text-sm text-grey">
              <a
                href="tel:+922134123301"
                className="flex items-center gap-3 transition-colors hover:text-red"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-red" />
                +92 21 34123301-2
              </a>
              <a
                href="tel:+923000566858"
                className="flex items-center gap-3 transition-colors hover:text-red"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-red" />
                +92 300 0566858
              </a>
              <a
                href="mailto:sales@unitedgypsum.com"
                className="flex items-center gap-3 transition-colors hover:text-red"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-red" />
                sales@unitedgypsum.com
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0 text-red" />
                B-22, 23 &amp; 24 NWIZ, Port Qasim, Karachi, Sindh, Pakistan
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-warm bg-white p-6 shadow-plaster sm:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-start justify-center">
                <h3 className="text-lg font-extrabold text-grey">
                  Thanks, your details are ready to send.
                </h3>
                <p className="mt-2 text-sm text-grey">
                  Online submissions aren&apos;t connected yet. In the meantime,
                  email us at{" "}
                  <a
                    href="mailto:sales@unitedgypsum.com"
                    className="font-bold text-red underline"
                  >
                    sales@unitedgypsum.com
                  </a>{" "}
                  or call +92 21 34123301 and we&apos;ll pick it up right away.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-bold text-red"
                >
                  Edit the form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-grey">
                    Full name<span className="text-red">*</span>
                  </span>
                  <input required name="fullName" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-grey">
                    Company
                  </span>
                  <input name="company" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-grey">
                    Email
                  </span>
                  <input type="email" name="email" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-grey">
                    Phone<span className="text-red">*</span>
                  </span>
                  <input
                    required
                    name="phone"
                    defaultValue="+92 "
                    inputMode="tel"
                    className={inputClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-grey">
                    City
                  </span>
                  <input name="city" className={inputClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-grey">
                    Your query
                  </span>
                  <textarea name="query" rows={4} className={inputClass} />
                </label>

                {/* Honeypot: real users never see or fill this. */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-full bg-red px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-grey"
                  >
                    Send enquiry
                  </button>
                  <p className="mt-3 text-xs text-grey">
                    Online submissions aren&apos;t wired up yet. This form is a
                    preview.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-warm pt-16">
          <DistributorMap />
        </div>
      </div>
    </section>
  );
}

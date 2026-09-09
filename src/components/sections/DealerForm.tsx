"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

const inputClass =
  "w-full rounded-xl border border-warm bg-white px-4 py-3 text-sm text-plaster-800 placeholder:text-plaster-400 focus:border-brand-400 focus:outline-none";

export default function DealerForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Backend (SMTP + Sheets + reCAPTCHA) is wired in a later pass. The hidden
    // `website` honeypot below is already in place so that work is drop-in.
    setSubmitted(true);
  }

  return (
    <section id="dealer" className="scroll-mt-24 bg-plaster-100">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Become a dealer"
              title="Partner with United Gypsum"
              lead="Feel free to ask your query and one of our representatives will get back to you as soon as possible. Tell us about your market and the products you want to carry."
            />
            <div className="mt-8 space-y-1 text-sm text-plaster-600">
              <p>
                <span className="font-bold text-plaster-800">Landline:</span> +92
                21 34123301&ndash;2
              </p>
              <p>
                <span className="font-bold text-plaster-800">Mobile:</span> +92 300
                0566858
              </p>
              <p>
                <span className="font-bold text-plaster-800">Email:</span>{" "}
                sales@unitedgypsum.com
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-warm bg-plaster-50 p-6 shadow-plaster sm:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-start justify-center">
                <h3 className="text-lg font-extrabold text-plaster-800">
                  Thanks &mdash; your details are ready to send.
                </h3>
                <p className="mt-2 text-sm text-plaster-600">
                  Online submissions aren&apos;t connected yet. In the meantime,
                  email us at{" "}
                  <a
                    href="mailto:sales@unitedgypsum.com"
                    className="font-bold text-brand-800 underline"
                  >
                    sales@unitedgypsum.com
                  </a>{" "}
                  or call +92 21 34123301 and we&apos;ll pick it up right away.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-bold text-brand-800"
                >
                  Edit the form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-plaster-700">
                    Full name<span className="text-brand-700">*</span>
                  </span>
                  <input required name="fullName" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-plaster-700">
                    Company
                  </span>
                  <input name="company" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-plaster-700">
                    Email
                  </span>
                  <input type="email" name="email" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-plaster-700">
                    Phone<span className="text-brand-700">*</span>
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
                  <span className="mb-1.5 block text-xs font-bold text-plaster-700">
                    City
                  </span>
                  <input name="city" className={inputClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-plaster-700">
                    Your query
                  </span>
                  <textarea name="query" rows={4} className={inputClass} />
                </label>

                {/* Honeypot — real users never see or fill this. */}
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
                    className="inline-flex items-center rounded-full bg-brand-800 px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(124,29,31,0.28)] transition-transform hover:-translate-y-0.5"
                  >
                    Send enquiry
                  </button>
                  <p className="mt-3 text-xs text-plaster-500">
                    Online submissions aren&apos;t wired up yet &mdash; this form
                    is a preview.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

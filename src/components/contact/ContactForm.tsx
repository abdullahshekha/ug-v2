"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-warm bg-white px-4 py-3 text-sm text-plaster-800 placeholder:text-plaster-400 focus:border-brand-400 focus:outline-none";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Backend (SMTP + reCAPTCHA + /api/contact) is a later pass. The hidden
    // `website` honeypot is already here so that work is drop-in.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-warm bg-plaster-50 p-6 shadow-plaster sm:p-8">
        <h2 className="text-lg font-extrabold text-plaster-800">
          Thanks, your query is ready to send.
        </h2>
        <p className="mt-2 text-sm text-plaster-600">
          Online submissions aren&apos;t connected yet. In the meantime, email{" "}
          <a
            href="mailto:info@unitedgypsum.com"
            className="font-bold text-brand-800 underline"
          >
            info@unitedgypsum.com
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-warm bg-plaster-50 p-6 shadow-plaster sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-plaster-700">
            Full name<span className="text-brand-700">*</span>
          </span>
          <input required name="fullName" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-plaster-700">
            Email
          </span>
          <input type="email" name="email" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-plaster-700">
            Contact number
          </span>
          <input
            name="phone"
            defaultValue="+92 "
            inputMode="tel"
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-plaster-700">
            Subject
          </span>
          <input name="subject" className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-plaster-700">
            Message
          </span>
          <textarea name="message" rows={5} className={inputClass} />
        </label>
      </div>

      {/* Honeypot: real users never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex items-center rounded-full bg-brand-800 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-900"
      >
        Send message
      </button>
      <p className="mt-3 text-xs text-plaster-500">
        Online submissions aren&apos;t wired up yet. This form is a preview.
      </p>
    </form>
  );
}

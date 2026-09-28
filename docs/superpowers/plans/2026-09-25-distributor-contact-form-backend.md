# Distributor/Contact Form Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire `DistributorForm` and `ContactForm` to a real `/api/contact` endpoint that sends SMTP emails, with honeypot and Pakistani phone validation, leaving Google Sheets and reCAPTCHA as marked TODO hooks.

**Architecture:** One shared `POST /api/contact` route handler parses a superset payload from both forms (discriminated by a `source` field), validates a honeypot and required fields, and sends two emails via nodemailer (a sales notification, plus an optional auto-reply if the submitter gave an email). Both client forms move from a fake `setSubmitted(true)` to a real `fetch` call with `idle | submitting | success | error` state. This repo has no test runner (no jest/vitest/playwright configured, `package.json` only has `dev`/`build`/`start`/`lint`), so verification for every task is `npm run build` plus a manual `npm run dev` smoke check, not automated tests — this is a deliberate deviation from the usual TDD step shape, matching how the rest of this codebase is verified.

**Tech Stack:** Next.js 15 App Router (Node runtime route handler), nodemailer, TypeScript. Modeled directly on the sibling `../MaxGreen` project's `src/app/api/contact/route.ts` and `src/lib/{phone,mailer... (googleSheets/recaptcha)}.ts`, adapted to this project's superset payload and the UG design system's no-em-dash / `&apos;` JSX rules.

**Spec:** `CLAUDE.md` section 12 ("Distributor / Contact Form Backend: approved design (not built)") in this project's root, plus the referenced MaxGreen files at `../MaxGreen/src/app/api/contact/route.ts` and `../MaxGreen/src/lib/{phone,googleSheets,recaptcha}.ts`.

## Global Constraints

- No em dashes or en dashes anywhere: not in copy, headings, alt text, metadata, code, or comments (CLAUDE.md section 9, rule 5). Grep for em dash / en dash before finishing.
- In JSX text use `&apos;` and `&amp;`, never raw `'` or `&` (rule 5). Prefer rewording to avoid the need entirely, as this plan's copy does.
- `"use client"` only where already used; `DistributorForm` and `ContactForm` are already client components, stay that way (rule 1).
- No inline styles, Tailwind only (rule 3).
- PascalCase component files, one default export each; kebab-case routes (rule 6).
- `export const runtime = "nodejs"` on the API route (section 12; nodemailer needs the Node runtime, not Edge).
- Scope for this pass is SMTP + honeypot + PK phone validation only. Google Sheets and reCAPTCHA go in as clearly marked `// TODO` comments in the route, not implemented.
- `.env*` is already gitignored; `.env.example` is committed with placeholder values only, never a real secret.
- No-credentials UX: any email send failure, including unset SMTP env vars, returns `{ error }` with HTTP 500 and a `console.error("[contact-api][email]", ...)` line (this was the open decision in section 12; resolved here as "graceful error state" per the section's own interim guidance).
- `npm run build` must stay clean with zero env vars set (mirrors section 12's verification requirement).

## Review Focus

- Missing or unset SMTP env vars at request time (not just at cold start) must produce a graceful `{ error }` / 500, never an unhandled exception or a build-time crash, since real SMTP credentials are not available in this environment yet.
- A filled honeypot (`website` field) must short-circuit before any email is attempted and must still return `{ success: true }`, so a scraping bot cannot distinguish "blocked" from "sent".
- An invalid Pakistani phone number must be rejected both client-side (inline error, no request sent) and server-side (400), since a client-only check can be bypassed by calling the API directly.
- Both `fullName` and `phone` must be required (400 if missing) even though `ContactForm`'s current markup doesn't mark `phone` as `required` and the payload is a shared superset across two different forms with different optional fields (`company`/`city` vs `subject`/`message`).
- The two forms must not cross-contaminate: `DistributorForm`'s success/error state must not affect `ContactForm`'s (they are separate client components mounted on different pages), and the route must correctly label the sales-notification email differently per `source` so the recipient can tell a distributor lead from a general contact query at a glance.

---

## File Structure

- Create `src/lib/phone.ts`: `PK_PHONE_REGEX` and `isValidPkPhone()`, pure, no dependencies.
- Create `src/lib/mailer.ts`: `createTransporter()` and `sendLeadEmails()`, the only file that imports `nodemailer` and reads `SMTP_*` / `SALES_NOTIFY_EMAILS` env vars.
- Create `src/app/api/contact/route.ts`: thin `POST` handler; parses the request, validates, delegates to `src/lib/phone.ts` and `src/lib/mailer.ts`.
- Modify `.env.example` (create it, doesn't exist yet): SMTP block active, Sheets/reCAPTCHA blocks present but commented "later".
- Modify `package.json`: add `nodemailer` and `@types/nodemailer`.
- Modify `src/components/sections/DistributorForm.tsx`: replace fake `setSubmitted` with real `fetch("/api/contact")`.
- Modify `src/components/contact/ContactForm.tsx`: same, plus mark `phone` as a required field to match the server-side requirement.

---

### Task 1: Dependencies and env template

**Files:**
- Modify: `package.json`
- Create: `.env.example`

**Interfaces:**
- Produces: `nodemailer` and `@types/nodemailer` available for import in Task 3.

- [ ] **Step 1: Install nodemailer**

Run:
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

- [ ] **Step 2: Verify package.json picked up the deps**

Run: `grep -n "nodemailer" package.json`
Expected: two lines, one under `dependencies` (`"nodemailer": "^..."`) and one under `devDependencies` (`"@types/nodemailer": "^..."`).

- [ ] **Step 3: Create `.env.example`**

```bash
# SMTP (Distributor form + Contact form email delivery)
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_USER=sales@unitedgypsum.com
SMTP_PASSWORD=changeme
SALES_NOTIFY_EMAILS=sales@unitedgypsum.com,info@unitedgypsum.com

# Google Sheets durable backup lead capture (TODO, later pass, see CLAUDE.md section 12)
# GOOGLE_SHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
# GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIExample...\n-----END PRIVATE KEY-----\n"
# GOOGLE_SHEET_ID=your-google-sheet-id-from-url

# reCAPTCHA v3 (TODO, later pass, see CLAUDE.md section 12)
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-v3-site-key
# RECAPTCHA_SECRET_KEY=your-recaptcha-v3-secret-key
```

Write this file with the Write tool at `.env.example` in the project root (not gitignored; only `.env`, `.env.local`, etc. are).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "Add nodemailer dependency and .env.example for contact form backend"
```

---

### Task 2: PK phone validation

**Files:**
- Create: `src/lib/phone.ts`

**Interfaces:**
- Produces: `PK_PHONE_REGEX: RegExp`, `isValidPkPhone(phone: string): boolean`, both imported by `src/app/api/contact/route.ts` (Task 4) and by `DistributorForm.tsx` / `ContactForm.tsx` (Tasks 5, 6).

- [ ] **Step 1: Write `src/lib/phone.ts`**

```typescript
// Lenient by design: strips all non-digit characters first, so it accepts landlines
// (021 34123301) as well as mobiles, in any of the forms a Pakistani caller might type
// (+92 300 0566858, 0300 0566858, 92 300 0566858, with or without spaces/dashes).
export const PK_PHONE_REGEX = /^\d{10,15}$/;

export function isValidPkPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  return PK_PHONE_REGEX.test(digitsOnly);
}
```

- [ ] **Step 2: Manually verify the regex against known cases**

Run:
```bash
node -e "
const { isValidPkPhone } = require('./src/lib/phone.ts');
" 2>/dev/null || node -e "
const PK_PHONE_REGEX = /^\d{10,15}\$/;
function isValidPkPhone(phone) { return PK_PHONE_REGEX.test(phone.replace(/\D/g, '')); }
console.log('mobile intl', isValidPkPhone('+92 300 0566858'));
console.log('mobile local', isValidPkPhone('0300 0566858'));
console.log('landline', isValidPkPhone('021 34123301'));
console.log('too short', isValidPkPhone('12345'));
console.log('empty', isValidPkPhone(''));
"
```
Expected: `mobile intl true`, `mobile local true`, `landline true`, `too short false`, `empty false`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/phone.ts
git commit -m "Add PK phone validation helper for contact form backend"
```

---

### Task 3: Mailer

**Files:**
- Create: `src/lib/mailer.ts`

**Interfaces:**
- Consumes: `nodemailer` (Task 1).
- Produces: `LeadPayload` type and `sendLeadEmails(payload: LeadPayload): Promise<void>`, imported by `src/app/api/contact/route.ts` (Task 4). `createTransporter()` is also exported per the spec but only called from inside `sendLeadEmails`.

- [ ] **Step 1: Write `src/lib/mailer.ts`**

```typescript
import nodemailer from "nodemailer";

export type LeadPayload = {
  source: "distributor-form" | "contact-form";
  fullName: string;
  company?: string;
  email?: string;
  phone: string;
  city?: string;
  subject?: string;
  query?: string;
  message?: string;
};

// Built fresh per send, not cached at module scope, so a mid-session env var
// change (or simply having none set yet, since this environment has no SMTP
// credentials) never gets baked into a stale transporter.
export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // The client's cPanel mail server presents a cert nodemailer's default
      // trust store rejects; same workaround as MaxGreen's mailer.
      rejectUnauthorized: false,
    },
  });
}

function fieldRows(payload: LeadPayload): string {
  const rows: Array<[string, string | undefined]> = [
    ["Full name", payload.fullName],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["City", payload.city],
    ["Subject", payload.subject],
    ["Query", payload.query],
    ["Message", payload.message],
  ];
  return rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`)
    .join("\n");
}

export async function sendLeadEmails(payload: LeadPayload): Promise<void> {
  const transporter = createTransporter();

  const salesRecipients = (process.env.SALES_NOTIFY_EMAILS || process.env.SMTP_USER || "")
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  const formLabel =
    payload.source === "distributor-form" ? "Distributor Enquiry" : "Contact Query";

  await transporter.sendMail({
    from: `"United Gypsum" <${process.env.SMTP_USER}>`,
    to: salesRecipients,
    subject: `New ${formLabel}: ${payload.fullName}${payload.city ? ` (${payload.city})` : ""}`,
    html: `<h2>New ${formLabel}</h2>\n${fieldRows(payload)}`,
  });

  if (payload.email) {
    await transporter.sendMail({
      from: `"United Gypsum" <${process.env.SMTP_USER}>`,
      to: payload.email,
      subject: "We have received your query, United Gypsum",
      html: `
        <h2>Thank you for contacting United Gypsum, ${payload.fullName}!</h2>
        <p>We have received your ${formLabel.toLowerCase()} and one of our representatives will get back to you shortly.</p>
        <p>In the meantime, if you have any urgent questions, feel free to call us at <strong>+92 21 34123301</strong>.</p>
        <br/>
        <p>Best regards,<br/>United Gypsum Team</p>
      `,
    });
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors referencing `src/lib/mailer.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/mailer.ts
git commit -m "Add SMTP mailer for contact form backend"
```

---

### Task 4: API route

**Files:**
- Create: `src/app/api/contact/route.ts`

**Interfaces:**
- Consumes: `isValidPkPhone` (Task 2), `sendLeadEmails`, `LeadPayload` (Task 3).
- Produces: `POST /api/contact`, consumed by `DistributorForm.tsx` and `ContactForm.tsx` (Tasks 5, 6). Request body: `LeadPayload & { website?: string }`. Response: `{ success: true }` (200) or `{ error: string }` (400/500).

- [ ] **Step 1: Write `src/app/api/contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { isValidPkPhone } from "@/lib/phone";
import { sendLeadEmails, type LeadPayload } from "@/lib/mailer";

export const runtime = "nodejs";

type ContactRequestBody = LeadPayload & { website?: string };

// TODO: Google Sheets durable backup (appendLeadToSheet), once GOOGLE_SHEETS_* env
// vars are set. See CLAUDE.md section 12 and ../MaxGreen/src/lib/googleSheets.ts.
// TODO: reCAPTCHA v3 verify (fail-open, log-only), once RECAPTCHA_SECRET_KEY is set.
// See ../MaxGreen/src/app/api/contact/route.ts's verifyRecaptcha() for the pattern.

export async function POST(request: NextRequest) {
  const body: ContactRequestBody = await request.json();
  const { source, fullName, company, email, phone, city, subject, query, message, website } =
    body;

  // Honeypot: real users never see or fill this hidden field. A filled value means a
  // bot; return a fake success so it does not learn to adapt, and skip all processing.
  if (website) {
    console.warn(`[contact-api][honeypot] blocked submission, website field was: "${website}"`);
    return NextResponse.json({ success: true });
  }

  if (!fullName || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidPkPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  const leadSource: LeadPayload["source"] =
    source === "distributor-form" ? "distributor-form" : "contact-form";

  try {
    await sendLeadEmails({
      source: leadSource,
      fullName,
      company,
      email,
      phone,
      city,
      subject,
      query,
      message,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact-api][email]", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual smoke test with no SMTP env vars set (missing-config path)**

Run:
```bash
npm run dev
```
In another terminal, once the dev server is up:
```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"source":"contact-form","fullName":"Test User","phone":"03000000000","message":"hello"}'
```
Expected: HTTP 500 with `{"error":"Failed to send email"}` (no SMTP configured in this environment), and a `[contact-api][email]` line in the `npm run dev` terminal. This confirms the no-credentials path is graceful, not a crash.

- [ ] **Step 4: Manual smoke test, honeypot**

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"source":"contact-form","fullName":"Bot","phone":"03000000000","website":"http://spam.example"}'
```
Expected: HTTP 200 with `{"success":true}`, and a `[contact-api][honeypot]` warning in the dev server log, no `[contact-api][email]` line (proves the honeypot short-circuits before any send attempt).

- [ ] **Step 5: Manual smoke test, bad phone**

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"source":"contact-form","fullName":"Test User","phone":"123"}'
```
Expected: HTTP 400 with `{"error":"Invalid phone number"}`.

- [ ] **Step 6: Manual smoke test, missing required fields**

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"source":"contact-form","email":"a@b.com"}'
```
Expected: HTTP 400 with `{"error":"Missing required fields"}`.

Stop the dev server (Ctrl+C or kill the background process) once all four checks pass.

- [ ] **Step 7: Commit**

```bash
git add "src/app/api/contact/route.ts"
git commit -m "Add /api/contact route handler with honeypot and PK phone validation"
```

---

### Task 5: Wire DistributorForm to the real endpoint

**Files:**
- Modify: `src/components/sections/DistributorForm.tsx`

**Interfaces:**
- Consumes: `isValidPkPhone` (Task 2), `POST /api/contact` (Task 4).

- [ ] **Step 1: Replace the fake-submit implementation**

Replace the full contents of `src/components/sections/DistributorForm.tsx` with:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import DistributorMap from "@/components/sections/DistributorMap";
import { isValidPkPhone } from "@/lib/phone";

const inputClass =
  "w-full rounded-xl border border-warm bg-white px-4 py-3 text-sm text-grey placeholder:text-grey focus:border-red focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export default function DistributorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") || "");

    if (!isValidPkPhone(phone)) {
      setPhoneError("Enter a valid phone number, for example 0300 0000000");
      return;
    }
    setPhoneError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "distributor-form",
          fullName: formData.get("fullName"),
          company: formData.get("company"),
          email: formData.get("email"),
          phone,
          city: formData.get("city"),
          query: formData.get("query"),
          website: formData.get("website"),
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="distributor" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Become a Distributor"
              title="Partner with United Gypsum"
            />
            <div className="mt-8">
              <DistributorMap />
            </div>
          </div>

          <div className="rounded-3xl border border-warm bg-white p-6 shadow-plaster sm:p-8 lg:sticky lg:top-28 lg:self-start">
            {status === "success" ? (
              <div className="flex h-full flex-col items-start justify-center">
                <h3 className="text-lg font-extrabold text-grey">
                  Thanks, we have received your enquiry.
                </h3>
                <p className="mt-2 text-sm text-grey">
                  A member of our team will get back to you shortly. You can
                  also reach us directly at{" "}
                  <a
                    href="mailto:sales@unitedgypsum.com"
                    className="font-bold text-red underline"
                  >
                    sales@unitedgypsum.com
                  </a>{" "}
                  or +92 21 34123301.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-bold text-red"
                >
                  Send another enquiry
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
                  {phoneError && (
                    <span className="mt-1.5 block text-xs font-bold text-red">
                      {phoneError}
                    </span>
                  )}
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
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center rounded-full bg-red px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-grey disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send enquiry"}
                  </button>
                  {status === "error" && (
                    <p className="mt-3 text-xs font-bold text-red">
                      Something went wrong sending your enquiry. Please email
                      sales@unitedgypsum.com or call +92 21 34123301 instead.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Grep for dashes and raw apostrophes/ampersands introduced by this change**

Run: `grep -nP '[\x{2013}\x{2014}]' src/components/sections/DistributorForm.tsx`
Expected: no output (no em/en dash characters).

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual browser check**

```bash
npm run dev
```
Open `http://localhost:3000/` in a browser, scroll to the "Become a Distributor" section. Submit the form with an invalid phone (e.g. `123`) and confirm the inline red error appears without a network request firing (check the Network tab). Then submit with a valid phone (e.g. `0300 0000000`) and confirm it shows the "Something went wrong..." error state (expected, since no SMTP is configured in this environment) rather than crashing or hanging. Stop the dev server after.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/DistributorForm.tsx
git commit -m "Wire DistributorForm to the real /api/contact endpoint"
```

---

### Task 6: Wire ContactForm to the real endpoint

**Files:**
- Modify: `src/components/contact/ContactForm.tsx`

**Interfaces:**
- Consumes: `isValidPkPhone` (Task 2), `POST /api/contact` (Task 4).

- [ ] **Step 1: Replace the fake-submit implementation**

Replace the full contents of `src/components/contact/ContactForm.tsx` with:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { isValidPkPhone } from "@/lib/phone";

const inputClass =
  "w-full rounded-xl border border-warm bg-white px-4 py-3 text-sm text-grey placeholder:text-grey focus:border-red focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") || "");

    if (!isValidPkPhone(phone)) {
      setPhoneError("Enter a valid phone number, for example 0300 0000000");
      return;
    }
    setPhoneError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-form",
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone,
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-warm bg-mist p-6 shadow-plaster sm:p-8">
        <h2 className="text-lg font-extrabold text-grey">
          Thanks, we have received your query.
        </h2>
        <p className="mt-2 text-sm text-grey">
          A member of our team will get back to you shortly. You can also
          reach us directly at{" "}
          <a
            href="mailto:info@unitedgypsum.com"
            className="font-bold text-red underline"
          >
            info@unitedgypsum.com
          </a>{" "}
          or +92 21 34123301.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-bold text-red"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-warm bg-mist p-6 shadow-plaster sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-grey">
            Full name<span className="text-red">*</span>
          </span>
          <input required name="fullName" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-grey">
            Email
          </span>
          <input type="email" name="email" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-grey">
            Contact number<span className="text-red">*</span>
          </span>
          <input
            required
            name="phone"
            defaultValue="+92 "
            inputMode="tel"
            className={inputClass}
          />
          {phoneError && (
            <span className="mt-1.5 block text-xs font-bold text-red">
              {phoneError}
            </span>
          )}
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-grey">
            Subject
          </span>
          <input name="subject" className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-grey">
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
        disabled={status === "submitting"}
        className="mt-5 inline-flex items-center rounded-full bg-red px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-grey disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-xs font-bold text-red">
          Something went wrong sending your message. Please email
          info@unitedgypsum.com or call +92 21 34123301 instead.
        </p>
      )}
    </form>
  );
}
```

Note this intentionally adds `required` to the phone `<input>`, which the previous version did not have; the server now requires `phone` for both forms (Task 4, Review Focus item 4), so the client must match or a submitter hits a confusing 400 with no visible reason.

- [ ] **Step 2: Grep for dashes**

Run: `grep -nP '[\x{2013}\x{2014}]' src/components/contact/ContactForm.tsx`
Expected: no output.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual browser check**

```bash
npm run dev
```
Open `http://localhost:3000/contact-us/`. Submit with no phone at all and confirm the browser's native `required` validation blocks it. Fill an invalid phone (`123`) and confirm the inline red error appears. Fill a valid phone and submit; confirm the graceful error state appears (expected, no SMTP configured here). Stop the dev server after.

- [ ] **Step 5: Commit**

```bash
git add src/components/contact/ContactForm.tsx
git commit -m "Wire ContactForm to the real /api/contact endpoint, require phone"
```

---

### Task 7: Full production build verification

**Files:** none (verification only)

**Interfaces:** none

- [ ] **Step 1: Confirm no SMTP env vars are set in this shell**

Run: `env | grep -i smtp || echo "none set"`
Expected: `none set` (or equivalent), confirming this reproduces the client's real deployment state where credentials are not yet available.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: build completes with exit code 0, same route count as before plus the new `/api/contact` route listed in the build output, no type errors, no lint errors.

- [ ] **Step 3: Final dash sweep across all files touched this session**

Run:
```bash
grep -rnP '[\x{2013}\x{2014}]' src/lib/phone.ts src/lib/mailer.ts "src/app/api/contact/route.ts" src/components/sections/DistributorForm.tsx src/components/contact/ContactForm.tsx .env.example
```
Expected: no output.

- [ ] **Step 4: Update CLAUDE.md status**

Edit the project's `CLAUDE.md`: in section 1's "Status" block, replace the "Next task (approved, not started): the distributor-form / contact-form backend" paragraph with a note that the backend is now built (SMTP + honeypot + PK phone validation, Sheets/reCAPTCHA still TODO hooks), and remove the "Nothing for it has been written yet" sentence. In section 11, remove the distributor/contact form backend bullet (or mark it done), since it is no longer the primary open gap. In section 12, add a line noting the design was implemented on 2026-09-25 and the "Files to add or change" list is now in place, without deleting the section (it remains useful reference for the Sheets/reCAPTCHA follow-up pass).

- [ ] **Step 5: Final commit**

```bash
git add CLAUDE.md
git commit -m "Update CLAUDE.md: distributor/contact form backend is built"
```

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const columns = {
  "Flagship Products": [
    { label: "Smart Gypsum Board", href: "/smart-gypsum-board/" },
    { label: "Smart Ceiling Panel", href: "/smart-ceiling-panel/" },
    { label: "Smart Grid", href: "/smart-grid/" },
  ],
  Accessories: [
    { label: "Smart Filler", href: "/smart-filler/" },
    { label: "Smart Tape", href: "/smart-tape/" },
    { label: "Smart Screws", href: "/smart-screws/" },
    { label: "Smart Access", href: "/smart-access/" },
    { label: "Smart Bead", href: "/smart-bead/" },
  ],
  Company: [
    { label: "About Us", href: "/about-us/" },
    { label: "Company Profile", href: "/company-profile/" },
    { label: "Ceiling Calculator", href: "/ceiling-calculator/" },
    { label: "Blogs", href: "/blogs/" },
    { label: "Events", href: "/events/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
};

const socials = [
  { icon: Facebook, href: "https://facebook.com/unitedgypsum", label: "Facebook" },
  {
    icon: Instagram,
    href: "https://instagram.com/unitedgypsumpvtltd",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/united-gypsum",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="bg-plaster-950 text-plaster-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/United_Gypsum_Logo_01-01-1024x221.png"
              alt="United Gypsum"
              width={190}
              height={41}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-plaster-400">
              A global supplier of sustainable, gypsum-based construction materials
              for diverse construction applications &mdash; manufacturing in
              Pakistan since 2014.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href="tel:+922134123301"
                className="flex items-center gap-2 text-plaster-300 transition-colors hover:text-brand-300"
              >
                <Phone className="h-4 w-4 text-brand-400" />
                +92 21 34123301&ndash;2
              </a>
              <a
                href="tel:+923000566858"
                className="flex items-center gap-2 text-plaster-300 transition-colors hover:text-brand-300"
              >
                <Phone className="h-4 w-4 text-brand-400" />
                +92 300 0566858
              </a>
              <a
                href="mailto:info@unitedgypsum.com"
                className="flex items-center gap-2 text-plaster-300 transition-colors hover:text-brand-300"
              >
                <Mail className="h-4 w-4 text-brand-400" />
                info@unitedgypsum.com
              </a>
              <p className="flex items-start gap-2 text-plaster-300">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                B-22, 23 &amp; 24 NWIZ, Port Qasim, Karachi, Sindh, Pakistan.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-brand-700"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {Object.entries(columns).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-300">
                  {heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-plaster-300 transition-colors hover:text-brand-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-900">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs font-semibold tracking-[0.08em] text-brand-100 sm:px-6 lg:px-8">
          COPYRIGHT 2014 &ndash; 2026 &copy; UNITED GYPSUM PVT. LTD. | ALL RIGHTS
          RESERVED
        </div>
      </div>
    </footer>
  );
}

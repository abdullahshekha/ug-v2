import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

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
    <footer className="bg-grey text-white">
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/united-gypsum-logo-white.png"
              alt="United Gypsum"
              width={899}
              height={201}
              className="h-[72px] w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white">
              A global supplier of sustainable, gypsum-based construction materials
              for diverse construction applications, manufacturing in Pakistan
              since 2014.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-grey transition-colors hover:bg-red hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {Object.entries(columns).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-[11px] font-extrabold uppercase tracking-eyebrow text-white">
                  {heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white transition-colors hover:text-mist"
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

      <div className="bg-red">
        <div className="px-4 py-4 text-center text-xs font-semibold tracking-[0.08em] text-white sm:px-8 lg:px-12">
          COPYRIGHT 2014 - 2026 &copy; UNITED GYPSUM PVT. LTD. | ALL RIGHTS
          RESERVED
        </div>
      </div>
    </footer>
  );
}

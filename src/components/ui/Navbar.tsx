"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Mail,
  Phone,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const flagship = [
  { label: "Smart Gypsum Board", href: "/smart-gypsum-board/" },
  { label: "Smart Ceiling Panel", href: "/smart-ceiling-panel/" },
  { label: "Smart Grid", href: "/smart-grid/" },
];

const accessories = [
  { label: "Smart Filler", href: "/smart-filler/" },
  { label: "Smart Tape", href: "/smart-tape/" },
  { label: "Smart Screws", href: "/smart-screws/" },
  { label: "Smart Access", href: "/smart-access/" },
  { label: "Smart Bead", href: "/smart-bead/" },
];

const resources = [
  { label: "Company Profile", href: "/company-profile/" },
  { label: "Ceiling Calculator", href: "/ceiling-calculator/" },
  { label: "Blogs", href: "/blogs/" },
];

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-brand-800 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] sm:px-6 lg:px-8">
          <span>THE SMARTER WAY TO BUILD</span>
          <div className="flex items-center gap-6 tracking-normal">
            <a
              href="mailto:info@unitedgypsum.com"
              className="flex items-center gap-1.5 transition-colors hover:text-brand-200"
            >
              <Mail className="h-3.5 w-3.5" />
              info@unitedgypsum.com
            </a>
            <span className="flex items-center gap-1.5 text-brand-200">
              <Clock className="h-3.5 w-3.5" />
              Mon&ndash;Sat, 9:00 AM &ndash; 6:00 PM
            </span>
            <a
              href="tel:+922134123301"
              className="flex items-center gap-1.5 transition-colors hover:text-brand-200"
            >
              <Phone className="h-3.5 w-3.5" />
              +92 21 34123301
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-plaster-50/95 shadow-plaster backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex-shrink-0" aria-label="United Gypsum home">
            <Image
              src="/images/United_Gypsum_Logo_01-01-1024x221.png"
              alt="United Gypsum"
              width={200}
              height={43}
              className="h-9 w-auto object-contain sm:h-10"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink href="/about-us/">About</NavLink>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("products")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-plaster-700 transition-colors hover:text-brand-800">
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
              {openMenu === "products" && (
                <div className="absolute left-0 top-full w-[30rem] rounded-2xl border border-warm bg-white p-5 shadow-plaster-lg">
                  <div className="grid grid-cols-2 gap-5">
                    <MenuGroup title="Flagship products" items={flagship} />
                    <MenuGroup title="Drywall accessories" items={accessories} />
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("resources")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-plaster-700 transition-colors hover:text-brand-800">
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
              {openMenu === "resources" && (
                <div className="absolute left-0 top-full w-56 rounded-2xl border border-warm bg-white p-2 shadow-plaster-lg">
                  {resources.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="block rounded-lg px-3 py-2 text-sm text-plaster-700 transition-colors hover:bg-plaster-100 hover:text-brand-800"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink href="/events/">Events</NavLink>
            <NavLink href="/contact-us/">Contact</NavLink>
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/#dealer"
              className="inline-flex items-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(124,29,31,0.28)] transition-transform hover:-translate-y-0.5"
            >
              Become a dealer
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-plaster-800 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden bg-plaster-50 transition-[max-height] duration-300 lg:hidden ${
          mobileOpen ? "max-h-[80vh] overflow-y-auto border-t border-warm" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          <MobileLink href="/about-us/" onClick={() => setMobileOpen(false)}>
            About
          </MobileLink>
          <MobileSection title="Flagship products" items={flagship} onNavigate={() => setMobileOpen(false)} />
          <MobileSection title="Drywall accessories" items={accessories} onNavigate={() => setMobileOpen(false)} />
          <MobileSection title="Resources" items={resources} onNavigate={() => setMobileOpen(false)} />
          <MobileLink href="/events/" onClick={() => setMobileOpen(false)}>
            Events
          </MobileLink>
          <MobileLink href="/contact-us/" onClick={() => setMobileOpen(false)}>
            Contact
          </MobileLink>

          <Link
            href="/#dealer"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-full bg-brand-800 px-5 py-3 text-center text-sm font-bold text-white"
          >
            Become a dealer
          </Link>

          <div className="flex items-center gap-3 pt-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-plaster-700 shadow-plaster transition-colors hover:text-brand-800"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-plaster-700 transition-colors hover:text-brand-800"
    >
      {children}
    </Link>
  );
}

function MenuGroup({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-extrabold uppercase tracking-eyebrow text-plaster-500">
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="block rounded-lg px-3 py-1.5 text-sm text-plaster-700 transition-colors hover:bg-plaster-100 hover:text-brand-800"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-3 text-sm font-semibold text-plaster-800 hover:bg-plaster-100"
    >
      {children}
    </Link>
  );
}

function MobileSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <div className="px-3 py-2">
      <p className="mb-1 text-[11px] font-extrabold uppercase tracking-eyebrow text-plaster-500">
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            onClick={onNavigate}
            className="block rounded-lg px-2 py-2 text-sm text-plaster-700 hover:bg-plaster-100 hover:text-brand-800"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

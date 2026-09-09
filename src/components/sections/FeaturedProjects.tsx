import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const projects = [
  {
    name: "Eighteen Islamabad",
    sector: "Building & Housing",
    city: "Islamabad",
    logo: "/images/projects/eighteen-islamabad.jpg",
  },
  {
    name: "Packages Mall",
    sector: "Shopping Malls",
    city: "Lahore",
    logo: "/images/projects/packages-mall.jpg",
  },
  {
    name: "Lucky One Mall",
    sector: "Shopping Malls",
    city: "Karachi",
    logo: "/images/projects/lucky-one-mall.jpg",
  },
  {
    name: "Emaar Crescent Bay",
    sector: "Building & Housing",
    city: "Karachi",
    logo: "/images/projects/emaar-crescent-bay.png",
  },
  {
    name: "CMH Lahore Medical College",
    sector: "Hospitals",
    city: "Lahore",
    logo: "/images/projects/cmh-lahore-medical-college.jpg",
  },
  {
    name: "Giga Mall",
    sector: "Shopping Malls",
    city: "Islamabad",
    logo: "/images/projects/giga-mall.jpg",
  },
  {
    name: "Mövenpick Hotel, Centaurus",
    sector: "Hospitality",
    city: "Islamabad",
    logo: "/images/projects/movenpick-hotel.png",
  },
  {
    name: "Bahria Town Head Office",
    sector: "Building & Housing",
    city: "Rawalpindi",
    logo: "/images/projects/bahria-town-head-office.jpg",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Where you'll find us"
          title="Built into landmark projects"
          lead="United Gypsum systems are specified on more than 250 projects across Pakistan's public and private sectors — motorways, dams, high courts, hospitals, malls and residential towers — and shipped to distributors in the UAE, Oman, Nepal and Sri Lanka."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <li
              key={p.name}
              className="group flex gap-4 rounded-2xl border border-warm bg-plaster-50 p-4 shadow-plaster"
            >
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-warm bg-white">
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain p-1.5 grayscale transition group-hover:grayscale-0"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold leading-snug text-plaster-800">
                  {p.name}
                </span>
                <span className="mt-1.5 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-800">
                  {p.sector}
                </span>
                <span className="mt-1 block text-xs text-plaster-500">
                  {p.city}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/projects/"
          className="mt-10 inline-flex items-center gap-1 text-sm font-bold text-brand-800 transition-colors hover:text-brand-900"
        >
          View the full portfolio
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

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

const videos = {
  landscape: [
    {
      title: "Ramada Hotel x United Gypsum",
      brief:
        "Executive Director Sheheryar Mustafa on choosing United Gypsum's fire-safe, seamless ceiling systems over traditional wood.",
      src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1306459131374747%2F&show_text=false&width=560&t=0",
    },
    {
      title: "Zahid Javed Raja, former Chief Architect of Punjab",
      brief:
        "On the importance of supporting Pakistan's local manufacturers and homegrown craftsmanship.",
      src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Funitedgypsum%2Fvideos%2F689530743076716%2F&show_text=false&width=560&t=0",
    },
  ],
  portrait: [
    {
      title: "Emaar Karachi",
      brief:
        "Trusted partner on one of Pakistan's most prestigious developments, building the future of the Karachi skyline.",
      src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2023289808601789%2F&show_text=false&width=267&t=0",
    },
    {
      title: "Architect Zulfiqar Ali, President IAP",
      brief:
        "Endorsing United Gypsum and the case for prioritizing locally manufactured construction materials.",
      src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Funitedgypsum%2Fvideos%2F425656706605706%2F&show_text=false&width=267&t=0",
    },
  ],
};

export default function FeaturedProjects() {
  return (
    <section className="bg-white">
      <div className="px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Where you'll find us"
          title="Built into landmark projects"
          lead="United Gypsum systems are specified on more than 250 projects across Pakistan's public and private sectors, from motorways, dams and high courts to hospitals, malls and residential towers, and are shipped to distributors in the UAE, Oman, Nepal and Sri Lanka."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <li
              key={p.name}
              className="flex flex-col gap-4 rounded-2xl border border-warm bg-mist p-5 shadow-plaster"
            >
              <span className="flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-warm bg-white">
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={256}
                  height={128}
                  className="max-h-full w-auto object-contain p-3"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold leading-snug text-grey">
                  {p.name}
                </span>
                <span className="mt-1.5 inline-block rounded-full bg-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {p.sector}
                </span>
                <span className="mt-1 block text-xs text-grey">
                  {p.city}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-warm pt-16">
          <p className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
            In their words
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-grey">
            Clients and industry leaders on working with United Gypsum
          </h3>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {videos.landscape.map((v) => (
              <div key={v.title} className="rounded-2xl border border-warm bg-mist p-4 shadow-plaster">
                <div className="relative aspect-[560/314] w-full overflow-hidden rounded-xl bg-white">
                  <iframe
                    src={v.src}
                    className="absolute inset-0 h-full w-full border-0"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={v.title}
                  />
                </div>
                <p className="mt-4 text-sm font-extrabold leading-snug text-grey">
                  {v.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-grey">{v.brief}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:w-2/3">
            {videos.portrait.map((v) => (
              <div key={v.title} className="rounded-2xl border border-warm bg-mist p-4 shadow-plaster">
                <div className="relative mx-auto aspect-[267/476] max-w-[220px] overflow-hidden rounded-xl bg-white">
                  <iframe
                    src={v.src}
                    className="absolute inset-0 h-full w-full border-0"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={v.title}
                  />
                </div>
                <p className="mt-4 text-sm font-extrabold leading-snug text-grey">
                  {v.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-grey">{v.brief}</p>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/projects/"
          className="mt-10 inline-flex items-center gap-1 text-sm font-bold text-red transition-colors hover:text-grey"
        >
          View the full portfolio
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

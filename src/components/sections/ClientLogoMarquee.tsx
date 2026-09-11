import Image from "next/image";
import { sectors } from "@/lib/projects";

const logos = sectors.flatMap((sector) => sector.logos);

// Duplicate the row so the marquee loops seamlessly.
const track = [...logos, ...logos];

export default function ClientLogoMarquee() {
  return (
    <section className="border-b border-warm bg-white py-12 sm:py-16">
      <div className="px-4 sm:px-8 lg:px-12">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
          Trusted by Pakistan&apos;s leading names
        </p>
      </div>

      <div className="marquee-track relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee gap-4">
          {track.map((logo, i) => (
            <div
              key={`${logo.logo}-${i}`}
              className="flex h-20 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-warm bg-mist px-4"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

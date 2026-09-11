import Image from "next/image";
import { sectors } from "@/lib/projects";

// Sample up to 4 logos, evenly spaced, from every sector so the marquee stays
// a manageable length (a full 114-logo track made the fixed-duration scroll
// run far too fast) while still representing each sector.
const PER_SECTOR = 4;
const logos = sectors.flatMap((sector) => {
  const { logos: sectorLogos } = sector;
  const count = Math.min(PER_SECTOR, sectorLogos.length);
  return Array.from({ length: count }, (_, i) =>
    sectorLogos[Math.floor((i * sectorLogos.length) / count)],
  );
});

// Duplicate the row so the marquee loops seamlessly.
const track = [...logos, ...logos];

export default function ClientLogoMarquee() {
  return (
    <section className="border-b border-warm bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
          Trusted by Pakistan&apos;s leading names
        </p>
      </div>

      <div className="marquee-track relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <div
          className="flex w-max animate-marquee gap-6"
          style={{ animationDuration: "50s" }}
        >
          {track.map((logo, i) => (
            <div
              key={`${logo.logo}-${i}`}
              className="flex h-28 w-52 flex-shrink-0 items-center justify-center rounded-xl border border-warm bg-white px-6"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={180}
                height={90}
                className="max-h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

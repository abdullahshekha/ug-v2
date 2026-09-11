import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const accessories = [
  {
    name: "Smart Filler",
    href: "/smart-filler/",
    image: "/images/accessory-filler.png",
    imageWidth: 700,
    imageHeight: 700,
    note: "Ready-mixed joint filler for flush jointing and a paint-ready finish.",
  },
  {
    name: "Smart Tape",
    href: "/smart-tape/",
    image: "/images/accessory-tape.png",
    imageWidth: 700,
    imageHeight: 499,
    note: "Self-adhesive fiberglass mesh tape that resists shrinkage and cracking.",
  },
  {
    name: "Smart Screws",
    href: "/smart-screws/",
    image: "/images/accessory-screws.png",
    imageWidth: 700,
    imageHeight: 567,
    note: "Fine-thread carbon-steel drywall screws for fixing board to metal studs.",
  },
  {
    name: "Smart Access",
    href: "/smart-access/",
    image: "/images/accessory-access.png",
    imageWidth: 700,
    imageHeight: 757,
    note: "Powder-coated aluminium access panels in 300, 400 and 600 mm sizes.",
  },
  {
    name: "Smart Bead",
    href: "/smart-bead/",
    image: "/images/accessory-bead.png",
    imageWidth: 700,
    imageHeight: 689,
    note: "Paper-faced metal corner bead for strong, chip-resistant drywall edges.",
  },
];

export default function Accessories() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Drywall accessories"
            title="Everything the system needs"
          />
          <Link
            href="/#dealer"
            className="text-sm font-bold text-red transition-colors hover:text-grey"
          >
            Explore all accessories
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {accessories.map(({ name, href, image, imageWidth, imageHeight, note }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1"
            >
              <div className="flex h-32 items-center justify-center">
                <Image
                  src={image}
                  alt={name}
                  width={imageWidth}
                  height={imageHeight}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-grey group-hover:text-red">
                {name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-grey">
                {note}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

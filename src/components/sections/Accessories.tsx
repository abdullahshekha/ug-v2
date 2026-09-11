import Link from "next/link";
import { Layers, Ruler, Wrench, SquareStack, CornerDownRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const accessories = [
  {
    name: "Smart Filler",
    href: "/smart-filler/",
    icon: Layers,
    note: "Ready-mixed joint filler for flush jointing and a paint-ready finish.",
  },
  {
    name: "Smart Tape",
    href: "/smart-tape/",
    icon: Ruler,
    note: "Self-adhesive fiberglass mesh tape that resists shrinkage and cracking.",
  },
  {
    name: "Smart Screws",
    href: "/smart-screws/",
    icon: Wrench,
    note: "Fine-thread carbon-steel drywall screws for fixing board to metal studs.",
  },
  {
    name: "Smart Access",
    href: "/smart-access/",
    icon: SquareStack,
    note: "Powder-coated aluminium access panels in 300, 400 and 600 mm sizes.",
  },
  {
    name: "Smart Bead",
    href: "/smart-bead/",
    icon: CornerDownRight,
    note: "Paper-faced metal corner bead for strong, chip-resistant drywall edges.",
  },
];

export default function Accessories() {
  return (
    <section className="bg-mist">
      <div className="px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
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
          {accessories.map(({ name, href, icon: Icon, note }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-red">
                <Icon className="h-5 w-5" />
              </span>
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

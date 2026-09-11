import { HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";

const pillars = [
  {
    name: "Quality",
    icon: ShieldCheck,
    copy: "Exceptional quality of gypsum products, delighting our customers.",
  },
  {
    name: "Loyalty",
    icon: HeartHandshake,
    copy: "Tackling customer issues at the ground level, and thus gaining customer loyalty.",
  },
  {
    name: "Innovation",
    icon: Lightbulb,
    copy: "Making groundbreaking products for residential, commercial and institutional sectors.",
  },
];

export default function Pillars() {
  return (
    <section className="border-y border-warm bg-white">
      <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
          At United Gypsum, we continuously strive for
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-10 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.name} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red">
                <p.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-grey">
                {p.name}
              </h3>
              <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-grey">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

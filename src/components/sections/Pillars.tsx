import { HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";

const pillars = [
  {
    name: "Quality",
    icon: ShieldCheck,
    copy: "Exceptional quality of gypsum products, delighting our customers. Every batch is monitored under strict quality control, manufactured to ISO 9001-2015 and tested against ASTM C472, C473, C474 and D3763.",
  },
  {
    name: "Loyalty",
    icon: HeartHandshake,
    copy: "Tackling customer issues at the ground level, and thus gaining customer loyalty. Our team stays engaged after the sale, from technical support on site to fast turnaround on every order.",
  },
  {
    name: "Innovation",
    icon: Lightbulb,
    copy: "Making groundbreaking products for residential, commercial and institutional sectors, engineering systems that are fire-resistant, moisture-resistant and built for Pakistan's climate.",
  },
];

export default function Pillars() {
  return (
    <section className="border-y border-warm bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
          At United Gypsum, we continuously strive for
        </p>
        <div className="mx-auto mt-10 grid max-w-6xl gap-12 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.name} className="text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red">
                <p.icon className="h-10 w-10 text-white" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-grey">
                {p.name}
              </h3>
              <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-relaxed text-grey">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

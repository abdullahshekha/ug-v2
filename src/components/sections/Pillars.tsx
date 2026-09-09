const pillars = [
  {
    name: "Quality",
    copy: "Exceptional quality of gypsum products, delighting our customers.",
  },
  {
    name: "Loyalty",
    copy: "Tackling customer issues at the ground level, and thus gaining customer loyalty.",
  },
  {
    name: "Innovation",
    copy: "Making groundbreaking products for residential, commercial and institutional sectors.",
  },
];

export default function Pillars() {
  return (
    <section className="border-y border-warm bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-800">
          At United Gypsum, we continuously strive for
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-10 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.name} className="text-center">
              <h3 className="text-2xl font-extrabold tracking-tight text-plaster-800">
                {p.name}
              </h3>
              <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-plaster-600">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

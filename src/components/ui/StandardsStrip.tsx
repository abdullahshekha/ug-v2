import SectionHeading from "@/components/ui/SectionHeading";

const standards = [
  "ISO 9001-2015",
  "ISO 14001-2015",
  "ASTM C472",
  "ASTM C473",
  "ASTM C474",
  "ASTM D3763",
];

export default function StandardsStrip() {
  return (
    <section className="border-y border-warm bg-mist">
      <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <SectionHeading
          eyebrow="Standards and compliance"
          title="Manufactured to international standards"
          lead="Every product is made in accordance with the ISO 9001-2015 quality management system and complies with ASTM requirements. Manufacturing is at Port Qasim, Karachi."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {standards.map((s) => (
            <li
              key={s}
              className="rounded-full border border-warm bg-white px-4 py-2 text-sm font-bold text-grey"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

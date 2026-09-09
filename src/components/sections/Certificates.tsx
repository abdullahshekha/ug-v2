import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Each certificate opens its full scan/PDF in a new tab. Provide the document as
 * `file` and, when it is a PDF, an image `thumb` for the gallery tile. Files live
 * in `public/certificates/`; a card renders only when `file` exists.
 */
const certificates = [
  {
    file: "iso-9001-2015.pdf",
    thumb: "iso-9001-2015.jpg",
    title: "ISO 9001-2015",
    caption: "Quality Management System",
  },
  {
    file: "iso-14001-2015.pdf",
    thumb: "iso-14001-2015.jpg",
    title: "ISO 14001-2015",
    caption: "Environmental Management System",
  },
  {
    file: "astm-conformance.pdf",
    thumb: "astm-conformance.jpg",
    title: "ASTM Conformance",
    caption: "C472 / C473 / C474 / D3763",
  },
];

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

export default function Certificates() {
  const dir = path.join(process.cwd(), "public", "certificates");
  const exists = (name: string) => {
    try {
      fs.accessSync(path.join(dir, name));
      return true;
    } catch {
      return false;
    }
  };

  const available = certificates
    .filter((c) => exists(c.file))
    .map((c) => {
      const thumb = c.thumb && exists(c.thumb) ? c.thumb : null;
      const fallbackThumb = IMAGE_EXT.test(c.file) ? c.file : null;
      return { ...c, resolvedThumb: thumb ?? fallbackThumb };
    });

  if (available.length === 0) {
    return (
      <section className="bg-plaster-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            eyebrow="Compliance"
            title="Certifications and standards"
            lead="United Gypsum manufactures to ISO 9001-2015 and ISO 14001-2015, and its products comply with ASTM C472, C473, C474 and D3763. Certificates are published here as they are issued."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-plaster-100">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Compliance"
          title="Certifications and standards"
          lead="Click a certificate to open the full document."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((c) => (
            <a
              key={c.file}
              href={`/certificates/${c.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-3xl border border-warm bg-white shadow-plaster transition-transform hover:-translate-y-1"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-plaster-50">
                {c.resolvedThumb ? (
                  <Image
                    src={`/certificates/${c.resolvedThumb}`}
                    alt={`${c.title} certificate`}
                    width={600}
                    height={450}
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ShieldCheck className="h-14 w-14 text-brand-300" />
                )}
              </div>
              <div className="border-t border-warm p-5">
                <h3 className="text-sm font-extrabold text-plaster-800">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-plaster-500">{c.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

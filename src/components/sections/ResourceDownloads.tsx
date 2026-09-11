import fs from "node:fs";
import path from "node:path";
import { FileText, Download } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Known documents. A card renders only when its file actually exists in
 * `public/resources/`: drop the PDFs in there and they appear automatically.
 * Add new entries here as more documents are supplied.
 */
const catalogue = [
  {
    file: "company-profile.pdf",
    title: "Company Profile",
    subtitle: "Business overview and quality policy",
  },
  {
    file: "application-booklet.pdf",
    title: "Application Booklet",
    subtitle: "Systems, details and installation guidance",
  },
  {
    file: "product-catalogue.pdf",
    title: "Product Catalogue",
    subtitle: "The full gypsum product range",
  },
  {
    file: "ceiling-panel-shade-card.pdf",
    title: "Ceiling Panel Shade Card",
    subtitle: "Laminate patterns and finishes",
  },
  {
    file: "gypsum-board-data-sheet.pdf",
    title: "Gypsum Board Data Sheet",
    subtitle: "Technical specification",
  },
  {
    file: "accessories-data-sheets.pdf",
    title: "Accessories Data Sheets",
    subtitle: "Filler, tape, screws and bead",
  },
  {
    file: "dealership-application-form.pdf",
    title: "Dealership Application Form",
    subtitle: "Terms and application for prospective dealers",
  },
  {
    file: "projects-portfolio.pdf",
    title: "Projects Portfolio",
    subtitle: "223+ landmark projects across Pakistan",
  },
];

export default function ResourceDownloads() {
  const dir = path.join(process.cwd(), "public", "resources");
  const available = catalogue.filter((doc) => fs.existsSync(path.join(dir, doc.file)));

  return (
    <section className="bg-white">
      <div className="px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Resources"
          title="Downloads and documentation"
          lead="Profiles, catalogues and technical data sheets, free to download, no form."
        />

        {available.length > 0 ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((doc) => (
              <a
                key={doc.file}
                href={`/resources/${doc.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold text-grey">
                    {doc.title}
                  </span>
                  <span className="block truncate text-xs text-grey">
                    PDF &middot; {doc.subtitle}
                  </span>
                </span>
                <Download className="h-4 w-4 flex-shrink-0 text-grey transition-colors group-hover:text-red" />
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-warm bg-mist p-6 text-sm text-grey">
            Document downloads are being prepared and will appear here shortly.
          </p>
        )}
      </div>
    </section>
  );
}

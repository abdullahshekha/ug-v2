import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.unitedgypsum.com"),
  title: "United Gypsum — Finest gypsum products for your innovations",
  description:
    "United Gypsum can meet all your construction demands with our comprehensive product line including Gypsum Boards, Ceiling Panel, Grids, and Drywall accessories.",
  keywords: [
    "gypsum board Pakistan",
    "buy gypsum board",
    "ceiling panel",
    "suspended ceiling grid",
    "drywall accessories",
    "United Gypsum",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "United Gypsum — Finest gypsum products for your innovations",
    description:
      "United Gypsum can meet all your construction demands with our comprehensive product line including Gypsum Boards, Ceiling Panel, Grids, and Drywall accessories.",
    url: "https://www.unitedgypsum.com/",
    siteName: "United Gypsum",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "United Gypsum — Finest gypsum products for your innovations",
    description:
      "Comprehensive gypsum product line: Gypsum Boards, Ceiling Panels, Grids and Drywall accessories.",
  },
  robots: "index, follow",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.unitedgypsum.com/#organization",
  name: "United Gypsum (Pvt.) Ltd.",
  url: "https://www.unitedgypsum.com/",
  foundingDate: "2014",
  slogan: "The smarter way to build",
  email: "info@unitedgypsum.com",
  telephone: ["+92-21-34123301", "+92-21-34123302", "+92-300-0566858"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-22, 23 & 24 NWIZ, Port Qasim",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  sameAs: [
    "https://facebook.com/unitedgypsum",
    "https://instagram.com/unitedgypsumpvtltd",
    "https://linkedin.com/company/united-gypsum",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-montserrat antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}

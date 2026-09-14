/**
 * Rich, standalone content for the 5 Smart Gypsum Board variant pages
 * (nested under /smart-gypsum-board/<slug>/). Data transcribed from the
 * client-supplied "Gypsum Boards Brochure Printable.pdf" and "Company
 * Profile Final.pdf" (see Documents/PDFs/), which carry a features list,
 * a size and weight table, and a lab test-results table for Standard,
 * Moisture Resistant, Fire Resistant and Heat Resistant. Perforated
 * (Smart Echo Shield) has no equivalent client spec sheet, so it keeps
 * only the description and feature copy already used on the flagship
 * Smart Gypsum Board page; no test data is invented for it.
 *
 * The main flagship page's `products.ts` "range" cards link out to
 * these pages; this file is intentionally separate from `Product`
 * since these records carry fields (standards, test results) the other
 * 7 products don't have.
 */

import type { Spec } from "@/components/ui/SpecTable";

export interface BoardVariant {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  image: string;
  metaDescription: string;
  /** ASTM/EN/BS standards this variant is tested and manufactured to. */
  standards?: string[];
  features: string[];
  sizeSpec?: Spec;
  testResults?: Spec;
  /** Used only by Heat Resistant, which is a foil back liner layered onto
   * another board type rather than a distinct core product. */
  layeredNote?: string;
  /** A real application photo (from the client's brochure) showing the kind
   * of space this variant is used in. */
  applicationImage?: { src: string; alt: string };
  /** Used only by Heat Resistant: the "conventional vs Smart Heat Resistant
   * ceiling" comparison diagram from the guide book. */
  diagramImage?: { src: string; alt: string };
}

export const boardVariants: Record<string, BoardVariant> = {
  standard: {
    slug: "standard",
    name: "Standard",
    tagline:
      "For interior walls, partitions and ceilings with no special fire or moisture demands.",
    intro:
      "Smart Standard Gypsum Board is primarily composed of gypsum and contains an incombustible core covered with extra tough paper on both sides, giving it strength and durability. It is manufactured to meet the specific demands of customers while complying with international standards, and its development through precision engineering of the highest quality materials makes it a quality assured product. It is suitable for interior walls, partitions and ceilings that require no special protection from fire or moisture.",
    metaDescription:
      "Smart Standard Gypsum Board: incombustible gypsum core, extra-tough paper facing, made to ASTM C471/C472/C473/C1396. Full size table and lab test results.",
    image: "/images/board-variant-standard.png",
    standards: ["ASTM C471", "ASTM C472", "ASTM C473", "ASTM C1396"],
    features: [
      "Convenient and lightweight",
      "Quick and efficient wall renovation",
      "Immaculate and flawless surface finish",
      "Effortless setup of plumbing and electrical circuitry",
      "Low thermal conductivity and fire resistant",
    ],
    sizeSpec: {
      columns: [
        "Thickness",
        "Metric size (mm)",
        "Imperial size (mm)",
        "Weight approx. (kg/sheet)",
      ],
      rows: [
        ["7 mm", "1200 x 2400", "1220 x 2440", "14"],
        ["9 mm", "1200 x 2400", "1220 x 2440", "19"],
        ["12 mm", "1200 x 2400", "1220 x 2440", "25"],
        ["15 mm", "1200 x 2400", "1220 x 2440", "30"],
      ],
      note: "Sizes are also available in 1200 x 1800 mm on request. Confirm current figures with United Gypsum before ordering.",
    },
    testResults: {
      columns: ["Parameter", "Result (12 mm board)"],
      rows: [
        ["Free water content", "0.23%"],
        ["Weight", "8.047 kg/m2"],
        ["Thermal conductivity", "0.0475 W/mK"],
        ["Density", "669 kg/m3"],
        ["Impact resistance", "0.78 J"],
        [
          "Fire resistance",
          "Pass, non combustible (thermally decomposed 50% or less at 750C for 1 hour)",
        ],
        [
          "Flame spread classification",
          "Flame spread index 0.00051 ft/min, without smoke",
        ],
        ["Breaking strength, horizontal", "564 N (126.9 lb f)"],
        ["Breaking strength, vertical", "523 N (117.7 lb f)"],
        ["Compressive strength, horizontal", "4.6 MPa (667 psi)"],
        ["Compressive strength, vertical", "4.5 MPa (653 psi)"],
        ["Flexural strength, horizontal", "4.95 MPa (718 psi)"],
        ["Flexural strength, vertical", "4.37 MPa (634 psi)"],
        ["Nail pull resistance, screw", "277 N (62.3 lb f)"],
        ["End hardness", "99.6 N (22.41 lb f)"],
        ["Core hardness", "101 N (22.7 lb f)"],
        ["Edge hardness", "87.3 N (19.6 lb f)"],
      ],
      note: "Published by United Gypsum for 12 mm board. Figures are indicative; confirm current test data with United Gypsum.",
    },
    applicationImage: {
      src: "/images/board-standard-application.jpg",
      alt: "Curved gypsum board ceiling in a hotel lobby, an application of Smart Standard Gypsum Board",
    },
  },

  "moisture-resistant": {
    slug: "moisture-resistant",
    name: "Moisture Resistant",
    tagline:
      "For walls, partitions and ceilings that need extra protection from moisture.",
    intro:
      "Smart Moisture Resistant Gypsum Board is an ideal choice for walls, partitions and ceilings that need additional protection from moisture. This special board consists of a blend of wax and a silicone compound enclosed in tough green paper on the surfaces, which strengthens walls, partitions and ceilings to endure moist and damp surroundings.",
    metaDescription:
      "Smart Moisture Resistant Gypsum Board: green-paper faced, wax and silicone core, under 5% two-hour water absorption. Made to ASTM C471/C472/C473/C1396, EN 520 and E119.",
    image: "/images/board-variant-moisture-resistant.png",
    standards: [
      "ASTM C471",
      "ASTM C472",
      "ASTM C473",
      "ASTM C1396",
      "EN 520",
      "ASTM E119",
    ],
    features: [
      "Convenient and lightweight",
      "High humidity resistance: under 5% two hour water absorption",
      "Good thermal performance and non combustible",
      "A consistent core for added strength and durability",
      "Good acoustic performance: STC 35 to 60 dB when installed with insulation",
    ],
    sizeSpec: {
      columns: [
        "Thickness",
        "Metric size (mm)",
        "Imperial size (mm)",
        "Weight approx. (kg/sheet)",
      ],
      rows: [
        ["12 mm", "1200 x 1800", "1220 x 1830", "20"],
        ["12 mm", "1200 x 2400", "1220 x 2440", "25"],
        ["15 mm", "1200 x 2400", "1220 x 2440", "32"],
      ],
      note: "Confirm current figures with United Gypsum before ordering.",
    },
    testResults: {
      columns: ["Parameter", "Result (12 mm board)"],
      rows: [
        ["2 hour water absorption (under 5%)", "2.88%"],
        ["Weight", "8.047 kg/m2"],
        ["Thermal conductivity", "0.0475 W/mK"],
        [
          "Flame spread classification",
          "Flame spread index 0.00051 ft/min, without smoke",
        ],
        [
          "Fire resistance",
          "Pass, non combustible (25% or less degraded at 750C for 2 hours)",
        ],
        ["End hardness (minimum 49 N)", "269 N"],
        ["Edge hardness (minimum 49 N)", "248 N"],
        ["Core hardness (minimum 49 N)", "277 N"],
      ],
      note: "Published by United Gypsum for 12 mm board. Figures are indicative; confirm current test data with United Gypsum.",
    },
    applicationImage: {
      src: "/images/board-moisture-application.jpg",
      alt: "Bathroom with a Smart Moisture Resistant Gypsum Board ceiling and walls",
    },
  },

  "fire-resistant": {
    slug: "fire-resistant",
    name: "Fire Resistant",
    tagline: "For walls, partitions and ceilings that need extra protection from fire.",
    intro:
      "Smart Fire Resistant Gypsum Board is an excellent choice for walls, partitions and ceilings that need extra protection from fire. It contains an incombustible fibre added to gypsum, enclosed within a tough, cohesive, compressed pink paper that adds strength. This specialized board has been precisely tailored and rigorously tested to meet various fire rating requirements, and is strongly recommended for fire escape stairs, computer rooms, elevators and interior walls of buildings.",
    metaDescription:
      "Smart Fire Resistant Gypsum Board: pink-paper faced, incombustible core, 60 to 180 minutes fire rating. Made to ASTM C471/C472/C473/C1396 and E119.",
    image: "/images/board-variant-fire-resistant.png",
    standards: ["ASTM C471", "ASTM C472", "ASTM C473", "ASTM C1396", "ASTM E119"],
    features: [
      "60 to 180 minutes of fire rating",
      "Restrains combustion until total calcination",
      "Sound insulation comparable to Smart Standard Board",
      "Installs with United Gypsum's concealed ceiling metal furring channels and drywall accessories",
    ],
    sizeSpec: {
      columns: [
        "Thickness",
        "Metric size (mm)",
        "Imperial size (mm)",
        "Weight approx. (kg/sheet)",
      ],
      rows: [
        ["12 mm", "1200 x 1800", "1220 x 1830", "24"],
        ["12 mm", "1200 x 2400", "1220 x 2440", "30"],
        ["15 mm", "1200 x 2400", "1220 x 2440", "35"],
      ],
      note: "Confirm current figures with United Gypsum before ordering.",
    },
    testResults: {
      columns: ["Parameter", "Result"],
      rows: [
        ["Weight (12 mm board)", "10.02 kg/m2"],
        ["Thermal conductivity (12 mm board)", "0.0473 W/mK"],
        [
          "Flame spread classification",
          "Flame spread index 0.00017 ft/min, without smoke",
        ],
        [
          "Fire resistance, 12 mm",
          "Pass, non combustible (23% or less decomposed at 750C for 2 hours)",
        ],
        [
          "Fire resistance, 15 mm",
          "Pass, non combustible (22% or less decomposed at 750C for 2.5 hours)",
        ],
        ["Acoustics", "Sound protection STC 35 to 60 dB when installed with insulation"],
      ],
      note: "Published by United Gypsum. Figures are indicative; confirm current test data with United Gypsum.",
    },
    applicationImage: {
      src: "/images/board-fire-application.jpg",
      alt: "Data centre server room, an application of Smart Fire Resistant Gypsum Board",
    },
  },

  "heat-resistant": {
    slug: "heat-resistant",
    name: "Heat Resistant",
    tagline:
      "A foil-backed liner that reflects 95% of thermal radiation, layered onto any Smart Gypsum Board.",
    intro:
      "Smart Heat Resistant Gypsum Board offers effective interior heat insulation for exterior walls and upper-floor ceilings of commercial and residential buildings that are significantly impacted by heat and sunlight. Beneficial in both hot and cold climates, the board's back liner is attached to a specialized aluminium foil that reflects 95% of thermal radiation, keeping a comfortable interior temperature. It also acts as a reliable vapour retarder, preventing moisture penetration in walls and ceilings.",
    metaDescription:
      "Smart Heat Resistant Gypsum Board: aluminium foil back liner reflecting 95% of thermal radiation and acting as a vapour retarder. Layers onto Standard, Fire Resistant or Moisture Resistant board.",
    image: "/images/board-variant-heat-resistant.png",
    features: [
      "Reflects 95% of thermal radiation",
      "Effective in both hot and cold climates",
      "Acts as a reliable vapour retarder against moisture penetration",
      "Layers onto Standard, Fire Resistant or Moisture Resistant board",
    ],
    layeredNote:
      "Heat Resistant is a foil back liner rather than a separate core product: it is preferred for areas that need additional heat control and can be incorporated into all Smart Gypsum Boards, including Standard, Fire Resistant and Moisture Resistant, at the same thicknesses and sizes shown on those pages.",
    applicationImage: {
      src: "/images/board-heat-application.jpg",
      alt: "Attic loft room with a skylight, an application of Smart Heat Resistant Gypsum Board",
    },
    diagramImage: {
      src: "/images/board-heat-diagram.png",
      alt: "Diagram comparing a conventional ceiling to a Smart Heat Resistant ceiling reflecting sunlight",
    },
  },

  perforated: {
    slug: "perforated",
    name: "Perforated (Smart Echo Shield)",
    tagline:
      "A perforated board that absorbs and diffuses sound for auditoriums, cinemas and open-plan offices.",
    intro:
      "Smart Echo Shield is a perforated gypsum board that absorbs and diffuses sound, cutting reverberation in auditoriums, cinemas, conference rooms, open-plan offices, music studios, home theatres and other large or noisy spaces such as lobbies, atriums and factories. It keeps the fire and durability performance of a Smart Standard Board, and is the recommended board for the Ceiling Calculator's Auditorium and Conference Room room types.",
    metaDescription:
      "Smart Echo Shield: perforated acoustic gypsum board with an NRC of 0.65 to 0.70, for auditoriums, cinemas, conference rooms, music studios and open-plan offices.",
    image: "/images/board-variant-perforated.png",
    features: [
      "Perforated face that absorbs and diffuses sound",
      "Noise Reduction Coefficient (NRC) of 0.65 to 0.70",
      "Up to 0.85 NRC when installed with glass wool insulation",
      "Cuts reverberation in large or hard-surfaced rooms",
      "Keeps the fire and durability performance of Smart Standard Board",
      "Available in cross-hole (UGP-01) and parallel-hole (UGP-02, UGP-03) patterns",
    ],
    sizeSpec: {
      columns: ["Thickness", "Metric size (mm)"],
      rows: [
        ["9 mm", "1220 x 2440"],
        ["12 mm", "1220 x 2440"],
        ["15 mm", "1220 x 2440"],
      ],
      note: "Special sizes available on request. Confirm current figures with United Gypsum before ordering.",
    },
    testResults: {
      columns: ["Parameter", "Result"],
      rows: [
        [
          "Sound absorption (NRC)",
          "0.65 to 0.70, up to 0.85 when installed with glass wool insulation",
        ],
        ["Fire resistance", "Incombustibility Grade 1"],
      ],
      note: "Published by United Gypsum. Finish with Smart Filler, Smart Tape and Smart Bead, and do not paint inside the perforated holes.",
    },
  },
};

export const boardVariantSlugs = Object.keys(boardVariants);

export function getBoardVariant(slug: string): BoardVariant | undefined {
  return boardVariants[slug];
}

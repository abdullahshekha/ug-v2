/**
 * Product content for the 8 product pages. Copy transcribed from the saved
 * WordPress product pages in the repo root. Spec-table figures are reproduced as
 * published there; some had merged cells and should be re-confirmed against the
 * current UG data sheets (see CLAUDE.md section 11).
 */

export type AccessoryIconName =
  | "Layers"
  | "Ruler"
  | "Wrench"
  | "SquareStack"
  | "CornerDownRight";

export interface ProductSpec {
  columns: string[];
  rows: string[][];
  note?: string;
}

export interface ProductVariant {
  name: string;
  badge?: string;
  body: string;
  image?: string;
  /** Slug of a dedicated variant page under /smart-gypsum-board/<slug>/,
   * see src/lib/boardVariants.ts. When set, the card links there instead
   * of only showing this inline body copy. */
  slug?: string;
}

export interface ProductNote {
  title: string;
  body: string;
}

export interface Product {
  slug: string;
  name: string;
  kind: "flagship" | "accessory";
  tagline: string;
  intro: string;
  metaDescription: string;
  highlights?: string[];
  image?: string;
  /** How the intro image should fit its frame. Defaults to "cover" (a full-bleed
   * photo); use "contain" for a transparent product render that needs to sit on
   * its own background rather than crop to fill. */
  imageFit?: "cover" | "contain";
  iconName?: AccessoryIconName;
  variants?: ProductVariant[];
  finishes?: string[];
  sizes?: string[];
  application?: string;
  spec?: ProductSpec;
  notes?: ProductNote[];
  related: string[];
  /** Filename in public/resources/. The CTA renders only if the file exists. */
  dataSheet?: string;
}

export const products: Record<string, Product> = {
  "smart-gypsum-board": {
    slug: "smart-gypsum-board",
    name: "Smart Gypsum Board",
    kind: "flagship",
    tagline:
      "Incombustible gypsum core, extra-tough paper facing, built to ASTM.",
    intro:
      "Smart Gypsum Board, our flagship product, contains gypsum and an incombustible core covered with extra-tough paper on both sides that gives it strength and durability. It is manufactured in coherence with ASTM standards including ASTM C472, C473, C474 and D3763, and developed with superior raw materials and precision engineering for a comprehensive range of uses.",
    metaDescription:
      "Smart Gypsum Board: incombustible core, extra-tough paper facing, made to ASTM C472/C473/C474/D3763. Standard, Fire Resistant, Moisture Resistant, Heat Resistant and Perforated boards in 7, 9, 12 and 15 mm.",
    image: "/images/flagship-gypsum-board.png",
    imageFit: "contain",
    highlights: [
      "ASTM C472 / C473 / C474 / D3763",
      "Incombustible gypsum core",
      "Extra-tough paper both sides",
      "Standard, Fire, Moisture, Heat and Perforated",
    ],
    variants: [
      {
        name: "Standard",
        body: "Smart Standard Gypsum Board is ideal for interior walls, partitions and ceilings that require no special protection from fire or moisture.",
        image: "/images/board-variant-standard.png",
        slug: "standard",
      },
      {
        name: "Fire Resistant",
        body: "An exceptional choice for walls, partitions and ceilings that need extra fire protection. An incombustible fibre is added to the gypsum and enclosed within tough pink compressed paper, tailored and tested to global fire-rating requirements. Recommended for fire escape stairs, computer rooms, elevators and interior building walls.",
        image: "/images/board-variant-fire-resistant.png",
        slug: "fire-resistant",
      },
      {
        name: "Moisture Resistant",
        body: "A superlative choice where walls, partitions and ceilings need extra protection from moisture. A blend of wax and silicone compound is enclosed by tough green paper so the board can endure damp surroundings.",
        image: "/images/board-variant-moisture-resistant.png",
        slug: "moisture-resistant",
      },
      {
        name: "Heat Resistant",
        body: "Great for interior insulation of exterior walls. In cold climates it acts as an effective vapour retarder, preventing interior moisture from penetrating wall and ceiling spaces. The back liner carries an aluminium foil sheet that reflects 95% of thermal radiation.",
        image: "/images/board-variant-heat-resistant.png",
        slug: "heat-resistant",
      },
      {
        name: "Perforated (Smart Echo Shield)",
        body: "A perforated gypsum board that absorbs and diffuses sound, cutting reverberation in auditoriums, cinemas, conference rooms and open-plan offices while keeping the fire and durability performance of a standard board.",
        image: "/images/board-variant-perforated.png",
        slug: "perforated",
      },
    ],
    spec: {
      columns: [
        "Thickness",
        "Metric size (mm)",
        "Imperial size (mm)",
        "Weight approx. (kg/sheet)",
        "20 ft container loading",
      ],
      rows: [
        ["9 mm", "1200 x 1800", "1220 x 1830", "14", "1400 sheets"],
        ["12 mm", "1200 x 1800", "1220 x 1830", "19", "1050 sheets"],
        ["9 mm", "1200 x 2400", "1220 x 2440", "21", "900 sheets"],
        ["12 mm", "1200 x 2400", "1220 x 2440", "25", "680 sheets"],
        ["15 mm", "1200 x 2400", "1220 x 2440", "30", "580 sheets"],
      ],
    },
    notes: [
      {
        title: "Edges",
        body: "Available in two edge types. Square edge suits interior walls and ceilings with no jointing required. Tapered edge gives space to firmly fix joint filler and tape for a smooth, level finish where jointing is required.",
      },
      {
        title: "Storage",
        body: "Store in cool, dry, well-ventilated conditions. Place supports every 50 cm so the board is never in direct contact with the floor.",
      },
      {
        title: "Limitations",
        body: "Not recommended for areas exposed to constant moisture or extreme dampness such as saunas, steam rooms and swimming pools. Additional sizes available on special order.",
      },
      {
        title: "Suspended ceiling installation",
        body: "Screw the wall angle to the perimeter, suspend primary channels from the soffit at 1220 mm centres, then fix furring channels to those at 610 mm centres. Screw board to the furring channels with 25 mm Smart Screws at 230 mm centres, then tape and fill the joints with Smart Tape and Smart Filler.",
      },
    ],
    related: ["smart-ceiling-panel", "smart-grid", "smart-filler"],
    dataSheet: "gypsum-board-data-sheet.pdf",
  },

  "smart-ceiling-panel": {
    slug: "smart-ceiling-panel",
    name: "Smart Ceiling Panel",
    kind: "flagship",
    tagline: "Non-combustible gypsum core with a wide range of vinyl laminates.",
    intro:
      "Smart Ceiling Panel is built around a non-combustible gypsum core bound by tough paper on both sides. It comes in a wide range of exquisite vinyl laminates that are attractive, cost-efficient and durable. The vinyl foils are rated Class 2 in the Flame Spread Test to British Standard 476 Part 7: 1971. Panels can be supplied with front PVC laminated to a paper backing, or with a polished aluminium foil backing.",
    metaDescription:
      "Smart Ceiling Panel: non-combustible gypsum core, Class 2 flame spread (BS 476-7), vinyl-laminated or foil-backed, in 595 x 595 mm and 595 x 1195 mm.",
    image: "/images/flagship-ceiling-panel.png",
    imageFit: "contain",
    highlights: [
      "Non-combustible gypsum core",
      "Class 2 flame spread (BS 476 Part 7)",
      "Vinyl-laminated, foil-backed or perforated acoustic",
      "595 x 595 mm and 595 x 1195 mm",
      "ASTM E136 and C1396",
    ],
    variants: [
      {
        name: "Vinyl laminated",
        body: "Comes in high-quality vinyl laminates in embossed, plain and printed patterns that can match or contrast with the surrounding layout. Easy to clean, gives abundant light reflection and needs no further embellishment.",
        image: "/images/panel-vinyl-laminated.png",
      },
      {
        name: "Foil backed",
        body: "Back liners are joined to a sheet of aluminium foil that impedes heat flow, acts as a vapour retarder and reflects thermal radiation. Ideal for top floors of commercial and residential buildings directly exposed to heat and sunlight during Pakistan's hot summers.",
        image: "/images/panel-foil-backed.png",
      },
      {
        name: "Perforated (Smart EchoShield)",
        body: "An acoustic vinyl-laminated tile with a perforated face that absorbs and diffuses sound, with a Noise Reduction Coefficient of 0.65 to 0.70 (up to 0.85 when installed with glass wool insulation). Ideal for music studios, home theatres, offices, seminar rooms, factories, lobbies, atriums and auditoriums. Available in 603 x 603 mm at 7, 9 and 12 mm thickness, in cross-hole (UGT-01) and parallel-hole (UGT-02, UGT-03) patterns.",
      },
    ],
    finishes: [
      "Super White",
      "Frost Premium",
      "Frost",
      "Teak",
      "Walnut",
      "Sea Sand",
      "Ash White",
      "Elefoil",
      "Fissured",
      "Pinhole",
      "Granular",
      "Almas",
      "Almas Gold",
      "Almas Silver",
      "Almas Purple",
      "Axis",
      "Axis Gold",
      "Al-Islam",
      "Bamboo",
      "Flora",
      "Palm Gold",
      "Palm Silver",
      "Diamond",
      "Knit",
      "Link",
      "Link Gold",
    ],
    spec: {
      columns: [
        "Thickness (mm)",
        "Metric size (mm)",
        "Imperial size (mm)",
        "Packing",
      ],
      rows: [
        ["7", "600 x 600", "603 x 603", "10 pcs / carton"],
        ["8", "600 x 600", "603 x 603", "8 pcs / carton"],
        ["9", "600 x 600", "603 x 603", "8 pcs / carton"],
        ["9", "600 x 1200", "603 x 1206", "6 pcs / carton"],
        ["12", "600 x 600", "603 x 603", "6 pcs / carton"],
        ["12", "600 x 1200", "603 x 1206", "4 pcs / carton"],
        ["15", "600 x 600", "603 x 603", "4 pcs / carton"],
      ],
      note: "Some sizes are made to special order and taken in advance. Specifications are indicative; confirm current figures with United Gypsum before ordering.",
    },
    notes: [
      {
        title: "Standards and test results",
        body: "Made to ASTM E136 and C1396. Thermal conductivity 0.0798 W/mK. Passes non-combustibility (50% or less thermally decomposed at 750C for 1 hour).",
      },
      {
        title: "Perforated finish (Smart EchoShield)",
        body: "Fire resistance is Incombustibility Grade 1. Finish with Smart Filler, Smart Tape and Smart Bead, and do not paint inside the perforated holes.",
      },
    ],
    related: ["smart-grid", "smart-gypsum-board", "smart-access"],
    dataSheet: "ceiling-panel-shade-card.pdf",
  },

  "smart-grid": {
    slug: "smart-grid",
    name: "Smart Grid",
    kind: "flagship",
    tagline: "Galvanized steel T-bar systems for suspended and false ceilings.",
    intro:
      "The Smart Grid suspended ceiling system (T-bar) is manufactured from galvanized steel coated with zinc to prevent corrosion through rusting. The underside carries a thick polyester coating that keeps it durable and able to withstand climatic changes. It is available as two systems.",
    metaDescription:
      "Smart Grid suspended ceiling T-bar in galvanized, zinc-coated steel with a polyester top coat. Grid 38 Premium for large spans, Grid 32 Standard for shops and small offices.",
    image: "/images/flagship-grid.png",
    imageFit: "contain",
    highlights: [
      "Galvanized, zinc-coated steel",
      "Thick polyester top coat",
      "Interlocked main and cross tees",
      "Grid 38 Premium and Grid 32 Standard",
    ],
    variants: [
      {
        name: "Smart Grid 38",
        badge: "Premium",
        body: "Uniquely designed with interlocked main and cross tees, making it ideal for suspended and false ceilings in buildings, cinema halls, auditoriums and warehouses.",
      },
      {
        name: "Smart Grid 32",
        badge: "Standard",
        body: "A simple design of interlocked main and cross tees in light-weight galvanized metal, suitable for false ceilings of small areas such as retail shops and small offices.",
      },
    ],
    spec: {
      columns: ["Component", "Dimensions", "Thickness"],
      rows: [
        ["Main runner", "38 mm H x 24 mm W x 3660 mm L", "0.23 mm"],
        ["Cross runner, long", "26 mm H x 24 mm W x 1220 mm L", "0.23 mm"],
        ["Cross runner, short", "26 mm H x 24 mm W x 610 mm L", "0.23 mm"],
        ["Wall angle", "22 mm H x 22 mm W x 3050 mm L", "0.23 mm"],
      ],
      note: "Published by United Gypsum for Smart Grid 38 Premium. Confirm current figures with United Gypsum before ordering.",
    },
    notes: [
      {
        title: "Installation",
        body: "Suspend the main runner from the soffit with hanging wire, interlock the cross tees to form the grid, and screw the wall angle around the room perimeter. Smart Tile or Smart Gypsum Board then lays into or fixes onto the finished grid.",
      },
    ],
    related: ["smart-ceiling-panel", "smart-gypsum-board", "smart-access"],
  },

  "smart-filler": {
    slug: "smart-filler",
    name: "Smart Filler",
    kind: "accessory",
    tagline: "Ready-mixed joint compound for flush jointing and a painted finish.",
    intro:
      "A quality board deserves expert jointing and a smooth finish. Smart Filler ready mixture is a pre-mixed compound for plasterboards and ceilings with adhesive properties that dries to a hard, smooth, paintable surface.",
    metaDescription:
      "Smart Filler: ready-mixed joint compound for flush jointing and finishing plasterboard. Complies with ASTM C475 and C840. 5 kg and 26 kg buckets.",
    image: "/images/accessory-filler.png",
    iconName: "Layers",
    application:
      "Can also be applied over the drywall surface for a glossy finish, and used directly with no mixing or added water. Recommended for commercial, residential and industrial use, and for patching and enhancing other interior surfaces.",
    spec: {
      columns: ["Property", "Detail"],
      rows: [
        ["Type", "Joint filler, ready mixed"],
        ["Time between coats", "12-24 hours (depends on local conditions)"],
        [
          "Average consumption",
          "1.75 kg/m² per mm thickness, depending on substrate",
        ],
        ["Container volume", "5 kg and 26 kg plastic bucket"],
        [
          "Storage",
          "Keep in a dry place away from high humidity, direct heat and sunlight",
        ],
        ["Shelf life", "Best before 8 months from manufacturing date"],
        ["Standards", "Complies with ASTM C475 and ASTM C840"],
      ],
    },
    related: ["smart-tape", "smart-bead", "smart-screws"],
  },

  "smart-tape": {
    slug: "smart-tape",
    name: "Smart Tape",
    kind: "accessory",
    tagline:
      "Self-adhesive fiberglass mesh tape that resists cracking and shrinkage.",
    intro:
      "This self-adhesive fiberglass tape reinforces corners and drywall joints. Made from a thin, light but very strong fiberglass mesh, Smart Tape resists shrinkage, shredding, stretching and deformation, and its high tensile strength forms a crack-resistant bond where ordinary mesh tape would fail.",
    metaDescription:
      "Smart Tape: self-adhesive fiberglass mesh drywall joint tape. High tensile strength, alkaline-resistant, for joints, holes and cracks in drywall and plaster.",
    image: "/images/accessory-tape.png",
    iconName: "Ruler",
    application:
      "Suitable for covering joints between drywall panels, with quick application and no separate bedding coat needed. Primarily recommended for patching holes and cracks in drywall and plaster interiors.",
    spec: {
      columns: ["Property", "Detail"],
      rows: [
        ["Mesh size", "9 x 9 mesh / 3.20 x 3.20 mm / 2.85 x 2.85 mm"],
        ["Warp of yarn", "33 tex x 2"],
        ["Woof of yarn", "100 tex"],
        ["Average weight", ">65 g/m² (range 63-68 g/m²)"],
        ["Tensile strength", "Warp: 550 N / 50 mm"],
        ["Resin content", "26% - 28%"],
        [
          "Alkaline resistance",
          "After 28 days immersed in 5% NaOH solution, tensile fracture retention ≥ 70%",
        ],
      ],
    },
    related: ["smart-filler", "smart-bead", "smart-screws"],
  },

  "smart-screws": {
    slug: "smart-screws",
    name: "Smart Screws",
    kind: "accessory",
    tagline: "Fine-thread drywall screws for fixing board to metal studs.",
    intro:
      "Smart Screws are drywall screws with small, fine threads running the full length, used to attach drywall to metal studs. They give quick, firm fixing of plasterboard to the studs.",
    metaDescription:
      "Smart Screws: fine-thread carbon-steel drywall screws with bugle head, grey phosphate finish and self-drilling tips for fixing board to metal studs.",
    image: "/images/accessory-screws.png",
    iconName: "Wrench",
    spec: {
      columns: ["Property", "Detail"],
      rows: [
        ["Material", "Carbon steel"],
        ["Diameter", "#6"],
        ["Recess", "#2"],
        ["Thread", "Fine thread"],
        ["Type", "Bugle head, grey phosphate, self-drilling tips"],
      ],
    },
    related: ["smart-filler", "smart-tape", "smart-bead"],
  },

  "smart-access": {
    slug: "smart-access",
    name: "Smart Access",
    kind: "accessory",
    tagline: "Slim aluminium access panels for serviceable suspended ceilings.",
    intro:
      "Smart Access panels are built-in accessories fitted into ceilings: a slim, economical and aesthetically appealing solution. They are installed wherever a suspended ceiling needs permanent access for checking, inspection and modification.",
    metaDescription:
      "Smart Access: slim, white powder-coated aluminium ceiling access panels with a spring-loaded latch, in 300, 400 and 600 mm sizes.",
    image: "/images/accessory-access.png",
    iconName: "SquareStack",
    application:
      "Comes in sturdy aluminium profiles with a white powder coating. The spring-loaded latch unlocks easily by applying pressure to the flap on the latch side.",
    sizes: ["300 x 300 mm", "400 x 400 mm", "600 x 600 mm"],
    related: ["smart-ceiling-panel", "smart-grid", "smart-bead"],
  },

  "smart-bead": {
    slug: "smart-bead",
    name: "Smart Bead",
    kind: "accessory",
    tagline: "Paper-faced metal corner bead for strong, chip-resistant edges.",
    intro:
      "Drywall corner bead is made for finishing inside and outside drywall edges. Smart Bead paper-faced metal bead uses a high-quality paper tape laminated across two steel strips for a consistent, firm finish. It adheres easily to joint compounds, textures and paints, and the corrosion-resistant metal resists impact, cracking and chipping so corners stay in good condition through everyday wear.",
    metaDescription:
      "Smart Bead: paper-faced metal corner bead laminated across two steel strips. Corrosion-resistant, impact-resistant, ideal for archways and curves.",
    image: "/images/accessory-bead.png",
    iconName: "CornerDownRight",
    application:
      "Primarily for reinforcing corners and creating smooth, strong edges. Highly suitable for archways and curves.",
    spec: {
      columns: ["Property", "Unit", "Data"],
      rows: [
        ["Weight", "g/m", ">55"],
        ["Thickness", "mm", "0.30 ± 0.02"],
        ["Tensile strength", "kN/m", ">4.4"],
        ["Metal and paper peel-off", "kN/m", ">0.3"],
        ["Ash", "%", "5 - 7"],
        ["Water", "%", "4.5 - 5.5"],
        ["Thickness tolerance", "µm", "<10"],
        ["Steel strip width", "mm", "11"],
      ],
    },
    related: ["smart-filler", "smart-tape", "smart-screws"],
  },
};

export const productSlugs = Object.keys(products);

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

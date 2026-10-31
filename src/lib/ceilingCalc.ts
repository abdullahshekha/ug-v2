/**
 * Ceiling material calculator: pure estimation logic.
 *
 * The UI component (`src/components/sections/CeilingCalculator.tsx`) handles all
 * input state and unit conversion (feet <-> meters), then calls `calculate()` with
 * measurements already normalised to FEET. Keeping the maths here makes it testable
 * and lets us swap the constants once the Application Booklet is parsed.
 *
 * TODO: reconcile every value in CALC_CONFIG against the UG Application Booklet
 * (UG_Application_Booklet_Form_2020.pdf). Screws, tape, filler, panel size and
 * grid carton sizes now come from client-supplied figures; board coverage and
 * the grid layout rules are still first-pass.
 */

export type CeilingSystem = "board" | "panel" | "drywall";
export type LengthUnit = "feet" | "meters";

/**
 * Smart Gypsum Board variant, chosen indirectly through the room-type picker
 * (board system only, per the Gypsum Board Fabrication Guide): Standard for
 * general interior rooms, Moisture Resistant for bathrooms/laundry areas,
 * Fire Resistant for kitchens/server or plant rooms, and Heat Resistant
 * (a foil-backed option layered on any of the three) for attics/top floors
 * exposed to direct heat and sunlight.
 */
export type BoardType = "standard" | "moisture" | "fire" | "heat" | "perforated";

export const BOARD_TYPES: Record<
  BoardType,
  { label: string; image: string }
> = {
  standard: { label: "Standard Board", image: "/images/board-variant-standard.png" },
  moisture: {
    label: "Moisture Resistant Board",
    image: "/images/board-variant-moisture-resistant.png",
  },
  fire: { label: "Fire Resistant Board", image: "/images/board-variant-fire-resistant.png" },
  heat: { label: "Heat Resistant Board", image: "/images/board-variant-heat-resistant.png" },
  perforated: {
    label: "Perforated Board (Smart Echo Shield)",
    image: "/images/board-variant-perforated.png",
  },
};

export const ROOM_TYPES: {
  value: string;
  label: string;
  boardType: BoardType;
}[] = [
  { value: "living", label: "Bedroom / Living Room", boardType: "standard" },
  { value: "wet", label: "Bathroom / Laundry Area", boardType: "moisture" },
  { value: "hot-zone", label: "Kitchen / Server Room", boardType: "fire" },
  {
    value: "acoustic",
    label: "Auditorium / Conference Room (Acoustic)",
    boardType: "perforated",
  },
  { value: "attic", label: "Attic / Top Floor (Heat Exposed)", boardType: "heat" },
];

const PANEL_IMAGE = "/images/flagship-ceiling-panel.png";
const SCREW_IMAGE = "/images/accessory-screws.png";
const FILLER_IMAGE = "/images/accessory-filler.png";
const TAPE_IMAGE = "/images/accessory-tape.png";
const GRID_IMAGE = "/images/flagship-grid.png";
const ACCESS_IMAGE = "/images/accessory-access.png";

export interface CalcInput {
  system: CeilingSystem;
  /** Room length in feet (ceiling), or wall length in feet (drywall). */
  lengthFt: number;
  /** Room width in feet (ceiling), or wall height in feet (drywall). */
  widthFt: number;
  /** Board variant (board and drywall systems only); ignored for the panel system. */
  boardType?: BoardType;
  /** Access panels wanted (gypsum board system only). */
  accessPanels?: number;
}

export interface Unit {
  singular: string;
  plural: string;
}

export const UNITS = {
  board: { singular: "board", plural: "boards" },
  panel: { singular: "panel", plural: "panels" },
  box: { singular: "box", plural: "boxes" },
  bucket: { singular: "bucket", plural: "buckets" },
  roll: { singular: "roll", plural: "rolls" },
  piece: { singular: "pc", plural: "pcs" },
} as const satisfies Record<string, Unit>;

export interface BomLine {
  label: string;
  image: string;
  quantity: number;
  unit: Unit;
  /** Optional secondary detail shown below the quantity, e.g. total running feet. */
  note?: string;
}

/** Pick the singular or plural form of a unit for a given quantity. */
export function unitLabel(quantity: number, unit: Unit): string {
  return quantity === 1 ? unit.singular : unit.plural;
}

export interface BillOfMaterials {
  /** Echoed back for display: room footprint (ceiling) or single-face wall area (drywall). */
  areaSqFt: number;
  perimeterFt: number;
  /** Present for the drywall system: total board area once both faces are counted. */
  coveredAreaSqFt?: number;
  /** "Gypsum boards" or "Ceiling panels": the main covering unit. */
  primaryLabel: string;
  primaryCount: number;
  /** Nominal size text for the primary unit, e.g. `4 ft x 8 ft`. */
  primarySize: string;
  primaryImage: string;
  /** Every line of the bill, image-led, for display. */
  lines: BomLine[];
}

export const CALC_CONFIG = {
  /** Coverage of one gypsum board, in square feet (4 ft x 8 ft sheet). */
  boardCoverageSqFt: 32,
  boardSizeLabel: "4 ft x 8 ft",
  /** Smart Ceiling Panel is 603 x 603 mm, sitting in a 2 ft x 2 ft grid opening. */
  panelSizeLabel: "603 x 603 mm",

  /** Drywall screws consumed per board (client figure). */
  screwsPerBoard: 32,
  /** Drywall screws per box. */
  screwsPerBox: 500,

  /** Tape: one standard board needs 24 ft; one roll is 90 m. */
  tapeFtPerBoard: 24,
  tapeFtPerRoll: 90 * 3.280839895,

  /** Filler: a 5 kg bucket covers 100 sq ft (a 25 kg bucket covers 500). */
  fillerSqFtPerSmallBucket: 100,
  fillerSmallBucketKg: 5,
  fillerLargeBucketKg: 25,

  /**
   * Smart Grid on a 2 ft x 2 ft module: main runners every 4 ft (running the
   * room length), 4 ft cross tees every 2 ft between them, 2 ft short tees
   * between the cross tees, wall angle round the perimeter.
   */
  gridMainRunnerSpacingFt: 4,
  gridModuleFt: 2,
  shortTee: { sizeFt: 2, perCarton: 75 },
  crossTee: { sizeFt: 4, perCarton: 50 },
  mainRunner: { sizeFt: 12, perCarton: 25 },
  wallAngle: { sizeFt: 10, perBundle: 40 },
} as const;

const round = (n: number) => Math.round(n * 100) / 100;

/** Ceiling that tolerates float noise (12.0000001 ft counts as 12 ft). */
const ceil = (n: number) => Math.ceil(n - 1e-6);

/** Estimate a bill of materials for a rectangular ceiling. All lengths in feet. */
export function calculate(input: CalcInput): BillOfMaterials {
  const c = CALC_CONFIG;
  const length = Math.max(0, input.lengthFt || 0);
  const width = Math.max(0, input.widthFt || 0);

  const areaSqFt = length * width;
  const perimeterFt = 2 * (length + width);

  const isPanel = input.system === "panel";
  const isDrywall = input.system === "drywall";
  const faces = isDrywall ? 2 : 1;
  const boardAreaSqFt = areaSqFt * faces;

  const boardType = input.boardType ?? "standard";
  // Panels drop into the 2 ft x 2 ft grid openings, one panel per opening.
  const primaryCount = isPanel
    ? ceil(length / c.gridModuleFt) * ceil(width / c.gridModuleFt)
    : ceil(boardAreaSqFt / c.boardCoverageSqFt);

  const primaryLabel = isPanel ? "Smart Ceiling Panel" : BOARD_TYPES[boardType].label;
  const primaryImage = isPanel ? PANEL_IMAGE : BOARD_TYPES[boardType].image;
  const primarySize = isPanel ? c.panelSizeLabel : c.boardSizeLabel;

  const lines: BomLine[] = [
    {
      label: `${primaryLabel} (${primarySize})`,
      image: primaryImage,
      quantity: primaryCount,
      unit: isPanel ? UNITS.panel : UNITS.board,
      note: isDrywall ? "Both faces of the partition" : undefined,
    },
  ];

  if (!isPanel) {
    // Lay-in ceiling panels need no screws, tape or filler; those apply to
    // board and drywall only.
    const screwBoxes = ceil((primaryCount * c.screwsPerBoard) / c.screwsPerBox);
    lines.push({
      label: "Drywall screws (500 pcs per box)",
      image: SCREW_IMAGE,
      quantity: screwBoxes,
      unit: UNITS.box,
    });
    const tapeRolls = ceil((primaryCount * c.tapeFtPerBoard) / c.tapeFtPerRoll);
    lines.push({
      label: "Smart Tape (90 m per roll)",
      image: TAPE_IMAGE,
      quantity: tapeRolls,
      unit: UNITS.roll,
    });

    // Filler is sold in 5 kg and 25 kg buckets: size the total in 5 kg units,
    // then swap every five of them for one 25 kg bucket.
    const smallUnits = ceil(boardAreaSqFt / c.fillerSqFtPerSmallBucket);
    const bigBuckets = Math.floor(smallUnits / 5);
    const smallBuckets = smallUnits % 5;
    if (bigBuckets > 0) {
      lines.push({
        label: `Smart Filler (${c.fillerLargeBucketKg} kg)`,
        image: FILLER_IMAGE,
        quantity: bigBuckets,
        unit: UNITS.bucket,
      });
    }
    if (smallBuckets > 0) {
      lines.push({
        label: `Smart Filler (${c.fillerSmallBucketKg} kg)`,
        image: FILLER_IMAGE,
        quantity: smallBuckets,
        unit: UNITS.bucket,
      });
    }
  }

  if (input.system === "board") {
    const accessPanels = Math.max(0, Math.floor(input.accessPanels ?? 0));
    if (accessPanels > 0) {
      lines.push({
        label: "Smart Access panels",
        image: ACCESS_IMAGE,
        quantity: accessPanels,
        unit: UNITS.panel,
      });
    }
  }

  if (isPanel) {
    const bays = ceil(width / c.gridMainRunnerSpacingFt);
    const rowsPerBay = ceil(length / c.gridModuleFt);

    const mainRunnerFt = Math.max(0, bays - 1) * length;
    const crossTeeFt = bays * Math.max(0, rowsPerBay - 1) * c.crossTee.sizeFt;
    const shortTeeFt = bays * rowsPerBay * c.shortTee.sizeFt;

    const gridLine = (
      label: string,
      neededFt: number,
      sizeFt: number,
      perPack: number,
      packName: string,
    ): BomLine | null => {
      const pcs = ceil(neededFt / sizeFt);
      if (pcs === 0) return null;
      const packs = ceil(pcs / perPack);
      const wasted = round(pcs * sizeFt - neededFt);
      const needed = `${round(neededFt)} ft needed${wasted > 0 ? ` (${wasted} ft wasted)` : ""}`;
      return {
        label: `${label} (${sizeFt} ft)`,
        image: GRID_IMAGE,
        quantity: pcs,
        unit: UNITS.piece,
        note: `${needed}, ${packs} ${packName}${packs === 1 ? "" : "s"} of ${perPack} pcs`,
      };
    };

    for (const line of [
      gridLine("Smart Grid Short Tee", shortTeeFt, c.shortTee.sizeFt, c.shortTee.perCarton, "carton"),
      gridLine("Smart Grid Cross Tee", crossTeeFt, c.crossTee.sizeFt, c.crossTee.perCarton, "carton"),
      gridLine("Smart Grid Main Runner", mainRunnerFt, c.mainRunner.sizeFt, c.mainRunner.perCarton, "carton"),
      gridLine("Smart Grid Wall Angle", perimeterFt, c.wallAngle.sizeFt, c.wallAngle.perBundle, "bundle"),
    ]) {
      if (line) lines.push(line);
    }
  }

  return {
    areaSqFt: round(areaSqFt),
    perimeterFt: round(perimeterFt),
    coveredAreaSqFt: isDrywall ? round(boardAreaSqFt) : undefined,
    primaryLabel,
    primaryCount,
    primarySize,
    primaryImage,
    lines,
  };
}

const FT_PER_M = 3.280839895;

/** Convert a raw numeric measurement in the given unit to feet. */
export function toFeet(value: number, unit: LengthUnit): number {
  const n = value || 0;
  return unit === "meters" ? n * FT_PER_M : n;
}

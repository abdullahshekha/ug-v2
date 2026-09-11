/**
 * Ceiling material calculator: pure estimation logic.
 *
 * The UI component (`src/components/sections/CeilingCalculator.tsx`) handles all
 * input state and unit conversion (feet <-> meters), then calls `calculate()` with
 * measurements already normalised to FEET. Keeping the maths here makes it testable
 * and lets us swap the constants once the Application Booklet is parsed.
 *
 * TODO: reconcile every value in CALC_CONFIG against the UG Application Booklet
 * (UG_Application_Booklet_Form_2020.pdf): coverage rates, fastener spacing, grid
 * module, and filler / tape consumption. Current numbers are industry-standard
 * first-pass estimates, not UG-published figures.
 */

export type CeilingSystem = "board" | "panel";
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
  standard: { label: "Standard Board", image: "/images/board-standard.png" },
  moisture: { label: "Moisture Resistant Board", image: "/images/board-moisture.png" },
  fire: { label: "Fire Resistant Board", image: "/images/board-fire.png" },
  heat: { label: "Heat Resistant Board", image: "/images/board-heat.png" },
  perforated: {
    label: "Perforated Board (Smart Echo Shield)",
    image: "/images/board-perforated.png",
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
  /** Room length in feet. */
  lengthFt: number;
  /** Room width in feet. */
  widthFt: number;
  /** Board variant (board system only); ignored for the panel system. */
  boardType?: BoardType;
  /** Access panels wanted (panel system only). */
  accessPanels?: number;
  /** Wastage allowance as a percentage, e.g. 10 for 10%. */
  wastagePct?: number;
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
  carton: { singular: "carton", plural: "cartons" },
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
  /** Echoed back for display. */
  areaSqFt: number;
  perimeterFt: number;
  wastagePct: number;
  /** "Gypsum boards" or "Ceiling panels": the main covering unit. */
  primaryLabel: string;
  primaryCount: number;
  /** Nominal size text for the primary unit, e.g. `4 ft x 8 ft`. */
  primarySize: string;
  primaryImage: string;
  screwBoxes: number;
  fillerBuckets: number;
  jointTapeRolls: number;
  /** Present only for the suspended Ceiling Panel (grid) system. */
  grid?: {
    mainRunnerFt: number;
    crossTeeFt: number;
    wallAngleFt: number;
    accessPanels: number;
  };
  /** Every line of the bill, image-led, for display. */
  lines: BomLine[];
}

export const CALC_CONFIG = {
  /** Coverage of one gypsum board, in square feet (4 ft x 8 ft sheet). */
  boardCoverageSqFt: 32,
  boardSizeLabel: "4 ft x 8 ft",
  /** Coverage of one ceiling panel, in square feet (595 x 595 mm ~= 2 ft x 2 ft). */
  panelCoverageSqFt: 4,
  panelSizeLabel: "595 x 595 mm",

  /** Drywall screws consumed per board (perimeter + field fixing). */
  screwsPerBoard: 32,
  /** Fixing screws per panel (grid clips / hold-down). */
  screwsPerPanel: 4,
  screwsPerBox: 1000,

  /**
   * Running feet of finished joint per square foot of ceiling. Board ceilings have
   * far more taped joint than a lay-in panel grid.
   */
  jointFtPerSqFtBoard: 0.9,
  jointFtPerSqFtPanel: 0.35,
  /** Running feet of joint a single filler bucket covers. */
  jointFtPerFillerBucket: 50,
  /** Running feet of tape on one roll (~90 m). */
  jointFtPerTapeRoll: 295,

  /** Suspended grid built on a 2 ft x 2 ft module. */
  gridMainRunnerSpacingFt: 4,
  gridCrossTeeSpacingFt: 2,
  /** Smart Grid members: 1220 x 26 x 24 mm, 50 pcs per carton. */
  gridPieceLengthMm: 1220,
  gridPiecesPerCarton: 50,
} as const;

const MM_PER_FT = 304.8;

const round = (n: number) => Math.round(n * 100) / 100;

/** Estimate a bill of materials for a rectangular ceiling. All lengths in feet. */
export function calculate(input: CalcInput): BillOfMaterials {
  const c = CALC_CONFIG;
  const length = Math.max(0, input.lengthFt || 0);
  const width = Math.max(0, input.widthFt || 0);
  const wastagePct = input.wastagePct ?? 10;
  const factor = 1 + Math.max(0, wastagePct) / 100;

  const areaSqFt = length * width;
  const perimeterFt = 2 * (length + width);
  const withWastage = (n: number) => Math.ceil(n * factor);

  const isPanel = input.system === "panel";
  const boardType = input.boardType ?? "standard";
  const coverage = isPanel ? c.panelCoverageSqFt : c.boardCoverageSqFt;
  const primaryCount = withWastage(areaSqFt / coverage);
  const screwsPerUnit = isPanel ? c.screwsPerPanel : c.screwsPerBoard;
  const screwBoxes = withWastage((primaryCount * screwsPerUnit) / c.screwsPerBox);

  const jointFt =
    areaSqFt * (isPanel ? c.jointFtPerSqFtPanel : c.jointFtPerSqFtBoard);
  const fillerBuckets = withWastage(jointFt / c.jointFtPerFillerBucket);
  const jointTapeRolls = withWastage(jointFt / c.jointFtPerTapeRoll);

  const primaryLabel = isPanel ? "Smart Ceiling Panel" : BOARD_TYPES[boardType].label;
  const primaryImage = isPanel ? PANEL_IMAGE : BOARD_TYPES[boardType].image;
  const primarySize = isPanel ? c.panelSizeLabel : c.boardSizeLabel;

  const lines: BomLine[] = [
    {
      label: `${primaryLabel} (${primarySize})`,
      image: primaryImage,
      quantity: primaryCount,
      unit: isPanel ? UNITS.panel : UNITS.board,
    },
    { label: "Drywall screws", image: SCREW_IMAGE, quantity: screwBoxes, unit: UNITS.box },
    { label: "Smart Filler", image: FILLER_IMAGE, quantity: fillerBuckets, unit: UNITS.bucket },
    { label: "Smart Tape", image: TAPE_IMAGE, quantity: jointTapeRolls, unit: UNITS.roll },
  ];

  const bom: BillOfMaterials = {
    areaSqFt: round(areaSqFt),
    perimeterFt: round(perimeterFt),
    wastagePct,
    primaryLabel,
    primaryCount,
    primarySize,
    primaryImage,
    screwBoxes,
    fillerBuckets,
    jointTapeRolls,
    lines,
  };

  if (isPanel) {
    const accessPanels = Math.max(0, Math.floor(input.accessPanels ?? 0));
    const mainRunnerFt = withWastage(areaSqFt / c.gridMainRunnerSpacingFt);
    const crossTeeFt = withWastage(areaSqFt / c.gridCrossTeeSpacingFt);
    const wallAngleFt = withWastage(perimeterFt);
    bom.grid = { mainRunnerFt, crossTeeFt, wallAngleFt, accessPanels };

    const totalGridFt = mainRunnerFt + crossTeeFt + wallAngleFt;
    const pieceLengthFt = c.gridPieceLengthMm / MM_PER_FT;
    const gridPieces = Math.ceil(totalGridFt / pieceLengthFt);
    const gridCartons = Math.ceil(gridPieces / c.gridPiecesPerCarton);

    bom.lines.push({
      label: "Smart Grid (main runner + cross tee + wall angle)",
      image: GRID_IMAGE,
      quantity: gridCartons,
      unit: UNITS.carton,
      note: `${round(totalGridFt)} ft total`,
    });
    if (accessPanels > 0) {
      bom.lines.push({
        label: "Smart Access panels",
        image: ACCESS_IMAGE,
        quantity: accessPanels,
        unit: UNITS.panel,
      });
    }
  }

  return bom;
}

const FT_PER_M = 3.280839895;

/** Convert a raw numeric measurement in the given unit to feet. */
export function toFeet(value: number, unit: LengthUnit): number {
  const n = value || 0;
  return unit === "meters" ? n * FT_PER_M : n;
}

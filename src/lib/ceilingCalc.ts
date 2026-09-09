/**
 * Ceiling material calculator — pure estimation logic.
 *
 * The UI component (`src/components/sections/CeilingCalculator.tsx`) handles all
 * input state and unit conversion (feet <-> meters), then calls `calculate()` with
 * measurements already normalised to FEET. Keeping the maths here makes it testable
 * and lets us swap the constants once the Application Booklet is parsed.
 *
 * TODO: reconcile every value in CALC_CONFIG against the UG Application Booklet
 * (UG_Application_Booklet_Form_2020.pdf) — coverage rates, fastener spacing, grid
 * module, and filler / tape consumption. Current numbers are industry-standard
 * first-pass estimates, not UG-published figures.
 */

export type CeilingSystem = "board" | "panel";
export type LengthUnit = "feet" | "meters";

export interface CalcInput {
  system: CeilingSystem;
  /** Room length in feet. */
  lengthFt: number;
  /** Room width in feet. */
  widthFt: number;
  /** Access panels wanted (panel system only). */
  accessPanels?: number;
  /** Wastage allowance as a percentage, e.g. 10 for 10%. */
  wastagePct?: number;
}

export interface BillOfMaterials {
  /** Echoed back for display. */
  areaSqFt: number;
  perimeterFt: number;
  wastagePct: number;
  /** "Gypsum boards" or "Ceiling panels" — the main covering unit. */
  primaryLabel: string;
  primaryCount: number;
  /** Nominal size text for the primary unit, e.g. `4 ft x 8 ft`. */
  primarySize: string;
  screwBoxes: number;
  fillerBags: number;
  jointTapeRolls: number;
  /** Present only for the suspended Ceiling Panel (grid) system. */
  grid?: {
    mainRunnerFt: number;
    crossTeeFt: number;
    wallAngleFt: number;
    accessPanels: number;
  };
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
  /** Running feet of joint a single filler bag covers. */
  jointFtPerFillerBag: 50,
  /** Running feet of tape on one roll (~90 m). */
  jointFtPerTapeRoll: 295,

  /** Suspended grid built on a 2 ft x 2 ft module. */
  gridMainRunnerSpacingFt: 4,
  gridCrossTeeSpacingFt: 2,
} as const;

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
  const coverage = isPanel ? c.panelCoverageSqFt : c.boardCoverageSqFt;
  const primaryCount = withWastage(areaSqFt / coverage);
  const screwsPerUnit = isPanel ? c.screwsPerPanel : c.screwsPerBoard;
  const screwBoxes = withWastage((primaryCount * screwsPerUnit) / c.screwsPerBox);

  const jointFt =
    areaSqFt * (isPanel ? c.jointFtPerSqFtPanel : c.jointFtPerSqFtBoard);
  const fillerBags = withWastage(jointFt / c.jointFtPerFillerBag);
  const jointTapeRolls = withWastage(jointFt / c.jointFtPerTapeRoll);

  const bom: BillOfMaterials = {
    areaSqFt: round(areaSqFt),
    perimeterFt: round(perimeterFt),
    wastagePct,
    primaryLabel: isPanel ? "Ceiling panels" : "Gypsum boards",
    primaryCount,
    primarySize: isPanel ? c.panelSizeLabel : c.boardSizeLabel,
    screwBoxes,
    fillerBags,
    jointTapeRolls,
  };

  if (isPanel) {
    bom.grid = {
      mainRunnerFt: withWastage(areaSqFt / c.gridMainRunnerSpacingFt),
      crossTeeFt: withWastage(areaSqFt / c.gridCrossTeeSpacingFt),
      wallAngleFt: withWastage(perimeterFt),
      accessPanels: Math.max(0, Math.floor(input.accessPanels ?? 0)),
    };
  }

  return bom;
}

const FT_PER_M = 3.280839895;

/** Convert a raw numeric measurement in the given unit to feet. */
export function toFeet(value: number, unit: LengthUnit): number {
  const n = value || 0;
  return unit === "meters" ? n * FT_PER_M : n;
}

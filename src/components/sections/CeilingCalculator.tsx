"use client";

import { useMemo, useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import {
  calculate,
  toFeet,
  type CeilingSystem,
  type LengthUnit,
} from "@/lib/ceilingCalc";
import SectionHeading from "@/components/ui/SectionHeading";

interface CeilingCalculatorProps {
  variant?: "compact" | "full";
}

function Toggle<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div>
      <span className="mb-2 block text-xs font-bold text-plaster-300">{label}</span>
      <div className="flex gap-1 rounded-xl bg-plaster-800 p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
              value === o.value
                ? "bg-brand-800 text-white"
                : "text-plaster-300 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-plaster-300">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full rounded-xl border border-white/10 bg-plaster-800 px-4 py-3 text-base font-bold text-white placeholder:text-plaster-500 focus:border-brand-400 focus:outline-none"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-plaster-400">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export default function CeilingCalculator({
  variant = "compact",
}: CeilingCalculatorProps) {
  const [system, setSystem] = useState<CeilingSystem>("board");
  const [unit, setUnit] = useState<LengthUnit>("feet");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [accessPanels, setAccessPanels] = useState("");
  const [wastage, setWastage] = useState("10");

  const unitSuffix = unit === "feet" ? "ft" : "m";

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!l || !w || l <= 0 || w <= 0) return null;
    return calculate({
      system,
      lengthFt: toFeet(l, unit),
      widthFt: toFeet(w, unit),
      accessPanels: parseInt(accessPanels, 10) || 0,
      wastagePct: parseFloat(wastage) || 0,
    });
  }, [system, unit, length, width, accessPanels, wastage]);

  const rows = result
    ? [
        {
          label: `${result.primaryLabel} (${result.primarySize})`,
          value: result.primaryCount,
        },
        { label: "Screw boxes (1000 pcs)", value: result.screwBoxes },
        { label: "Filler bags", value: result.fillerBags },
        { label: "Joint tape rolls", value: result.jointTapeRolls },
        ...(result.grid
          ? [
              {
                label: "Grid main runners",
                value: `${result.grid.mainRunnerFt} ft`,
              },
              { label: "Grid cross tees", value: `${result.grid.crossTeeFt} ft` },
              {
                label: "Perimeter wall angle",
                value: `${result.grid.wallAngleFt} ft`,
              },
              { label: "Access panels", value: result.grid.accessPanels },
            ]
          : []),
      ]
    : [];

  return (
    <section
      id="calculator"
      className={variant === "compact" ? "bg-plaster-900" : "bg-plaster-900"}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          variant === "compact" ? "py-20 sm:py-28" : "py-14 sm:py-16"
        }`}
      >
        {variant === "compact" && (
          <SectionHeading
            eyebrow="Plan your project"
            title="Ceiling material calculator"
            lead="Enter your room dimensions for a quick bill of materials — boards or panels, screw boxes, filler, tape, and grid for suspended ceilings."
            tone="dark"
          />
        )}

        <div
          className={`grid gap-5 ${
            variant === "compact" ? "mt-12" : ""
          } lg:grid-cols-2`}
        >
          {/* Inputs */}
          <div className="rounded-3xl border border-white/10 bg-plaster-950/60 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Toggle
                label="Ceiling system"
                value={system}
                onChange={setSystem}
                options={[
                  { value: "board", label: "Gypsum Board" },
                  { value: "panel", label: "Ceiling Panel" },
                ]}
              />
              <Toggle
                label="Units"
                value={unit}
                onChange={setUnit}
                options={[
                  { value: "feet", label: "Feet" },
                  { value: "meters", label: "Meters" },
                ]}
              />
              <NumberField
                label="Room length"
                value={length}
                onChange={setLength}
                suffix={unitSuffix}
              />
              <NumberField
                label="Room width"
                value={width}
                onChange={setWidth}
                suffix={unitSuffix}
              />
              <NumberField
                label="Wastage allowance"
                value={wastage}
                onChange={setWastage}
                suffix="%"
              />
              {system === "panel" && (
                <NumberField
                  label="Access panels wanted"
                  value={accessPanels}
                  onChange={setAccessPanels}
                />
              )}
            </div>
            {result && (
              <p className="mt-5 text-xs text-plaster-400">
                Ceiling area {result.areaSqFt} sq ft &middot; perimeter{" "}
                {result.perimeterFt} ft
              </p>
            )}
          </div>

          {/* Output */}
          <div className="rounded-3xl border border-white/10 bg-plaster-950/60 p-6 sm:p-8">
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-300">
              <CalcIcon className="h-4 w-4" />
              Estimated bill of materials
            </p>

            {result ? (
              <dl className="mt-5 divide-y divide-white/10">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <dt className="text-sm text-plaster-300">{r.label}</dt>
                    <dd className="text-lg font-extrabold text-white">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-5 text-sm text-plaster-400">
                Enter a room length and width to see quantities.
              </p>
            )}

            <p className="mt-6 text-xs leading-relaxed text-plaster-500">
              First-pass estimate using industry-standard coverage rates. Final
              quantities are reconciled against the UG Application Booklet &mdash;
              confirm with our team before ordering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

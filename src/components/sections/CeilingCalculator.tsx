"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Calculator as CalcIcon } from "lucide-react";
import {
  calculate,
  toFeet,
  ROOM_TYPES,
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
      <span className="mb-2 block text-xs font-bold text-grey">{label}</span>
      <div className="flex gap-1 rounded-xl bg-mist p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
              value === o.value
                ? "bg-red text-white"
                : "text-grey hover:text-red"
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
      <span className="mb-2 block text-xs font-bold text-grey">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full rounded-xl border border-warm bg-white px-4 py-3 text-base font-bold text-grey placeholder:text-grey focus:border-red focus:outline-none"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-grey">
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
  const [roomType, setRoomType] = useState(ROOM_TYPES[0].value);
  const [accessPanels, setAccessPanels] = useState("");
  const [wastage, setWastage] = useState("10");

  const unitSuffix = unit === "feet" ? "ft" : "m";
  const boardType =
    ROOM_TYPES.find((r) => r.value === roomType)?.boardType ?? "standard";

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!l || !w || l <= 0 || w <= 0) return null;
    return calculate({
      system,
      lengthFt: toFeet(l, unit),
      widthFt: toFeet(w, unit),
      boardType,
      accessPanels: parseInt(accessPanels, 10) || 0,
      wastagePct: parseFloat(wastage) || 0,
    });
  }, [system, unit, length, width, boardType, accessPanels, wastage]);

  return (
    <section
      id="calculator"
      className={variant === "compact" ? "bg-grey" : "bg-grey"}
    >
      <div
        className={`px-4 sm:px-8 lg:px-12 ${
          variant === "compact" ? "py-20 sm:py-28" : "py-14 sm:py-16"
        }`}
      >
        {variant === "compact" && (
          <SectionHeading
            eyebrow="Plan your project"
            title="Ceiling material calculator"
            lead="Enter your room dimensions for a quick bill of materials: boards or panels, screw boxes, filler, tape, and grid for suspended ceilings."
            tone="dark"
          />
        )}

        <div
          className={`grid gap-5 ${
            variant === "compact" ? "mt-12" : ""
          } lg:grid-cols-2`}
        >
          {/* Inputs */}
          <div className="rounded-3xl border border-warm bg-white p-6 sm:p-8">
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

              {system === "board" && (
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold text-grey">
                    Room type
                  </span>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full rounded-xl border border-warm bg-white px-4 py-3 text-sm font-bold text-grey focus:border-red focus:outline-none"
                  >
                    {ROOM_TYPES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <span className="mt-1.5 block text-xs leading-relaxed text-grey">
                    Picks the right Smart Gypsum Board variant for the space:
                    Standard for general rooms, Moisture Resistant for
                    bathrooms and laundry areas, Fire Resistant for kitchens
                    and server rooms, Perforated for auditoriums and
                    conference rooms needing acoustic control, Heat Resistant
                    for attics and top floors.
                  </span>
                </label>
              )}

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
              <p className="mt-5 text-xs text-grey">
                Ceiling area {result.areaSqFt} sq ft &middot; perimeter{" "}
                {result.perimeterFt} ft
              </p>
            )}
          </div>

          {/* Output */}
          <div className="rounded-3xl border border-warm bg-white p-6 sm:p-8">
            <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
              <CalcIcon className="h-4 w-4" />
              Estimated bill of materials
            </p>

            {result ? (
              <ul className="mt-5 space-y-3">
                {result.lines.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-center gap-4 border-t border-warm pt-3 first:border-t-0 first:pt-0"
                  >
                    <span className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-warm bg-mist">
                      <Image
                        src={line.image}
                        alt={line.label}
                        fill
                        sizes="56px"
                        className="object-contain p-1.5"
                      />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-grey">
                      {line.label}
                    </span>
                    <span className="flex-shrink-0 text-right text-lg font-extrabold text-grey">
                      {line.quantity}
                      <span className="ml-1 text-xs font-medium text-grey">
                        {line.unit}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-grey">
                Enter a room length and width to see quantities.
              </p>
            )}

            <p className="mt-6 text-xs leading-relaxed text-grey">
              First-pass estimate using industry-standard coverage rates.
              Final quantities are reconciled against the United Gypsum
              Application Booklet, so confirm with your applicator before
              placing order with our registered Distributors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

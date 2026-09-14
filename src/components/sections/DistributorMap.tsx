"use client";

import { useState } from "react";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  provinceShapes,
  distributorCities,
} from "@/lib/distributorMap";

export default function DistributorMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <h3 className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
        United Gypsum Distributor&apos;s Network
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-grey">
        United Gypsum products reach {distributorCities.length} cities across
        Pakistan through our distributor network. Hover or tap a marker to see
        the city.
      </p>

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-warm bg-white p-2 shadow-plaster sm:p-4">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label="Map of Pakistan showing United Gypsum distributor cities"
          className="h-auto w-full"
        >
          {provinceShapes.map((p) => (
            <path
              key={p.name}
              d={p.d}
              className="fill-mist transition-colors"
              stroke="rgba(65,65,65,0.10)"
              strokeWidth={1.5}
            />
          ))}

          {distributorCities.map((c, i) => (
            <g
              key={`${c.name}-${i}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((a) => (a === i ? null : a))}
              onClick={() => setActive((a) => (a === i ? null : i))}
              className="cursor-pointer"
            >
              {/* Larger invisible hit area, easier to hover/tap than the dot alone. */}
              <circle cx={c.x} cy={c.y} r={9} fill="transparent" />
              <circle
                cx={c.x}
                cy={c.y}
                r={active === i ? 5.5 : 3.5}
                className="fill-red transition-[r]"
                stroke="white"
                strokeWidth={1.2}
              />
            </g>
          ))}
        </svg>

        {active !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-warm bg-white px-3 py-1.5 text-xs font-bold text-grey shadow-plaster"
            style={{
              left: `${(distributorCities[active].x / MAP_WIDTH) * 100}%`,
              top: `${(distributorCities[active].y / MAP_HEIGHT) * 100}%`,
              marginTop: "-10px",
            }}
          >
            {distributorCities[active].name}
          </div>
        )}
      </div>
    </div>
  );
}

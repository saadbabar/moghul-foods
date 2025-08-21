// src/components/DistributionMap.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";

type Topology = any;
type GeoFeature = any;

const PRESELECTED = new Set(["Illinois", "Indiana", "Michigan", "Kentucky", "Ohio"]);
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function DistributionMap() {
  const [states, setStates] = useState<GeoFeature[]>([]);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(PRESELECTED));
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(GEO_URL);
      const topo: Topology = await res.json();
      const coll: any = feature(topo, topo.objects.states);
      setStates(coll.features);
    })();
  }, []);

  const projection = useMemo(() => geoAlbersUsa().scale(1000).translate([480, 300]), []);
  const path = useMemo(() => geoPath(projection), [projection]);

  return (
    <div className="mx-auto max-w-4xl">
        <svg viewBox="0 0 960 600" className="w-full h-auto">
          <g>
            {states.map((s) => {
            const name = s.properties?.name as string;
            const isSel = PRESELECTED.has(name);
            const isHover = hover === name;

            return (
                <path
                key={s.id ?? name}
                d={path(s) ?? ""}
                onMouseEnter={() => setHover(name)}
                onMouseLeave={() => setHover(null)}
                fill={isSel ? "#1e40af" : "#e5e7eb"}
                stroke={(isSel && isHover) ? "#0f172a" : "#9ca3af"}
                strokeWidth={(isSel && isHover) ? 1.4 : 0.8}
                style={{
                    transition: "fill 150ms ease, stroke 150ms ease",
                    cursor: "default",
                }}
                aria-disabled={true}
                />
            );
            })}
          </g>
        </svg>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-[#1e40af]" />
            Covered Areas
          </span>
          {hover && <span className="ml-2 italic">State: {hover}</span>}
        </div>
    </div>
  );
}

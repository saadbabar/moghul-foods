"use client";
import { useMemo, useState, useEffect } from "react";

const STATE_RANGES: Record<string, [number, number][]> = {
  MI: [[480, 499]],
  IN: [[460, 479]],
  IL: [[600, 629]],
  KY: [[400, 427]],
  OH: [[430, 459]],
};
const SERVICE_STATES = new Set(["MI", "IN", "IL", "KY", "OH"]);

function zipToPrefix(zip: string) {
  const five = zip.replace(/\D/g, "").slice(0, 5);
  if (five.length < 5) return null;
  return Number(five.slice(0, 3));
}
function prefixState(prefix: number | null) {
  if (prefix == null) return null;
  for (const [state, ranges] of Object.entries(STATE_RANGES)) {
    if (ranges.some(([lo, hi]) => prefix >= lo && prefix <= hi)) return state;
  }
  return null;
}

export default function ZipChecker() {
  const [zip, setZip] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (zip.trim() === "") setSubmitted(false);
  }, [zip]);

  const prefix = useMemo(() => zipToPrefix(zip), [zip]);
  const state = useMemo(() => prefixState(prefix), [prefix]);

  const isValidInput = /^\d{5}(-\d{4})?$/.test(zip.trim());
  const inServiceArea = state ? SERVICE_STATES.has(state) : false;

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setZip("");
    setSubmitted(false);
  };

  const showResult = submitted && zip.trim() !== "";

  return (
    <div className="mx-auto max-w-md text-center items-center">
      <form onSubmit={handleCheck}>
        <label htmlFor="zip" className="block text-sm font-medium text-slate-700">
          Check delivery coverage by ZIP code
        </label>

        <div className="mt-2 flex gap-2">
          <input
            id="zip"
            inputMode="numeric"
            pattern="\d{5}(-\d{4})?"
            maxLength={10}
            placeholder="e.g. 48104"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white appearance-none shadow-sm
                        outline-none focus:ring-2 focus:ring-blue-500"
            />

          {showResult ? (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border px-4 py-2 bg-white appearance-none shadow-sm
                        outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              aria-label="Check another location"
            >
              Clear
            </button>
          ) : (
            <button type="submit" className="rounded-xl border px-4 py-2 bg-white appearance-none shadow-sm
                        outline-none focus:ring-2 focus:ring-blue-500 border-gray-300">
              Check
            </button>
          )}
        </div>
      </form>

      <div className="mt-3 text-sm min-h-[2.5rem]">
        {!showResult ? (
          <p className="text-slate-500">Enter a ZIP and press Check.</p>
        ) : !isValidInput ? (
          <p className="text-rose-600">
            Please enter a valid U.S. ZIP (12345 or 12345-6789).
          </p>
        ) : !inServiceArea ? (
          <div className="rounded-lg bg-amber-50 px-3 py-2 text-amber-700">
            ⚠️ Not in our current coverage. We currently serve MI, IN, IL, KY, and OH.
          </div>
        ) : state === "IL" ? (
          <div className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
            ℹ️ Illinois: We currently supply <strong>only to Patel Brothers locations</strong>.
          </div>
        ) : (
          <div className="rounded-lg bg-green-50 px-3 py-2 text-green-700">
            ✅ Yes — we serve this area ({state}).
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        We only supply Patel Brothers branches in Illinois. Some border ZIPs can vary—contact us if unsure.
      </p>
    </div>
  );
}

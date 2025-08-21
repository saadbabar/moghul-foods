"use client";
import { useEffect, useState } from "react";

export default function TextSlide({
  items,
  intervalMs = 1500,
  pauseOnHover = true,
}: {
  items: string[];
  intervalMs?: number;
  pauseOnHover?: boolean;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(() => setI(v => (v + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [paused, items.length, intervalMs]);

  useEffect(() => { setI(0); }, [items.length]);

  if (!items?.length) return null;

  return (
    <div
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      className="relative h-10 overflow-hidden"
      aria-live="polite"
      role="status"
    >
      <div
        key={i}
        className="absolute inset-0 flex items-center justify-center text-l font-semibold opacity-0 fade-up mt-2"
      >
        {items[i]}
      </div>
    </div>
  );
}

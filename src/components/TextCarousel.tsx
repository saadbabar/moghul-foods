"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  items: string[];
  intervalMs?: number;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export default function TextCarousel({
  items,
  intervalMs = 3000,
  autoPlay = true,
  pauseOnHover = true,
  className = "",
}: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = items?.length ?? 0;
  const go = (idx: number) => setI(((idx % count) + count) % count);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, paused, intervalMs, count, i]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    touchStartX.current = null;
  };

  if (!count) return null;

  return (
    <div
      className={`w-full ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-live="polite"
      role="region"
      aria-label="Text carousel"
    >
      <div className="flex mt-2 items-center justify-center px-3 h-6 md:h-8">
        <div
          key={i}
          className="animate-slide-left text-xs md:text-sm text-center text-white/90 leading-snug"
        >
          {items[i]}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-12 md:mt-8 lg:mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="rounded-full border border-white/30 bg-white/15 px-2 py-0.5 text-xs text-white hover:bg-white/25 md:px-3 md:py-1 md:text-sm"
          >
            ‹
          </button>

          <div className="flex gap-1 md:gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to item ${idx + 1}`}
                onClick={() => go(idx)}
                className={`rounded-full transition ${
                  idx === i
                    ? "bg-white h-1.5 w-3 md:h-2 md:w-3.5"
                    : "bg-white/40 hover:bg-white/60 h-1.5 w-1.5 md:h-2 md:w-2"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="rounded-full border border-white/30 bg-white/15 px-2 py-0.5 text-xs text-white hover:bg-white/25 md:px-3 md:py-1 md:text-sm"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

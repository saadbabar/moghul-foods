"use client";
import { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry && setInView(entry.isIntersecting),
      options ?? { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function useCountUp(target: number, run: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [run, target, duration]);

  return n;
}

function Card({
  value, suffix, label, visible, delay = 0,
}: { value: number; suffix?: string; label: string; visible: boolean; delay?: number }) {
  const n = useCountUp(value, visible);
  return (
    <div
      className="relative rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
      style={{ animation: `statFadeUp 420ms ease both`, animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
        {n.toLocaleString()}
        {suffix && <span className="text-amber-500"> {suffix}</span>}
      </div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div ref={ref} className="relative z-[3] mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <Card value={240} suffix="+" label="Stores" visible={inView} delay={0} />
      <Card value={100} suffix="+" label="Brands" visible={inView} delay={80} />
      <Card value={200_000} suffix="+" label="Happy Customers" visible={inView} delay={160} />
    </div>
  );
}

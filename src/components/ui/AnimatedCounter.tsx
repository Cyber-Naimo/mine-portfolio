"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string; // e.g. "99.9%", "20+", "35%"
  duration?: number;
  style?: React.CSSProperties;
}

function parseValue(raw: string): { num: number; suffix: string; isFloat: boolean } {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const suffix = raw.replace(/[0-9.]/g, "");
  const num = parseFloat(cleaned) || 0;
  return { num, suffix, isFloat: cleaned.includes(".") };
}

export default function AnimatedCounter({ value, duration = 1800, style }: Props) {
  const { num, suffix, isFloat } = parseValue(value);
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * num;
            setDisplay(
              isFloat
                ? current.toFixed(1)
                : Math.round(current).toString()
            );
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num, duration, isFloat]);

  return (
    <span ref={ref} style={style}>
      {display}{suffix}
    </span>
  );
}

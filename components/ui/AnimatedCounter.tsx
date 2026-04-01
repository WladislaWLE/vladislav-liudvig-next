"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  delay?: number;
}

export function AnimatedCounter({ value, suffix = "", delay = 0 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1600;
      const start = performance.now();
      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, value, delay]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

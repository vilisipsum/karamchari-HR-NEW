"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  isCurrency = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const formatIndianNumber = (num: number) => {
    const x = Math.floor(num).toString();
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          const totalFrames = Math.round(duration / 16); // ~60fps
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad
            const currentVal = end * (progress * (2 - progress));

            if (frame >= totalFrames) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(currentVal);
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  const displayValue = isCurrency ? `₹${formatIndianNumber(count)}` : formatIndianNumber(count);

  return (
    <span ref={countRef} className="font-numbers tracking-tight">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

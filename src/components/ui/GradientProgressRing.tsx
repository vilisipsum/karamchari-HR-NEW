"use client";

import React, { useEffect, useState, useRef } from "react";

interface GradientProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  gradientColors?: { start: string; end: string };
  label?: string;
  sublabel?: string;
}

export default function GradientProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  gradientColors = { start: "#E8577B", end: "#F5A623" },
  label = "",
  sublabel = "",
}: GradientProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setAnimatedProgress(progress);
        }
      },
      { threshold: 0.1 }
    );

    if (ringRef.current) {
      observer.observe(ringRef.current);
    }

    return () => observer.disconnect();
  }, [progress]);

  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div
      ref={ringRef}
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          className="text-zinc-200 dark:text-zinc-800"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Animated Progress */}
        <circle
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Centered Text */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-heading font-bold text-xl text-foreground">
          {label || `${progress}%`}
        </span>
        {sublabel && (
          <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

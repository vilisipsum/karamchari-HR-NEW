"use client";

import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverShimmer?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverShimmer = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl glass-panel glass-panel-hover ${className}`}
      {...props}
    >
      {/* Shimmer Effect overlay */}
      {hoverShimmer && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer pointer-events-none -z-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent" style={{ backgroundSize: '200% 100%' }} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

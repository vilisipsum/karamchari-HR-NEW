"use client";

import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export default function GradientButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: GradientButtonProps) {
  const baseStyle = "relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-300 transform active:scale-95 cursor-pointer overflow-hidden group select-none";
  
  const variants = {
    primary: "text-white bg-gradient-to-r from-marigold to-gulal-rose hover:shadow-[0_0_20px_rgba(232,87,123,0.5)] shadow-md",
    secondary: "text-foreground bg-white dark:bg-white/5 border border-indigo/[0.12] dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 backdrop-blur-md shadow-sm",
    accent: "text-white bg-gradient-to-r from-indigo via-gulal-rose to-marigold hover:shadow-[0_0_20px_rgba(75,58,164,0.4)] shadow-md",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Light glow overlay on hover */}
      <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

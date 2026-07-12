"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer select-none group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Dynamic Interactive Icon part */}
      <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden glass-light dark:glass-dark group-hover:shadow-[0_0_20px_rgba(232,87,123,0.3)] transition-all duration-300">
        {/* Colorful Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo via-gulal-rose to-marigold opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Animated Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-marigold via-gulal-rose to-mint-teal"
          animate={isHovered ? { x: ["-100%", "100%"] } : { x: "0%" }}
          transition={isHovered ? { repeat: Infinity, duration: 1.5, ease: "linear" } : { duration: 0.3 }}
        />

        {/* Devanagari Character 'क' (Soul of Karamchar) */}
        <motion.span
          className="font-devanagari text-2xl font-extrabold text-indigo dark:text-marigold relative z-10"
          animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          क
        </motion.span>
      </div>

      {/* Brand Name Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo to-[#2A2050] dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
            Karamchar
          </span>
          <span className="font-heading font-extrabold text-xl tracking-tight text-gulal-rose">
            HR
          </span>
        </div>
        
        {/* Micro translation subtitle revealed on hover */}
        <div className="h-4 overflow-hidden relative">
          <motion.div
            initial={{ y: 0 }}
            animate={isHovered ? { y: -16 } : { y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col text-[9px] font-semibold uppercase tracking-wider text-zinc-500"
          >
            <span>AI HRMS Platform</span>
            <span className="text-mint-teal">कर्मचारी cloud</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

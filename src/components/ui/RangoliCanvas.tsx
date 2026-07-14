"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RangoliCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-20">
      {/* Dynamic line art pattern top right */}
      <svg
        className="absolute top-10 right-[-10%] w-[600px] h-[600px] opacity-[0.25]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <linearGradient id="rangoli-grad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
        </defs>

        {/* Dynamic geometric drawing */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#rangoli-grad)"
          strokeWidth="0.5"
          strokeDasharray="500"
          initial={{ strokeDashoffset: 500 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        />

        <motion.circle
          cx="100"
          cy="100"
          r="60"
          stroke="url(#rangoli-grad)"
          strokeWidth="0.5"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 400 }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        />

        {/* Petals / Stars */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
          <motion.path
            key={idx}
            d="M 100 100 Q 80 50 100 20 Q 120 50 100 100"
            stroke="url(#rangoli-grad)"
            strokeWidth="0.3"
            transform={`rotate(${angle} 100 100)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: idx * 0.1, ease: "easeInOut" }}
          />
        ))}

        {/* Concentric octagons */}
        <motion.polygon
          points="100,40 142,58 160,100 142,142 100,160 58,142 40,100 58,58"
          stroke="url(#rangoli-grad)"
          strokeWidth="0.4"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>

      {/* Dynamic line art pattern bottom left */}
      <svg
        className="absolute bottom-20 left-[-15%] w-[700px] h-[700px] opacity-[0.2]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          stroke="url(#rangoli-grad)"
          strokeWidth="0.5"
          strokeDasharray="600"
          initial={{ strokeDashoffset: 600 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 7, ease: "linear", repeat: Infinity }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <motion.rect
            key={idx}
            x="60"
            y="60"
            width="80"
            height="80"
            stroke="url(#rangoli-grad)"
            strokeWidth="0.3"
            transform={`rotate(${angle} 100 100)`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: idx * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

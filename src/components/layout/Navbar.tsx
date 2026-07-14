"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "AI HR", href: "#ai-hr" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[90%] md:w-auto"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/80 border border-slate-200/80 backdrop-blur-xl px-5 py-3 rounded-full shadow-[0_20px_50px_rgba(67,56,202,0.08)] flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo Icon Mark */}
        <a href="#" className="flex items-center gap-1.5 font-heading font-extrabold text-sm text-indigo shrink-0">
          <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-indigo to-saffron flex items-center justify-center text-[10px] text-white font-mono">K</span>
          <span className="hidden sm:inline">Karamchar</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold text-slate-600 hover:text-indigo transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Language selector toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-[9px] font-extrabold text-indigo hover:bg-slate-100 transition-colors uppercase cursor-pointer"
        >
          {lang === "en" ? "EN | हिंदी" : "हिंदी | EN"}
        </button>

        {/* Action Button */}
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-indigo hover:bg-[#3730A3] text-white text-[11px] font-bold px-4 py-2 rounded-full flex items-center gap-1 shadow-md shadow-indigo-500/10 cursor-pointer transition-colors"
        >
          Try Free <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </motion.div>
  );
}

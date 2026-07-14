"use client";

import React, { useState } from "react";
import SectionReveal from "../ui/SectionReveal";
import { ArrowUpRight, Sparkles, CheckCircle2, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  // Payroll interactive playground states
  const [basicSalary, setBasicSalary] = useState(45000);
  const [isDisbursed, setIsDisbursed] = useState(false);

  // Indian statutory calculator logic
  const epfDeduction = basicSalary * 0.12;
  const esicDeduction = basicSalary <= 21000 ? basicSalary * 0.0075 : 0;
  
  // Professional Tax (PT) slab logic
  let ptDeduction = 0;
  if (basicSalary > 10000) ptDeduction = 200;
  else if (basicSalary > 7500) ptDeduction = 175;

  const totalDeductions = epfDeduction + esicDeduction + ptDeduction;
  const netTakeHome = basicSalary - totalDeductions;

  const handleDisburse = () => {
    setIsDisbursed(true);
    setTimeout(() => setIsDisbursed(false), 3000);
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      {/* Subtle Devanagari typographical watermark backdrop */}
      <div className="absolute top-[20%] left-[5%] text-[120px] font-extrabold text-indigo/[0.02] dark:text-indigo/[0.01] pointer-events-none select-none font-deva leading-none">
        कर्मचारी
      </div>
      <div className="absolute bottom-[15%] right-[5%] text-[150px] font-extrabold text-indigo/[0.02] dark:text-indigo/[0.01] pointer-events-none select-none font-deva leading-none">
        वेतन
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Dynamic Headings & Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <SectionReveal direction="up">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm mb-6 hover:border-indigo/30 transition-all self-start">
              <Sparkles className="w-3.5 h-3.5 text-saffron animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                Apple-grade HR Experience for India
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-slate-900 mb-6">
              The Intelligent <br />
              <span className="bg-gradient-to-r from-indigo via-[#6366F1] to-saffron bg-clip-text text-transparent">
                Compliance Engine
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-500 font-medium mb-8 leading-relaxed max-w-lg">
              No more messy spreadsheets or outdated payroll portals. Manage automated EPF/ESIC compliance, tracking geo-fenced attendance, and salary slips on a gorgeous warm-ivory dashboard.
            </p>

            {/* Quick trust metrics */}
            <div className="flex gap-8 border-t border-slate-100 pt-6">
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Statutory Deductions</span>
                <span className="text-sm font-bold text-slate-700 mt-1 block">100% Automated</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Appraisal Cycles</span>
                <span className="text-sm font-bold text-slate-700 mt-1 block">360° Custom Fields</span>
              </div>
            </div>

          </SectionReveal>
        </div>

        {/* Right Side: Interactive Payroll Playground Widget */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <SectionReveal direction="none" className="relative w-full max-w-[500px] z-10">
            
            {/* Background aura glow */}
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-3xl -z-10" />

            {/* Live Playground Card */}
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-[0_20px_50px_rgba(67,56,202,0.06)] space-y-6 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-slate-800">Compliance Playground</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Slide to simulate basic salary calculations.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-indigo-50 text-[10px] font-bold text-indigo font-mono">LIVE WIDGET</span>
              </div>

              {/* Slider Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Basic Wage Structure</span>
                  <span className="font-mono text-indigo">₹{basicSalary.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="1000"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
                  <span>₹5,000</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              {/* Deduction Breakdown list */}
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                  <span>EPF Deduction (12%)</span>
                  <span className="font-mono text-slate-700">- ₹{Math.round(epfDeduction).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                  <span>ESIC Rate (0.75%)</span>
                  <span className="font-mono text-slate-700">
                    {esicDeduction > 0 ? `- ₹${Math.round(esicDeduction).toLocaleString("en-IN")}` : "₹0 (Salary > ₹21k)"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                  <span>State Professional Tax (PT)</span>
                  <span className="font-mono text-slate-700">- ₹{ptDeduction}</span>
                </div>
                <hr className="border-slate-200/60 my-1" />
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Take-home Net Salary</span>
                  <span className="font-mono text-emerald-600">₹{Math.round(netTakeHome).toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* UPI disburse action trigger */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {!isDisbursed ? (
                    <motion.button
                      key="pay"
                      onClick={handleDisburse}
                      className="w-full py-3 bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      <IndianRupee className="w-4 h-4" /> Disburse Salary via UPI
                    </motion.button>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full py-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-full flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 animate-bounce" /> Payout Successful! Confetti Sent.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simulated UPI Ripple effect */}
                {isDisbursed && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="w-full h-full border border-emerald-400 rounded-full animate-ping opacity-75 absolute" />
                  </div>
                )}
              </div>

            </div>
          </SectionReveal>
        </div>

      </div>
    </section>
  );
}

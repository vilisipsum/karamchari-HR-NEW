"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CalendarRange,
  Briefcase,
  UserCheck,
  Award,
  FileText,
  Laptop,
  Receipt,
  Network,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Grid3X3,
  Search,
} from "lucide-react";

export default function Features() {
  // Interactive bento states
  const [activeCandidate, setActiveCandidate] = useState<number | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<"MH" | "KA" | "TN">("MH");

  const candidates = [
    { name: "Rohit Sharma", role: "Frontend Dev", match: 94, skills: ["React", "Tailwind", "NextJS"] },
    { name: "Ananya Iyer", role: "HR Manager", match: 89, skills: ["Sourcing", "Payroll", "Appraisals"] },
  ];

  const ptSlabs = {
    MH: [
      { min: 0, max: 7500, pt: 0 },
      { min: 7501, max: 10000, pt: 175 },
      { min: 10001, max: "No limit", pt: 200 },
    ],
    KA: [
      { min: 0, max: 15000, pt: 0 },
      { min: 15001, max: "No limit", pt: 200 },
    ],
    TN: [
      { min: 0, max: 12000, pt: 0 },
      { min: 12001, max: "No limit", pt: 200 },
    ],
  };

  const secondaryFeatures = [
    { title: "Leave Planner", desc: "SL, CL, EL, maternity, and custom policy limits.", icon: CalendarRange, color: "text-rose-500 bg-rose-50" },
    { title: "Digital Onboarding", desc: "Collect PAN/Aadhaar details and track checklist completion.", icon: Briefcase, color: "text-amber-600 bg-amber-50" },
    { title: "Performance & OKRs", desc: "Run appraisals and map company goals.", icon: Award, color: "text-indigo bg-indigo-50" },
    { title: "Asset Assignments", desc: "Track laptop serial numbers and devices.", icon: Laptop, color: "text-emerald-600 bg-emerald-50" },
    { title: "Expense Snap", desc: "Upload receipts, log claims, and trigger payouts.", icon: Receipt, color: "text-indigo bg-indigo-50" },
    { title: "Rotational Shifts", desc: "Manage 24/7 rosters and overtime automatically.", icon: RefreshCw, color: "text-amber-600 bg-amber-50" },
    { title: "Org Tree Chart", desc: "Visualize departments and reporting relationships.", icon: Network, color: "text-rose-500 bg-rose-50" },
    { title: "Presence Heatmap", desc: "Locate patterns of team late check-ins.", icon: Grid3X3, color: "text-indigo bg-indigo-50" },
  ];

  return (
    <section id="features" className="relative py-28 border-t border-slate-100 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <SectionReveal direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo font-heading">
            Feature Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 mt-3">
            Every HR tool you need, <br />
            unified in one single box.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed">
            Eliminate fragmented tools. KaramcharHR consolidates attendance tracking, localized payroll compliance, performance reviews, and team analytics.
          </p>
        </SectionReveal>

        {/* 🏢 BENTO GRID BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: AI Resume Screening (2/3 width on desktop) */}
          <div className="md:col-span-2 relative bg-white border border-slate-200/60 rounded-[28px] p-8 overflow-hidden flex flex-col justify-between min-h-[380px] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.04)] hover:border-indigo/20 transition-all duration-300">
            <div className="max-w-md space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> AI Sourcing & Match
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">AI Candidate Screening</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Scan incoming resumes instantly, map skills alignment, and rank match scores using localized filters. Hover/click cards to simulate screening.
              </p>
            </div>
            
            {/* Interactive Candidate Screener Widget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {candidates.map((cand, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveCandidate(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeCandidate === idx
                      ? "bg-indigo-50/50 border-indigo shadow-sm"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{cand.name}</h4>
                      <p className="text-[9px] text-slate-400 font-medium">{cand.role}</p>
                    </div>
                    
                    {/* Dynamic Loader / Match Badge */}
                    <AnimatePresence mode="wait">
                      {activeCandidate === idx ? (
                        <motion.span
                          key="match"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-600 font-mono"
                        >
                          {cand.match}% Match
                        </motion.span>
                      ) : (
                        <motion.span
                          key="loading"
                          className="w-3.5 h-3.5 border border-indigo border-t-transparent rounded-full animate-spin"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {cand.skills.map((sk) => (
                      <span key={sk} className="text-[8px] font-bold text-slate-500 bg-white border border-slate-200/60 px-1.5 py-0.5 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Geo-fenced Attendance (1/3 width on desktop) */}
          <div className="relative bg-white border border-slate-200/60 rounded-[28px] p-8 overflow-hidden flex flex-col justify-between min-h-[380px] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.04)] hover:border-indigo/20 transition-all duration-300">
            <div className="space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-saffron/10 text-saffron text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> Geo-fencing Sync
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">Real-time Punch-In</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Seamless geofenced check-ins via employee portal. Click the trigger button below to try check-in.
              </p>
            </div>
            
            {/* Interactive checkin button playground */}
            <div className="relative h-[160px] flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl mt-6 p-4 space-y-3">
              <AnimatePresence mode="wait">
                {!isCheckedIn ? (
                  <motion.button
                    key="punch"
                    onClick={() => setIsCheckedIn(true)}
                    className="px-4 py-2 bg-indigo text-white text-[10px] font-bold rounded-full cursor-pointer shadow hover:bg-indigo-600 transition-colors"
                  >
                    Simulate Punch-In
                  </motion.button>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-center space-y-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <UserCheck className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Checked In Successfully</span>
                    <span className="text-[8px] text-slate-400 font-mono">Mumbai Hub — 9:00 AM</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Card 3: Document Vault (1/3 width on desktop) */}
          <div className="relative bg-white border border-slate-200/60 rounded-[28px] p-8 overflow-hidden flex flex-col justify-between min-h-[380px] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.04)] hover:border-indigo/20 transition-all duration-300">
            <div className="space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> Document Vault
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">Aadhaar & PAN Storage</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Encrypted storage for employee tax documents. Hover cards to perform digital signing check.
              </p>
            </div>
            
            {/* File cards mockup */}
            <div className="space-y-2 mt-6">
              {["PAN Card", "Aadhaar Card"].map((doc) => (
                <div
                  key={doc}
                  onMouseEnter={() => setHoveredDoc(doc)}
                  onMouseLeave={() => setHoveredDoc(null)}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all duration-300 ${
                    hoveredDoc === doc
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-slate-50 border-slate-100 text-slate-700"
                  }`}
                >
                  <span className="font-mono">{doc.toLowerCase().replace(" ", "_")}.pdf</span>
                  <span className="text-[8px] font-bold uppercase">
                    {hoveredDoc === doc ? "Verified ✅" : "Click to view"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Indian Statutory Payroll (2/3 width on desktop) */}
          <div className="md:col-span-2 relative bg-white border border-slate-200/60 rounded-[28px] p-8 overflow-hidden flex flex-col justify-between min-h-[380px] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.04)] hover:border-indigo/20 transition-all duration-300">
            <div className="max-w-md space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-500 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Statutory Slabs
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">State Professional Tax Matrix</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click states below to dynamically visualize professional tax (PT) brackets configured across different hubs.
              </p>
            </div>
            
            {/* Interactive PT Slab Viewer */}
            <div className="space-y-3 mt-6">
              <div className="flex gap-2 border-b border-slate-100 pb-2">
                {(["MH", "KA", "TN"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      selectedState === st
                        ? "bg-indigo text-white shadow-sm"
                        : "bg-slate-50 border border-slate-200/60 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {st === "MH" ? "Maharashtra" : st === "KA" ? "Karnataka" : "Tamil Nadu"}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[10px]">
                <div className="grid grid-cols-3 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200/60 pb-1">
                  <span>Basic Wage Min</span>
                  <span>Basic Wage Max</span>
                  <span className="text-right">Monthly PT</span>
                </div>
                {ptSlabs[selectedState].map((slab, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-slate-700 py-0.5">
                    <span>₹{slab.min.toLocaleString("en-IN")}</span>
                    <span>{typeof slab.max === "number" ? `₹${slab.max.toLocaleString("en-IN")}` : slab.max}</span>
                    <span className="text-right text-indigo font-bold">₹{slab.pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 📋 SECONDARY FEATURES COMPACT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {secondaryFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="bg-white border border-slate-200/60 rounded-[28px] p-5 h-full flex flex-col justify-between hover:-translate-y-1 hover:border-indigo/20 transition-all duration-300 shadow-[0_10px_35px_-12px_rgba(67,56,202,0.03)]">
                <div className="space-y-4">
                  <div className={`p-2 rounded-xl w-fit border border-slate-100 ${feat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-800">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

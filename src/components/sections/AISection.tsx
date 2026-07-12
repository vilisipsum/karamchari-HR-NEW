"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { Sparkles, Brain, Bot, Search, BarChart3, Mail, FileText, CheckCircle2, UserCheck, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AISection() {
  const [activeAI, setActiveAI] = useState(0);

  const aiCapabilities = [
    {
      title: "AI Resume Screening",
      desc: "Upload 100+ resumes and parse skills, experience, and match scores in seconds.",
      icon: Brain,
      color: "text-marigold",
      preview: {
        title: "Resume Match Analysis",
        metrics: [
          { label: "Frontend Engineer Match", val: 94 },
          { label: "React/Next.js Proficiency", val: 98 },
          { label: "Cultural Alignment", val: 89 },
        ],
        summary: "Candidate exhibits strong expertise in React 19 and Tailwind CSS. Exceeded baseline requirements. Recommended for immediate interview.",
      },
    },
    {
      title: "HR Copilot Bot",
      desc: "Draft policies, write performance review guides, and resolve employee tickets instantly.",
      icon: Bot,
      color: "text-gulal-rose",
      preview: {
        title: "HR Copilot Sandbox",
        prompt: "Draft a policy for WFH allowance for Indian teams.",
        response: "Drafted Policy: Employees working hybrid are eligible for a monthly WFH stipend of ₹2,500. Submissions for internet/hardware claims must be uploaded by the 25th via the ESS app.",
      },
    },
    {
      title: "Predictive Leave Analytics",
      desc: "Forecast peak leave periods and burnout flags before teams are understaffed.",
      icon: BarChart3,
      color: "text-mint-teal",
      preview: {
        title: "Predictive Analytics Engine",
        alerts: [
          { text: "Burnout Risk: Mumbai Tech Hub", type: "high" },
          { text: "Monsoon Absences Prediction", type: "medium" },
        ],
        graph: [40, 55, 60, 85, 45],
      },
    },
    {
      title: "Smart Document AI",
      desc: "Automatically verify PAN, Aadhaar, and bank statements. Flags fake profiles instantly.",
      icon: FileText,
      color: "text-indigo",
      preview: {
        title: "Document AI Verification",
        checks: [
          { item: "Aadhaar Card Structure Verified", pass: true },
          { item: "PAN Card Number Match (Nikhil S.)", pass: true },
          { item: "Name on Bank Account Verification", pass: true },
        ],
      },
    },
    {
      title: "Natural Language Search",
      desc: "Type like you talk: 'Who was late in Noida office yesterday?' or 'Show me remaining SLs'.",
      icon: Search,
      color: "text-amber",
      preview: {
        title: "Semantic Search Console",
        query: "Who is eligible for EL carryforward in Tech department?",
        results: [
          { name: "Pooja Roy", elLeft: "12 days" },
          { name: "Vikram Malhotra", elLeft: "15 days" },
        ],
      },
    },
  ];

  return (
    <section id="ai-hr" className="relative py-24 border-t border-white/5 bg-bg-light/30 dark:bg-bg-dark/30 overflow-hidden">
      {/* Decorative Blur Background shape */}
      <div className="absolute right-[5%] top-[10%] w-[380px] h-[380px] rounded-full bg-mint-teal/10 blur-[120px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo dark:text-marigold font-heading flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-marigold text-marigold" /> Karamchar AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            The Intelligence Layer <br />
            your company has been missing.
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Automate tedious screening, predict staffing shortfalls, and empower employees with instant NLP support.
          </p>
        </SectionReveal>

        {/* AI Segment Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* AI Capabilities list selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {aiCapabilities.map((cap, index) => {
              const Icon = cap.icon;
              const isActive = index === activeAI;
              return (
                <button
                  key={cap.title}
                  onClick={() => setActiveAI(index)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex gap-4 cursor-pointer outline-none
                    ${
                      isActive
                        ? "bg-white dark:bg-white/5 border-gulal-rose/40 dark:border-gulal-rose/25 shadow-sm"
                        : "bg-indigo/[0.02] dark:bg-transparent border-indigo/[0.06] dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/5"
                    }
                  `}
                >
                  <div className={`p-2.5 rounded-xl bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 ${cap.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-foreground dark:text-white flex items-center gap-1.5">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* AI Interactive Preview Output */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <GlassCard className="p-6 md:p-8 h-full min-h-[350px] flex flex-col justify-between relative" hoverShimmer>
              {/* Decorative light path */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo/5 to-gulal-rose/5 opacity-50 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAI}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Fake UI Header */}
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      {aiCapabilities[activeAI].preview.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-heading font-extrabold uppercase bg-mint-teal/20 text-[#1A8A70] dark:text-mint-teal">
                      AI Active
                    </span>
                  </div>

                  {/* Rendering Details based on active index */}
                  {activeAI === 0 && (
                    <div className="space-y-4">
                      {aiCapabilities[0].preview.metrics?.map((m) => (
                        <div key={m.label} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{m.label}</span>
                            <span className="font-numbers font-bold text-indigo dark:text-marigold">{m.val}%</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.val}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-marigold to-gulal-rose rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="p-3.5 rounded-xl bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-300 italic">
                        {aiCapabilities[0].preview.summary}
                      </div>
                    </div>
                  )}

                  {activeAI === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">User Query:</span>
                        <div className="p-3 rounded-xl bg-indigo/10 border border-indigo/20 text-xs font-semibold text-foreground dark:text-zinc-200">
                          {aiCapabilities[1].preview.prompt}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400">AI Response:</span>
                        <div className="p-3 rounded-xl bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                          {aiCapabilities[1].preview.response}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeAI === 2 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-3">
                        {aiCapabilities[2].preview.alerts?.map((alt, i) => (
                          <div key={i} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs font-semibold text-red-500">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{alt.text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="h-28 flex items-end gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 pt-4 justify-around">
                        {aiCapabilities[2].preview.graph?.map((val, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 flex-1">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${val}px` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="w-full bg-gradient-to-t from-indigo via-gulal-rose to-marigold rounded-t"
                            />
                            <span className="text-[8px] text-zinc-500 dark:text-zinc-400 font-bold font-numbers">W{i+1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAI === 3 && (
                    <div className="space-y-3">
                      {aiCapabilities[3].preview.checks?.map((chk, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground dark:text-zinc-300">{chk.item}</span>
                          <span className="flex items-center gap-1 text-[#1A8A70] dark:text-mint-teal font-extrabold">
                            <CheckCircle2 className="w-4 h-4" /> Passed
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeAI === 4 && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.06] dark:border-white/10 text-xs font-mono text-indigo dark:text-marigold">
                        &gt; {aiCapabilities[4].preview.query}
                      </div>
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase font-bold text-zinc-500 dark:text-zinc-400">Match Output:</span>
                        {aiCapabilities[4].preview.results?.map((res, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800/80 flex justify-between text-xs font-semibold">
                            <span>{res.name}</span>
                            <span className="text-indigo dark:text-marigold font-numbers">{res.elLeft}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

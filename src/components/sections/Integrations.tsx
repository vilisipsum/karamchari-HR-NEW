"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { Cpu, Send, CheckCircle2 } from "lucide-react";

export default function Integrations() {
  const integrationStack = [
    { name: "Tally Prime", category: "Accounting", desc: "Sync payroll voucher journal entries instantly." },
    { name: "Zoho Books", category: "Accounting", desc: "Automate ledger entries for salary disbursements." },
    { name: "QuickBooks", category: "Accounting", desc: "Direct payroll sync for global standard ledgers." },
    { name: "Slack", category: "Communications", desc: "Punch-in commands and leaves status notifications." },
    { name: "Microsoft Teams", category: "Communications", desc: "Get critical approvals alerts inside teams." },
    { name: "Google Workspace", category: "Directory", desc: "Sync organizational directories and emails automatically." },
    { name: "Biometric Hardware", category: "Attendance", desc: "Connects with Matrix, eSSL, or ZKTeco devices." },
    { name: "WhatsApp API", category: "Employee UX", desc: "Send automated payslip notifications via WhatsApp." },
  ];

  return (
    <section className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20 overflow-hidden">
      <div className="absolute left-[5%] top-[10%] w-[300px] h-[300px] bg-indigo/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text details */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
            <SectionReveal direction="up">
              <span className="text-xs font-bold uppercase tracking-widest text-gulal-rose font-heading">
                Integrations Hub
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
                Works with your <br />
                existing software stack.
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
                Connect your accounting ledger, sync communication tools, and link biometric hardware devices. Setup triggers in under 15 minutes.
              </p>

              <div className="mt-8 space-y-3.5">
                {[
                  "Official Tally Prime integration support.",
                  "Biometric device sync over Cloud Webhook.",
                  "WhatsApp payslips and leave update delivery.",
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 justify-center lg:justify-start">
                    <CheckCircle2 className="w-4 h-4 text-mint-teal" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right integrations grid */}
          <div className="lg:col-span-7">
            <SectionReveal direction="none" delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {integrationStack.map((int) => (
                <GlassCard key={int.name} className="p-5 border-white/60 dark:border-white/5 hover:border-gulal-rose/30 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-extrabold text-foreground dark:text-white">{int.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-heading font-extrabold uppercase bg-indigo/10 dark:bg-white/5 text-indigo dark:text-marigold">
                      {int.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {int.desc}
                  </p>
                </GlassCard>
              ))}
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqItems = [
    {
      q: "Is KaramcharHR compliant with Indian labor laws?",
      a: "Yes. KaramcharHR is built for Indian compliance. We automate deductions for Employee Provident Fund (EPF), ESIC, Professional Tax (PT), and calculate TDS deductions. We also support Form 16 and Form 24Q preparation.",
    },
    {
      q: "Can we sync our existing biometric attendance hardware?",
      a: "Absolutely. We provide Cloud Webhooks and API bindings for major biometric scanners including eSSL, ZKTeco, Matrix, and Suprema. Logs are synced to the attendance sheet in real time.",
    },
    {
      q: "How does the AI Resume Screening system work?",
      a: "Simply upload a batch of resumes (PDF/DOCX) into the recruitment module. Our parser analyzes skills, CTC records, and job history, assigning an alignment match score against your Job Description.",
    },
    {
      q: "Do you support regional holiday calendars in India?",
      a: "Yes. You can create multiple holiday lists (e.g. Maha Shivratri, Ganesh Chaturthi, Chhath Puja, Pongal) and assign them to specific hubs or Noida, Bengaluru, and Mumbai offices.",
    },
    {
      q: "How secure are employee documents (PAN, Aadhaar, Bank Details)?",
      a: "All personal identity numbers and KYC documents are encrypted using AES-256 bank-grade cryptography. We strictly adhere to Indian IT Act guidelines and security protocols.",
    },
    {
      q: "Can we customize leave rules (CL, SL, EL carryforwards)?",
      a: "Yes. You can build accrual cycles (monthly, quarterly), set maximum carryforward balances, establish sandwich rules, and define approval workflows tailored to your company rules.",
    },
  ];

  return (
    <section id="faq" className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20 overflow-hidden">
      <div className="absolute right-[5%] top-[10%] w-[350px] h-[350px] bg-indigo/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo dark:text-marigold font-heading">
            FAQ Section
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Frequently Asked Questions
          </h2>
        </SectionReveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = index === openIdx;
            return (
              <SectionReveal
                key={index}
                direction="up"
                delay={index * 0.05}
              >
                <GlassCard className="border-white/60 dark:border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full text-left p-5 flex justify-between items-center text-sm font-heading font-bold text-foreground dark:text-white cursor-pointer outline-none hover:text-gulal-rose transition-colors"
                  >
                    <span>{item.q}</span>
                    <span className="p-1 rounded bg-indigo/[0.03] dark:bg-white/5 border border-indigo/[0.12] dark:border-white/10 shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

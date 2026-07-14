"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import GradientButton from "../ui/GradientButton";
import { Check } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter",
      desc: "For small teams looking to automate attendance & basic payroll with AI assistance.",
      priceMonthly: 299,
      priceAnnual: 249,
      features: [
        "Core Directory (up to 50 employees)",
        "Geofenced Mobile Punch-in/out",
        "AI-powered Indian Payroll calculations",
        "Smart CL/SL Leave trackers",
        "Email & Chat Support",
      ],
      popular: false,
    },
    {
      name: "Growth",
      desc: "Perfect for scaling startups needing advanced AI features and deep automation.",
      priceMonthly: 599,
      priceAnnual: 499,
      features: [
        "Directory (unlimited employees)",
        "Biometric Scanner integration",
        "Automatic Tax declarations (TDS)",
        "AI Leave analytics & burnout warnings",
        "Kanban Recruitment boards",
        "LMS Custom Course setup",
        "WhatsApp Payslip updates",
        "24/7 Priority Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "Custom structures for large organizations needing SOC2, audits, and dedicated hubs.",
      priceMonthly: null,
      priceAnnual: null,
      features: [
        "Dedicated cloud server nodes",
        "Custom API integration builders",
        "Multiple company payroll branches",
        "SOC2/ISO Compliance logs audit",
        "Dedicated Account Manager",
        "Custom SLAs guarantees",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-28 border-t border-slate-100 bg-[#F8FAFC] overflow-hidden">
      <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo font-heading">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 mt-3">
            Simple pricing, built to scale
          </h2>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed">
            Pay only for the active employees you manage. AI features included in every plan. No hidden setup fees.
          </p>
        </SectionReveal>

        {/* Toggle Billing Option */}
        <div className="flex justify-center items-center gap-3 mb-16">
          <span className="text-xs font-semibold text-slate-400">Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-slate-100 border border-slate-200 relative p-1 flex items-center cursor-pointer transition-all"
          >
            <div
              className={`w-4 h-4 rounded-full bg-gradient-to-r from-indigo to-saffron transition-transform duration-300 ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            Annual Billing <span className="px-2 py-0.5 rounded-full text-[9px] font-heading font-extrabold uppercase bg-emerald-50 text-emerald-600">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            return (
              <SectionReveal
                key={tier.name}
                direction="up"
                delay={index * 0.05}
                className="h-full"
              >
                <div
                  className={`p-8 h-full flex flex-col justify-between relative border-t-4 transition-all duration-300 bg-white rounded-[28px]
                    ${
                      tier.popular
                        ? "border-t-indigo shadow-[0_20px_50px_rgba(67,56,202,0.06)] border-slate-200/80 scale-102"
                        : "border-t-slate-300 border border-slate-200/60 shadow-[0_10px_35px_-12px_rgba(67,56,202,0.02)]"
                    }
                  `}
                >
                  {tier.popular && (
                    <span className="absolute top-4 right-6 px-3 py-1 rounded-full text-[9px] font-heading font-extrabold uppercase bg-indigo-50 text-indigo">
                      Recommended
                    </span>
                  )}

                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-slate-800">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 min-h-[35px] leading-relaxed">
                      {tier.desc}
                    </p>

                    {/* Price details */}
                    <div className="my-6">
                      {price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold font-numbers text-slate-900">₹{price}</span>
                          <span className="text-[11px] text-slate-400 font-medium">/ employee / month</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-extrabold text-slate-900">Custom Pricing</span>
                      )}
                      {price !== null && isAnnual && (
                        <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase tracking-wider">Billed annually</span>
                      )}
                    </div>

                    <hr className="border-slate-100 my-4" />

                    {/* Features checklist */}
                    <ul className="space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex gap-2.5 text-xs text-slate-600 font-medium">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    {tier.name === "Enterprise" ? (
                      <GradientButton 
                        variant="secondary" 
                        className="w-full justify-center py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Contact Sales
                      </GradientButton>
                    ) : (
                      <GradientButton 
                        variant={tier.popular ? "primary" : "secondary"} 
                        className={`w-full justify-center py-2.5 ${
                          tier.popular ? "bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-lg shadow-indigo-500/10" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Start Free Trial
                      </GradientButton>
                    )}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

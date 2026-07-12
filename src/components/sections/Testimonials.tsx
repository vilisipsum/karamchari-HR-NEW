"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      quote: "KaramcharHR cut our monthly payroll processing time from 4 days to 20 minutes. Our employees love getting their payslips automatically delivered to WhatsApp. Absolute game changer.",
      name: "Vikram Aditya",
      role: "VP People // BharatTech",
      location: "Noida Hub",
      rating: 5,
    },
    {
      quote: "The AI resume screening is incredible. We parsed over 500 candidate profiles in a single afternoon and hired our lead designer. Statutory compliance (ESI/EPF) is 100% automated.",
      name: "Nisha Kamat",
      role: "HR Director // Mumbai FinTech Ltd",
      location: "Mumbai Hub",
      rating: 5,
    },
    {
      quote: "Managing rotational rosters and overtime metrics for 350+ factory workers was a mess. KaramcharHR biometric sync and shift calendars resolved all tracking errors on day one.",
      name: "Sanjay Rao",
      role: "COO // Hind Heavy Industries",
      location: "Pune Plant",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20 overflow-hidden">
      <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] bg-marigold/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionReveal direction="up" className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gulal-rose font-heading">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Loved by leading HR teams
          </h2>
        </SectionReveal>

        {/* Testimonial slider card */}
        <SectionReveal direction="none" delay={0.1} className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <GlassCard className="p-8 md:p-12 relative flex flex-col justify-between items-center gap-6 border-white/60 dark:border-white/5 shadow-2xl" hoverShimmer>
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-gulal-rose/20 absolute top-4 left-6" />

                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[activeIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-marigold text-marigold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg font-medium text-foreground dark:text-zinc-200 leading-relaxed italic max-w-2xl">
                  "{testimonials[activeIdx].quote}"
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground dark:text-white">
                    {testimonials[activeIdx].name}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mt-1">
                    {testimonials[activeIdx].role} // {testimonials[activeIdx].location}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Slider navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-foreground hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 text-foreground hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
